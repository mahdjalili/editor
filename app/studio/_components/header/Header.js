import styles from "./header.module.css";

import { useContext } from "react";

import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { EditorContext } from "@/providers/EditorProvider";

export default function Header() {
    const editorContext = useContext(EditorContext);
    const stageRef = editorContext.stageRef;

    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExport = () => {
        console.log(stageRef);
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, "stage.png");
    };

    return (
        <div className={styles.wrapper}>
            <div>
                <Button type="text" icon={<i className="fa-regular fa-bars"></i>}></Button>

                <Breadcrumb
                    items={[
                        {
                            title: "پروژه‌های من",
                        },
                        {
                            title: "پروژه تستی",
                        },
                    ]}
                ></Breadcrumb>

                <i className={`${styles.cloud_save} fa-light fa-cloud-check`}></i>
            </div>

            <div>
                <Button onClick={handleExport} type="primary" icon={<DownloadOutlined />} size="large" />
            </div>
        </div>
    );
}
