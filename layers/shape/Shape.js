"use client";

import { useEffect, useRef } from "react";

import { Card, Input, InputNumber, Collapse, ColorPicker } from "antd";

import { Image as ImageKonva, Transformer } from "react-konva";
import useImage from "use-image";
import { useSvgColors, replaceSvgColor, useReplaceSvgColors } from "@/hooks/useSvg";

export function Shape({ shapeProps, onSelect, isSelected, onChange, onDragStart, onDragEnd }) {
    const src = useReplaceSvgColors(shapeProps.src, shapeProps.colorsReplace);
    const [image] = useImage(src, "anonymous");

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
                onDragStart={onDragStart}
                onDragEnd={(e) => {
                    onDragEnd && onDragEnd(e);

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

export function ShapeSetting({ onChange, component }) {
    const colors = useSvgColors(component.src);

    const onChangeShapeColor = (newColor, targetColor) => {
        var copyComponent = component;
        copyComponent.src = replaceSvgColor(component.src, targetColor, newColor);
        onChange(copyComponent);
    };

    const onInputsChange = (name, value) => {
        var copyComponent = component;
        copyComponent[name] = value;
        onChange(copyComponent);
    };

    return (
        <div className="flex gap-2 flex-col">
            <label className="label">لینک عکس:</label>
            <Input size="small" value={component.src} onChange={(e) => onInputsChange("src", e.target.value)}></Input>

            <label className="label">طول:</label>
            <InputNumber
                size="small"
                value={component.width}
                onChange={(value) => onInputsChange("width", value)}
            ></InputNumber>

            <label className="label">عرض:</label>
            <InputNumber
                size="small"
                value={component.height}
                onChange={(value) => onInputsChange("height", value)}
            ></InputNumber>

            <Collapse size="small">
                <Collapse.Panel header="رنگ های شکل">
                    {colors.map((color, index) => (
                        <ColorPicker
                            size="small"
                            key={index}
                            defaultValue={color}
                            onChangeComplete={(newColor) => onChangeShapeColor(newColor.toRgbString(), color)}
                        ></ColorPicker>
                    ))}
                </Collapse.Panel>
            </Collapse>
        </div>
    );
}

export const ImageDefault = {
    name: "شکل",
    icon: <i className="fa-regular fa-square"></i>,
    component: Shape,
    componentSetting: ShapeSetting,
    // url: "https://konvajs.github.io/assets/yoda.jpg",
    // width: 100,
    // height: 100,
    // x: 50,
    // y: 50,
};

export default ImageDefault;
