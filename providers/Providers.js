"use client";

import { EditorProvider } from "@/providers/EditorProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AntProvider from "./AntProvider";

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AntProvider>
                <EditorProvider>{children}</EditorProvider>
            </AntProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
