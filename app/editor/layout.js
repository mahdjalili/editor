"use client";

import Menu from "./_components/menu/Menu";
import { Layout } from "antd";

export default function layout({ children }) {
    return (
        <Layout className="flex items-center justify-between h-full w-full">
            <Layout.Sider width="25%" className="h-full ant-layout-sider-light">
                <Menu></Menu>
            </Layout.Sider>

            <Layout>
                {/* <Layout.Header>Header</Layout.Header> */}
                <Layout.Content>{children}</Layout.Content>
                {/* <Layout.Footer>Footer</Layout.Footer> */}
            </Layout>
        </Layout>
    );
}
