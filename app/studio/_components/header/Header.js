import styles from "./header.module.css";

import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Switch, Tooltip, Popover } from "antd";
import { useEditor } from "@/providers/EditorProvider";
import { useAnt } from "@/providers/AntProvider";

export default function Header() {
    const antContext = useAnt();
    const [theme, setTheme] = antContext;

    const editor = useEditor();

    const history = editor.history;
    const historyLayers = history.layers[0];
    const step = history.step[0];
    const undo = history.undo;
    const redo = history.redo;

    const handleExportJson = editor.exportTemplateJson;
    const handleExportImage = editor.exportTemplateImage;

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
                <Tooltip title="بازگردانی آخرین تغییرات">
                    <Button
                        disabled={step === 0}
                        onClick={undo}
                        type="text"
                        icon={<i className="fa-regular fa-undo"></i>}
                    ></Button>
                </Tooltip>

                <Tooltip title="تکرار آخرین تغییرات">
                    <Button
                        disabled={step === historyLayers.length - 1}
                        onClick={redo}
                        type="text"
                        icon={<i className="fa-regular fa-redo"></i>}
                    ></Button>
                </Tooltip>

                <Switch
                    checkedChildren="نم روشن"
                    unCheckedChildren="تم تاریک"
                    onChange={(value) => setTheme(value ? "dark" : "light")}
                    defaultChecked={theme === "dark"}
                />

                <Popover
                    content={
                        <div className="flex flex-col gap-2 min-w-[100px]">
                            <Button icon={<i className="fa-regular fa-image"></i>} onClick={handleExportImage} block>
                                تصویر
                            </Button>
                            <Button icon={<i className="fa-regular fa-file-code"></i>} onClick={handleExportJson} block>
                                فایل
                            </Button>
                        </div>
                    }
                >
                    <Button onClick={handleExportImage} type="primary" icon={<DownloadOutlined />} size="large" />
                </Popover>
            </div>
        </div>
    );
}
