"use client";

import style from "./text.module.css";

import { Input, InputNumber, Select, ColorPicker } from "antd";

import { useEffect, useRef } from "react";
import { Text as TextKonva, Transformer } from "react-konva";

export function Text({ shapeProps, onSelect, isSelected, onChange }) {
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
            <TextKonva
                onTap={onSelect}
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragStart={(e) => {
                    e.cancelBubble = true;
                }}
                onDragEnd={(e) => {
                    e.cancelBubble = true;
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onDragMove={(e) => {
                    e.cancelBubble = true;
                }}
                onTransform={(e) => {
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
            ></TextKonva>
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

export function TextSetting({ onChange, component }) {
    const onInputsChange = (name, value) => {
        var copyComponent = component;
        copyComponent[name] = value;
        onChange(copyComponent);
    };

    return (
        <div>
            <label className="label">متن:</label>
            <Input value={component.text} onChange={(e) => onInputsChange("text", e.target.value)} block></Input>

            <label className="label">سایز متن:</label>
            <InputNumber
                value={component.fontSize}
                onChange={(value) => onInputsChange("fontSize", value)}
                block
            ></InputNumber>

            <label className="label">ارتفاع خط:</label>
            <InputNumber
                value={component.lineHeight}
                onChange={(value) => onInputsChange("lineHeight", value)}
            ></InputNumber>

            <label className="label">رنگ:</label>
            <ColorPicker
                value={component.fill}
                onChangeComplete={(value) => onInputsChange("fill", value.toRgbString())}
                showText
            ></ColorPicker>

            <label className="label">چینش:</label>
            <Select value={component.align} onChange={(value) => onInputsChange("align", value)}>
                <Select.Option value="right">راست چین</Select.Option>
                <Select.Option value="left">چپ چین</Select.Option>
                <Select.Option value="center">وسط چین</Select.Option>
            </Select>

            <label className="label">طول:</label>
            <InputNumber value={component.width} onChange={(value) => onInputsChange("width", value)}></InputNumber>

            <label className="label">عرض:</label>
            <InputNumber value={component.height} onChange={(value) => onInputsChange("height", value)}></InputNumber>
        </div>
    );
}

export const TextDefault = {
    name: "متن",
    icon: <i className="fa-regular fa-font"></i>,
    component: Text,
    componentSetting: TextSetting,
    fontFamily: "Vazirmatn",
    text: "متن جدید",
    fontSize: 36,
    lineHeight: 1.1,
    fontStyle: "bold",
    stroke: "black",
    fill: "black",
    align: "right",
    width: 170,
    height: 40,
    x: 10,
    y: 10,
};

export default TextDefault;
