import "./globals.css";
import "@xyflow/react/dist/style.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/providers/Providers";

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body>
                <AntdRegistry>
                    <Providers>{children}</Providers>
                </AntdRegistry>
            </body>
        </html>
    );
}
