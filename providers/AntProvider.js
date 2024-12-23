import { useState } from "react";
import { ConfigProvider, theme as antTheme } from "antd";

export default function AntProvider({ children }) {
    const themeobj = {
        cssVar: true,
        hashed: false,
        algorithm: antTheme.darkAlgorithm,
        token: {
            fontFamily: "Vazirmatn",
        },
    };

    return <ConfigProvider theme={themeobj}>{children}</ConfigProvider>;
}
