import { useState, useEffect, createContext, useRef } from "react";

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

    const [selectedTemplate, setSelectedTemplate] = editorContext.selectedTemplate;
    const [layers, setLayers] = editorContext.layers;

    console.log("List of Layer: ", listOfLayers);

    useEffect(() => {
        setLayers(selectedTemplate.layers);
    }, [selectedTemplate]);

    useEffect(() => {
        console.log("Layers Updated: ", layers);
    }, [layers]);

    return <EditorContext.Provider value={editorContext}>{props.children}</EditorContext.Provider>;
};
