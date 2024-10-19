"use client";

import style from "./templates.module.css";

import { useContext } from "react";

import { EditorContext } from "@/providers/EditorProvider";

export default function Templates() {
    const templatesContext = useContext(EditorContext);

    const [templates, setTemplates] = templatesContext.templates;

    return (
        <div className={style.wrapper}>
            <div className={style.list}>
                {templates.map((t, index) => (
                    <Item key={index} {...t}></Item>
                ))}
            </div>
        </div>
    );
}

import { Card, Image } from "antd";

export const Item = (props) => {
    const templatesContext = useContext(EditorContext);
    const [selectedTemplate, setSelectedTemplate] = templatesContext.selectedTemplate;

    const changeTemplate = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <Card
            cover={<Image src={props.image}></Image>}
            actions={[
                <div key={"action"} onClick={() => changeTemplate(props)}>
                    انتخاب
                </div>,
            ]}
        >
            <Card.Meta title={props.name}></Card.Meta>
        </Card>
    );
};
