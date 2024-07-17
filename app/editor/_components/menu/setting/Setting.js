"use client";

import style from "./Setting.module.css";

import { useContext } from "react";

import { TemplatesContext } from "@/providers/TemplateProvider";

export default function Setting() {
    const templatesContext = useContext(TemplatesContext);

    const [components, setComponents] = templatesContext.components;
    const componentList = templatesContext.componentList;

    return (
        <div className={style.wrapper}>
            <header>
                <h2>تنظیمات</h2>
            </header>
            <div className={style.list}>
                {components.map((component, index) => (
                    <component.componentSetting
                        key={`key-${index}`}
                        component={component}
                        onChange={(newData) => {
                            const newComponents = components.slice();
                            newComponents[index] = newData;
                            setComponents(newComponents);
                        }}
                    ></component.componentSetting>
                ))}
            </div>
            <div className={style.add}>
                {componentList.map((component, index) => (
                    <component.component
                        key={index}
                        onClick={(data) => {
                            setComponents((prev) => [...prev, data]);
                        }}
                    ></component.component>
                ))}
            </div>
        </div>
    );
}
