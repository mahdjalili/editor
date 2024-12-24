import { useState, useEffect, createContext, useRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";

import { layers as listOfLayers } from "@/layers/layers";
import { templatesConverter, defaultTemplate } from "@/templates/templates";

export const EditorContext = createContext();

export const EditorProvider = (props) => {
    const searchParam = useSearchParams();

    const editorContext = {};
    editorContext.stageRef = useRef(null);
    editorContext.listOfLayers = listOfLayers;
    editorContext.selectedTemplate = useState(defaultTemplate);
    editorContext.layers = useState(defaultTemplate.layers);
    editorContext.selectedLayerId = useState(null);

    const [selectedTemplate, setSelectedTemplate] = editorContext.selectedTemplate;
    const [layers, setLayers] = editorContext.layers;
    const [selectedLayerId, setSelectedLayerId] = editorContext.selectedLayerId;

    editorContext.changeTemplate = (template) => {
        console.log("Change Template: ", template);
        setSelectedTemplate(template);
        setLayers(template.layers);
    };

    const template = useQuery({
        queryKey: ["template"],
        queryFn: async () => {
            const template = await axios.get(`${searchParam.get("template")}`);
            return templatesConverter(template.data);
        },

        enabled: !!searchParam.get("template"),
    });

    useEffect(() => {
        if (template.isSuccess) {
            editorContext.changeTemplate(templatesConverter(template.data));
        }
    }, [template.isSuccess]);

    useEffect(() => {
        console.log("Layers Updated: ", layers);
    }, [layers]);

    // Add a new function to handle layer deletion
    const handleDeleteLayer = (event) => {
        if (event.key === "Delete" && selectedLayerId) {
            setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== selectedLayerId));
            setSelectedLayerId(null);
        }
    };

    // Add an effect to handle the keydown event
    useEffect(() => {
        window.addEventListener("keydown", handleDeleteLayer);
        return () => {
            window.removeEventListener("keydown", handleDeleteLayer);
        };
    }, [selectedLayerId]);

    return <EditorContext.Provider value={editorContext}>{props.children}</EditorContext.Provider>;
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
};
