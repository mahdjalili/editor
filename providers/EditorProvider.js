"use client";

import { useState, useEffect, createContext, useRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import WebFont from "webfontloader";
import { layers as listOfLayers } from "@/layers/layers";
import { templatesConverter, defaultTemplate } from "@/templates/templates";
import { isEmpty, set } from "lodash";

export const EditorContext = createContext();

export const EditorProvider = (props) => {
    const searchParam = useSearchParams();

    const editorContext = {};
    editorContext.stageRef = useRef(null);

    editorContext.listOfLayers = listOfLayers;

    editorContext.selectedTemplate = useState(defaultTemplate);
    editorContext.layers = useState(defaultTemplate.layers);
    editorContext.selectedLayerId = useState(defaultTemplate.layers[0].id);

    const [selectedTemplate, setSelectedTemplate] = editorContext.selectedTemplate;
    const [layers, setLayers] = editorContext.layers;
    const [selectedLayerId, setSelectedLayerId] = editorContext.selectedLayerId;

    editorContext.history = {};
    editorContext.history.layers = useState([defaultTemplate.layers]);
    editorContext.history.step = useState(0);

    const [history, setHistory] = editorContext.history.layers;
    const [historyStep, setHistoryStep] = editorContext.history.step;

    editorContext.changeTemplate = (template) => {
        console.log("Template Has Been Changed: ", template);

        skipEffectRef.current = true;
        setSelectedTemplate(template);
        setLayers(template.layers);
        setSelectedLayerId(template.layers[0].id);

        setHistory([template.layers]);
        setHistoryStep(0);
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

    // Load google fonts dynamically when layers change
    useEffect(() => {
        console.log("Layers Changed:", layers);
        let fontFamilies = layers.filter((layer) => layer.type == "text").map((layer) => layer.fontFamily);
        if (!isEmpty(fontFamilies)) {
            WebFont.load({
                google: {
                    families: fontFamilies,
                },
            });
        }
    }, [layers]);

    // Updating the history when layers change
    const skipEffectRef = useRef(false);
    useEffect(() => {
        if (skipEffectRef.current) {
            // Skip the effect when undo/redo is called
            skipEffectRef.current = false;
            return;
        }

        setHistoryStep((step) => {
            let nextStep = step + 1;
            setHistory((prevHistory) => {
                let newHistory = prevHistory;
                newHistory[nextStep] = layers;
                return newHistory;
            });
            return nextStep;
        });
    }, [layers]);

    useEffect(() => {
        console.log("History Step:", historyStep, "History:", history);
    }, [historyStep]);

    editorContext.history.undo = () => {
        if (historyStep === 0) {
            return;
        }

        skipEffectRef.current = true;
        setHistoryStep((step) => {
            setLayers(history[step - 1]);
            return step - 1;
        });
    };

    editorContext.history.redo = () => {
        if (historyStep === history.length - 1) {
            return;
        }

        skipEffectRef.current = true;
        setHistoryStep((step) => {
            setLayers(history[step + 1]);
            return step + 1;
        });
    };

    useEffect(() => {
        const handleDeleteLayer = (event) => {
            if (event.key === "Delete" && selectedLayerId) {
                setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== selectedLayerId));
                setSelectedLayerId(null);
            }
        };

        window.addEventListener("keydown", handleDeleteLayer);
        return () => {
            window.removeEventListener("keydown", handleDeleteLayer);
        };
    }, [selectedLayerId]);

    if (template.isLoading) {
        return <div>Loading...</div>;
    }
    return <EditorContext.Provider value={editorContext}>{props.children}</EditorContext.Provider>;
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
};
