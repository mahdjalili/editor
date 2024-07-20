"use client";

import style from "./templates.module.css";

import { useContext } from "react";

import { EditorContext } from "@/providers/EditorProvider";

export default function Templates() {
    const templatesContext = useContext(EditorContext);

    const [templates, setTemplates] = templatesContext.templates;
    const [selectedTemplate, setSelectedTemplate] = templatesContext.selectedTemplate;

    const changeTemplate = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.list}>
                {templates.map((t, index) => (
                    <div key={index} onClick={() => changeTemplate(t)} className={`${style.item} widget`}>
                        <img src={t.image} alt={t.name}></img>
                        <span>{t.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
