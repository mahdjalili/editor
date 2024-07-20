import styles from "./menu.module.css";
import { useState, useContext } from "react";

import { EditorContext } from "@/providers/EditorProvider";

import Setting from "./layers/Layers";
import Templates from "./templates/Templates";
import { Divider } from "antd";

export default function Menu() {
    const editorContext = useContext(EditorContext);
    const listOfLayers = editorContext.listOfLayers;
    const [layers, setLayers] = editorContext.layers;

    const [select, setSelect] = useState(0);

    const menu = [
        {
            key: 0,
            name: "لایه ها",
            icon: "",
            component: Setting,
        },
        {
            key: 1,
            name: "تمپلیت ها",
            icon: "",
            component: Templates,
        },
    ];

    const Page = menu.find((item) => item.key == select).component;

    return (
        <section className="flex h-full w-full">
            <div className={styles.menu}>
                {menu.map((item) => (
                    <button className={styles.item} key={item.key} onClick={() => setSelect(item.key)}>
                        {item.name}
                    </button>
                ))}

                <Divider></Divider>

                {Object.keys(listOfLayers).map((layer, index) => {
                    const defaultValue = listOfLayers[layer];

                    return (
                        <button
                            className={styles.item}
                            key={index}
                            onClick={() => {
                                setLayers((prev) => [...prev, defaultValue]);
                            }}
                        >
                            {defaultValue.name}
                        </button>
                    );
                })}
            </div>
            <div className="h-full flex-grow p-3">
                <Page></Page>
            </div>
        </section>
    );
}
