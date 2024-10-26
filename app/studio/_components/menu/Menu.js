import styles from "./menu.module.css";
import { useState, useContext } from "react";
import { Divider } from "antd";

import { EditorContext } from "@/providers/EditorProvider";

import Setting from "./layers/Layers";
import Templates from "./templates/Templates";
import Props from "./props/Props";
import Generate from "./generate/Generate";
import Products from "./products/Products";

export default function Menu() {
    const editorContext = useContext(EditorContext);
    const listOfLayers = editorContext.listOfLayers;
    const [layers, setLayers] = editorContext.layers;

    const [select, setSelect] = useState(0);

    const menu = [
        {
            key: 0,
            name: "تولید",
            icon: <i className="fa-regular fa-sparkles"></i>,
            component: Generate,
        },
        {
            key: 1,
            name: "لایه‌ها",
            icon: <i className="fa-regular fa-layer-group"></i>,
            component: Setting,
        },
        {
            key: 2,
            name: "محصول",
            icon: <i className="fa-regular fa-mug"></i>,
            component: Products,
        },
        {
            key: 3,
            name: "اشیاء",
            icon: <i className="fa-regular fa-shapes"></i>,
            component: Props,
        },
        {
            key: 4,
            name: "تمپلیت‌ها",
            icon: <i className="fa-regular fa-rectangles-mixed"></i>,
            component: Templates,
        },
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

                {Object.keys(listOfLayers).map((layer, index) => {
                    const defaultValue = listOfLayers[layer];

                    return (
                        <button
                            className={styles.item}
                            key={index}
                            onClick={() => {
                                setLayers((prev) => [...prev, defaultValue.component]);
                            }}
                        >
                            {defaultValue.icon}
                            {defaultValue.name}
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
