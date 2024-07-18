"use client";

import { EditorProvider } from "@/providers/EditorProvider";

export default function Providers({ children }) {
    return (
        <>
            <EditorProvider>{children}</EditorProvider>
        </>
    );
}
