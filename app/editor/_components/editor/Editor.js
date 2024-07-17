"use client";

import style from "./Editor.module.css";

import { useState, useEffect, useContext } from "react";

import { Stage, Layer, Label } from "react-konva";

import { TemplatesContext } from "@/providers/TemplateProvider";

export default function Editor() {
    const templatesContext = useContext(TemplatesContext);

    const [components, setComponents] = templatesContext.components;
    const [selectedTemplate] = templatesContext.selectedTemplate;
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
                    {components.map((component, index) => (
                        <component.component
                            key={`key-${component.id}`}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            shapeProps={component}
                            isSelected={component.id === selectedId}
                            onSelect={() => {
                                setSelectedId(component.id);
                            }}
                            onChange={(newData) => {
                                const newComponents = components.slice();
                                newComponents[index] = newData;
                                setComponents(newComponents);
                            }}
                        ></component.component>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}
