"use client";

import style from "./image.module.css";
import { useEffect, useRef } from "react";

import { Card, Input, InputNumber } from "antd";

import { Image as ImageKonva, Transformer } from "react-konva";
import useImage from "use-image";

export function Image({ shapeProps, onSelect, isSelected, onChange }) {
    const [image] = useImage(shapeProps.src, "anonymous");

    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        if (image) {
            shapeRef.current.getLayer().batchDraw();
        }
    }, [image]);

    return (
        <>
            <ImageKonva
                image={image}
                onTap={onSelect}
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            ></ImageKonva>
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                ></Transformer>
            )}
        </>
    );
}

export function ImageSetting({ onChange, component }) {
    const onInputsChange = (name, value) => {
        var copyComponent = component;
        copyComponent[name] = value;
        onChange(copyComponent);
    };

    return (
        <Card>
            <label className="label">لینک عکس:</label>
            <Input value={component.src} onChange={(e) => onInputsChange("src", e.target.value)}></Input>

            <label className="label">طول:</label>
            <InputNumber value={component.width} onChange={(value) => onInputsChange("width", value)}></InputNumber>

            <label className="label">عرض:</label>
            <InputNumber value={component.height} onChange={(value) => onInputsChange("height", value)}></InputNumber>
        </Card>
    );
}

export const ImageDefault = {
    // id: uid(),
    name: "تصویر",
    component: Image,
    componentSetting: ImageSetting,
    // url: "https://konvajs.github.io/assets/yoda.jpg",
    // width: 100,
    // height: 100,
    // x: 50,
    // y: 50,
};

export default ImageDefault;
