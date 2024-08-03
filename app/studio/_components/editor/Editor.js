"use client";

import style from "./Editor.module.css";

import { ReactFlow, Background, Controls } from "@xyflow/react";
import { useState, useEffect, useContext } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { EditorContext } from "@/providers/EditorProvider";

export default function Editor() {
    const nodeTypes = { template: Template };

    const initialNodes = [
        {
            id: "template-1",
            type: "template",
            position: { x: 0, y: 0 },
        },
    ];

    return (
        <div className={style.wrapper}>
            {/* <ReactFlow colorMode="dark" fitView nodes={initialNodes} nodeTypes={nodeTypes} style={{ height: "100%" }}>
                <Background />
                <Controls />
            </ReactFlow> */}
            <Template></Template>
        </div>
    );
}

export const Template = () => {
    const editorContext = useContext(EditorContext);

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
