import { createContext, useEffect, useContext, useState, use } from "react";
import { ConfigProvider, theme as antTheme } from "antd";

export const AntContext = createContext();

export default function AntProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const themeobj = {
        cssVar: true,
        hashed: false,
        algorithm: theme == "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
            fontFamily: "Vazirmatn",
            borderRadius: 12,
            colorPrimary: "#228BC6",
        },
    };

    return (
        <AntContext.Provider value={[theme, setTheme]}>
            <ConfigProvider theme={themeobj}>{children}</ConfigProvider>
        </AntContext.Provider>
    );
}

export const useAnt = () => {
    const context = useContext(AntContext);
    if (!context) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
};
