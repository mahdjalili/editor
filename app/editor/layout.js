"use client";

import styles from "./layout.module.css";

import Menu from "./_components/menu/Menu";
import { Layout, theme } from "antd";

export default function layout({ children }) {
    const { token } = theme.useToken();

    return (
        <Layout className="h-full w-full">
            <Layout.Header className={styles.header}></Layout.Header>

            <Layout className="h-full">
                <Layout.Sider className={styles.sider} width={"20%"}>
                    <Menu></Menu>
                </Layout.Sider>
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </Layout>
    );
}
