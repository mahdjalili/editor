"use client";

import { TemplatesProvider } from "@/providers/TemplateProvider";

export default function Providers({ children }) {
    return (
        <>
            <TemplatesProvider>{children}</TemplatesProvider>
        </>
    );
}
