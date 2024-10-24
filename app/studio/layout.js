"use client";

import styles from "./layout.module.css";

import Menu from "@studio/menu/Menu";
import Header from "@studio/header/Header";

import { Layout } from "antd";

export default function layout({ children }) {
    return (
        <Layout className="h-full w-full">
            <Layout.Header className={styles.header}>
                <Header></Header>
            </Layout.Header>

            <Layout className="h-full">
                <Layout.Sider className={styles.sider} width={"25%"}>
                    <Menu></Menu>
                </Layout.Sider>
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </Layout>
    );
}
