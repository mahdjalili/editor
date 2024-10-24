"use client";

import style from "./Editor.module.css";

import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { useEditor } from "@/providers/EditorProvider";

export default function Editor() {
    return (
        <div className={style.wrapper}>
            <Template />
            <Result />
        </div>
    );
}

export const Template = () => {
    const editorContext = useEditor();

    const stageRef = editorContext.stageRef;
    const [layers, setLayers] = editorContext.layers;
    const [selectedTemplate] = editorContext.selectedTemplate;
    const [selectedId, setSelectedId] = useState();

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    const canvasSize = selectedTemplate.canvasSize(700);

    return (
        <Stage
            width={selectedTemplate.width}
            height={selectedTemplate.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            ref={stageRef}
            className={style.stage}
        >
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={selectedTemplate.width}
                    height={selectedTemplate.height}
                    fill={selectedTemplate.background} // Change this to your desired background color
                />
                {layers.map((layer, index) => (
                    <layer.component
                        key={`key-${layer.id}`}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        shapeProps={layer}
                        isSelected={layer.id === selectedId}
                        onSelect={() => {
                            setSelectedId(layer.id);
                        }}
                        onChange={(newData) => {
                            const newLayers = layers.slice();
                            newLayers[index] = newData;
                            setLayers(newLayers);
                        }}
                    ></layer.component>
                ))}
            </Layer>
        </Stage>
    );
};

export const Result = () => {
    const editorContext = useEditor();

    const stageRef = editorContext.stageRef;
    const [layers, setLayers] = editorContext.layers;
    const [selectedTemplate] = editorContext.selectedTemplate;
    const [selectedId, setSelectedId] = useState();

    return (
        <div style={{ width: selectedTemplate.width, height: selectedTemplate.height }} className={style.stage}>
            <img className="w-full h-full object-contain" src={selectedTemplate.image} alt="result" />
        </div>
    );
};
