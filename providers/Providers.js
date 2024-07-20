"use client";

import { EditorProvider } from "@/providers/EditorProvider";
import AntProvider from "./AntProvider";

export default function Providers({ children }) {
    return (
        <AntProvider>
            <EditorProvider>{children}</EditorProvider>
        </AntProvider>
    );
}
