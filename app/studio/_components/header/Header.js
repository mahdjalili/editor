import styles from "./header.module.css";

import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { useEditor } from "@/providers/EditorProvider";

export default function Header() {
    const editor = useEditor();
    const stageRef = editor.stageRef;
    const [, setSelectedLayerId] = editor.selectedLayerId;

    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExport = () => {
        setSelectedLayerId(null);
        setTimeout(() => {
            const uri = stageRef.current.toDataURL();
            downloadURI(uri, "composite.png");
        }, 50);
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
