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
            name: "لایه‌ها",
            icon: <i className="fa-regular fa-layer-group"></i>,
            component: Setting,
        },
        {
            key: 1,
            name: "تولید",
            icon: <i className="fa-regular fa-sparkles"></i>,
            component: Generate,
        },
        {
            key: 2,
            name: "محصولات",
            icon: <i className="fa-regular fa-mug"></i>,
            component: Products,
        },
        {
            key: 3,
            name: "شکل‌ها",
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
        <section className="flex h-full w-full">
            <div className={styles.menu}>
                {menu.map((item) => (
                    <button className={styles.item} key={item.key} onClick={() => setSelect(item.key)}>
                        <>
                            {item.icon}
                            {item.name}
                        </>
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
