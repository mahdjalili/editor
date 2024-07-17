"use client";

import style from "./templates.module.css";

import { useContext } from "react";

import { TemplatesContext } from "@/providers/TemplateProvider";

export default function Templates() {
    const templatesContext = useContext(TemplatesContext);

    const [templates, setTemplates] = templatesContext.templates;
    const [selectedTemplate, setSelectedTemplate] = templatesContext.selectedTemplate;

    const changeTemplate = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <div className={style.wrapper}>
            <header>
                <h2>میم ها</h2>
            </header>
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
