import style from "./image.module.css";

import { useEffect, useRef } from "react";

import { Image as ImageKonva, Transformer } from "react-konva";

import useImage from "use-image";

import { uid } from "uid";

export default function Image({ shapeProps, onSelect, isSelected, onChange }) {
    const [image] = useImage(shapeProps.url);

    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

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
    const onInputsChange = (e) => {
        var copyComponent = component;
        copyComponent[e.target.attributes.name.value] = e.target.value;
        onChange(copyComponent);
    };

    return (
        <div className={`${style.setting} widget`}>
            <div>
                <label className="label">لینک عکس:</label>
                <input
                    style={{
                        direction: "ltr",
                    }}
                    name="url"
                    type="text"
                    value={component.url}
                    onChange={(e) => onInputsChange(e)}
                    className="input"
                ></input>
            </div>
            <div>
                <label className="label">طول:</label>
                <input
                    name="width"
                    type="number"
                    value={component.width}
                    onChange={(e) => onInputsChange(e)}
                    className="input"
                ></input>
            </div>
            <div>
                <label className="label">عرض:</label>
                <input
                    name="height"
                    type="number"
                    value={component.height}
                    onChange={(e) => onInputsChange(e)}
                    className="input"
                ></input>
            </div>
        </div>
    );
}

export function ImageDefault({ onClick }) {
    const def = {
        id: uid(),
        component: Image,
        componentSetting: ImageSetting,
        url: "https://konvajs.github.io/assets/yoda.jpg",
        x: 50,
        y: 50,
    };

    return (
        <button
            className={`${style.button} widget`}
            onClick={() => {
                onClick(def);
            }}
        >
            اضافه کردن عکس
        </button>
    );
}
