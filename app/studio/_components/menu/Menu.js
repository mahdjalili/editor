import styles from "./menu.module.css";
import { useState, useContext } from "react";
import { Divider } from "antd";

import { EditorContext } from "@/providers/EditorProvider";
import { layers as listOfLayers } from "@/layers/layers";

import Setting from "./layers/Layers";
import Templates from "./templates/Templates";

export default function Menu() {
    const editorContext = useContext(EditorContext);

    const [layers, setLayers] = editorContext.layers;

    const [select, setSelect] = useState(0);

    const menu = [
        {
            key: 0,
            name: "لایه‌ها",
            icon: <i className="fa-regular fa-layer-group"></i>,
            component: Setting,
        },
        // {
        //     key: 1,
        //     name: "تمپلیت‌ها",
        //     icon: <i className="fa-regular fa-rectangles-mixed"></i>,
        //     component: Templates,
        // },
    ];

    const Page = menu.find((item) => item.key == select).component;

    return (
        <section className="flex h-full w-full relative">
            <div className={`${styles.menu} sticky top-0`}>
                {menu.map((item) => (
                    <button
                        className={`${styles.item} ${select == item.key && "!bg-[var(--ant-color-bg-spotlight)]"}`}
                        key={item.key}
                        onClick={() => setSelect(item.key)}
                    >
                        <>
                            {item.icon}
                            {item.name}
                        </>
                    </button>
                ))}

                <Divider>+</Divider>

                {Object.keys(listOfLayers).map((key, index) => {
                    const layer = listOfLayers[key];

                    return (
                        <button
                            className={styles.item}
                            key={index}
                            onClick={() => {
                                setLayers((prev) => [...prev, layer]);
                            }}
                        >
                            {layer.icon}
                            {layer.name}
                        </button>
                    );
                })}
            </div>
            <div className="h-full flex-grow p-3 overflow-y-auto">
                <Page></Page>
            </div>
        </section>
    );
}
