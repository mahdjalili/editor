"use client";

import style from "./Editor.module.css";

import { useState, useEffect, useContext } from "react";

import { Stage, Layer, Label } from "react-konva";

import { EditorContext } from "@/providers/EditorProvider";

export default function Editor() {
    const editorProvider = useContext(EditorContext);

    const [layers, setLayers] = editorProvider.layers;
    const [selectedTemplate] = editorProvider.selectedTemplate;
    const [selectedId, setSelectedId] = useState();

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    const canvasSize =
        selectedTemplate.ratio <= 1
            ? {
                  width: (window.innerHeight - 80) * selectedTemplate.ratio,
                  height: window.innerHeight - 80,
              }
            : {
                  width: window.innerWidth / 2 - 80,
                  height: (window.innerWidth / 2 - 80) / selectedTemplate.ratio,
              };

    return (
        <div className={style.wrapper}>
            <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                className={`${style.stage} widget`}
            >
                <Layer>
                    <Label></Label>
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
        </div>
    );
}
