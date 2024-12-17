"use client";

import style from "./Editor.module.css";

import { Stage, Layer, Rect } from "react-konva";
import { ReactFlow, Controls, Background, Button } from "@xyflow/react";

import { useEditor } from "@/providers/EditorProvider";

export default function Editor() {
    const initialNodes = [
        {
            id: "template",
            type: "template",
            position: { x: 100, y: 100 },
            data: { label: "Template" },
        },
    ];

    const TemplateNode = () => {
        return (
            <div className="flex nodrag">
                <Template />
            </div>
        );
    };

    return (
        <div className={style.wrapper}>
            <ReactFlow
                nodes={initialNodes}
                nodeTypes={{
                    template: TemplateNode,
                }}
                fitView
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                colorMode="dark"
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export const Template = () => {
    const editorContext = useEditor();

    const stageRef = editorContext.stageRef;
    const [layers, setLayers] = editorContext.layers;
    const [selectedTemplate] = editorContext.selectedTemplate;
    const [selectedId, setSelectedId] = editorContext.selectedLayerId;

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null); // Deselect all layers
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
                {/* <Rect
                    x={0}
                    y={0}
                    width={selectedTemplate.width}
                    height={selectedTemplate.height}
                    fill={selectedTemplate.background}
                /> */}
                {layers.map((layer, index) => (
                    <layer.component
                        key={`key-${layer.id}`}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        shapeProps={layer}
                        isSelected={layer.id === selectedId}
                        onDragStart={() => {
                            setSelectedId(layer.id);
                        }}
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
