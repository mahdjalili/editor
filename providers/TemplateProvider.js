import { useState, useEffect, createContext } from "react";

import Text, { TextSetting, TextDefault } from "@/components/text/Text";
import Image, { ImageSetting, ImageDefault } from "@/components/image/Image";
import Background, { BackgroundSetting, BackgroundDefault } from "@/components/background/Background";

const componentList = [
    {
        component: TextDefault,
    },
    {
        component: ImageDefault,
    },
    {
        component: BackgroundDefault,
    },
];

const templates = [
    {
        id: "1",
        name: "دریک",
        image: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
        ratio: 1,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
            },
        ],
    },
    {
        id: "2",
        name: "چک بتمن",
        image: "https://imgflip.com/s/meme/Batman-Slapping-Robin.jpg",
        ratio: 1,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Batman-Slapping-Robin.jpg",
            },
        ],
    },
    {
        id: "3",
        name: "درد پنهان",
        image: "https://imgflip.com/s/meme/Hide-the-Pain-Harold.jpg",
        ratio: 0.8,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Hide-the-Pain-Harold.jpg",
            },
        ],
    },
    {
        id: "4",
        name: "دو دکمه",
        image: "https://imgflip.com/s/meme/Two-Buttons.jpg",
        ratio: 0.66,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Two-Buttons.jpg",
            },
        ],
    },
    {
        id: "5",
        name: "نظرمو عوض کن",
        image: "https://imgflip.com/s/meme/Change-My-Mind.jpg",
        ratio: 1.335,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Change-My-Mind.jpg",
            },
        ],
    },
    {
        id: "6",
        name: "خروج از راست",
        image: "https://imgflip.com/s/meme/Left-Exit-12-Off-Ramp.jpg",
        ratio: 1.048,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Left-Exit-12-Off-Ramp.jpg",
            },
        ],
    },
    {
        id: "7",
        name: "سگ بوف vs چیم",
        image: "https://imgflip.com/s/meme/Buff-Doge-vs-Cheems.png",
        ratio: 1.3,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Buff-Doge-vs-Cheems.png",
            },
        ],
    },
    {
        id: "8",
        name: "گسترش مغز",
        image: "https://imgflip.com/s/meme/Expanding-Brain.jpg",
        ratio: 0.712,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Expanding-Brain.jpg",
            },
        ],
    },
    {
        id: "9",
        name: "میمون عروسکی",
        image: "https://imgflip.com/s/meme/Monkey-Puppet.jpg",
        ratio: 1,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Monkey-Puppet.jpg",
            },
        ],
    },
    {
        id: "10",
        name: "پابلو اسکوبار ناراحت",
        image: "https://imgflip.com/s/meme/Sad-Pablo-Escobar.jpg",
        ratio: 1,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://imgflip.com/s/meme/Sad-Pablo-Escobar.jpg",
            },
        ],
    },
    {
        id: "11",
        name: "... بوده؟ نبوده؟",
        image: "https://i.imgflip.com/5c7lwq.png",
        ratio: 1,
        components: [
            {
                id: "1",
                component: Background,
                componentSetting: BackgroundSetting,
                url: "https://i.imgflip.com/5c7lwq.png",
            },
        ],
    },
];

export const TemplatesContext = createContext();

export const TemplatesProvider = (props) => {
    const templatesContext = {};

    templatesContext.componentList = componentList;
    templatesContext.templates = useState(templates);
    templatesContext.selectedTemplate = useState(templates[0]);
    templatesContext.components = useState(templates[0].components);

    useEffect(() => {
        templatesContext.components[1](templatesContext.selectedTemplate[0].components);
        console.log(templatesContext.selectedTemplate[0]);
    }, [templatesContext.selectedTemplate[0]]);

    useEffect(() => {
        console.log("components updated", templatesContext.components[0]);
    }, [templatesContext.components[0]]);

    return <TemplatesContext.Provider value={templatesContext}>{props.children}</TemplatesContext.Provider>;
};
