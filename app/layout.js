import "./globals.css";

import Providers from "@/providers/Providers";

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
