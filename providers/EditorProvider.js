import { useState, useEffect, createContext, useRef, useContext } from "react";

import { layers as listOfLayers } from "@/layers/layers";
import templates from "@/templates/templates";

export const EditorContext = createContext();

export const EditorProvider = (props) => {
    const editorContext = {};
    editorContext.stageRef = useRef(null);
    editorContext.listOfLayers = listOfLayers;
    editorContext.templates = useState(templates);
    editorContext.selectedTemplate = useState(templates[0]);
    editorContext.layers = useState(templates[0].layers);
    editorContext.selectedLayerId = useState(null);

    const [selectedTemplate, setSelectedTemplate] = editorContext.selectedTemplate;
    const [layers, setLayers] = editorContext.layers;
    const [selectedLayerId, setSelectedLayerId] = editorContext.selectedLayerId;

    // console.log("List of Layer: ", listOfLayers);

    useEffect(() => {
        setLayers(selectedTemplate.layers);
    }, [selectedTemplate]);

    useEffect(() => {
        console.log("Layers Updated: ", layers);
    }, [layers]);

    // Add a new function to handle layer deletion
    const handleDeleteLayer = (event) => {
        if ((event.key === "Delete" || event.key === "Backspace") && selectedLayerId) {
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
