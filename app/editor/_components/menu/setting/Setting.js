"use client";

import style from "./Setting.module.css";
import { Button } from "antd";

import { useContext } from "react";
import { EditorContext } from "@/providers/EditorProvider";

export default function Setting() {
    const editorContext = useContext(EditorContext);

    const [layers, setLayers] = editorContext.layers;
    const ListOfLayers = editorContext.ListOfLayers;

    return (
        <div className={style.wrapper}>
            <header>
                <h2>تنظیمات</h2>
            </header>
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
            <div className={style.add}>
                {Object.keys(ListOfLayers).map((layer, index) => {
                    const defaultValue = ListOfLayers[layer];

                    return (
                        <Button
                            key={index}
                            onClick={() => {
                                setLayers((prev) => [...prev, defaultValue]);
                            }}
                        ></Button>
                    );
                })}
            </div>
        </div>
    );
}
