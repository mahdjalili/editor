import { ConfigProvider, theme as antTheme } from "antd";

export default function AntProvider({ children }) {
    const theme = {
        cssVar: true,
        hashed: false,
        algorithm: antTheme.darkAlgorithm,
    };

    return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
