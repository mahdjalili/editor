"use client";

import style from "./templates.module.css";

import { useContext } from "react";

import { EditorContext } from "@/providers/EditorProvider";

export default function Templates() {
    const templatesContext = useContext(EditorContext);

    const [templates, setTemplates] = templatesContext.templates;

    return (
        <div className={style.wrapper}>
            <div className="grid grid-cols-2 gap-2">
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
            className="rounded-[var(--ant-border-radius)]"
            cover={<Image className="rounded-[var(--ant-border-radius)]" src={props.image} alt={props.name}></Image>}
            actions={[
                <div key={"action"} onClick={() => changeTemplate(props)}>
                    انتخاب
                </div>,
            ]}
            bodyStyle={{ padding: 0 }}
        >
            <Card.Meta title={props.name}></Card.Meta>
        </Card>
    );
};
