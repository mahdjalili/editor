"use client";

import style from "./layers.module.css";
import { Button } from "antd";

import { useContext } from "react";
import { EditorContext } from "@/providers/EditorProvider";

export default function Setting() {
    const editorContext = useContext(EditorContext);

    const [layers, setLayers] = editorContext.layers;
    const listOfLayers = editorContext.listOfLayers;

    return (
        <div className={style.wrapper}>
            <div className={style.list}>
                {layers.map((layer, index) => (
                    <layer.componentSetting
                        key={`key-${index}`}
                        component={layer}
                        onChange={(newData) => {
                            const newComponents = layers.slice();
                            newComponents[index] = newData;
                            setLayers(newComponents);
                        }}
                    ></layer.componentSetting>
                ))}
            </div>
        </div>
    );
}
