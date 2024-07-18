import Layers from "@/layers/layers";
const { Background, Text } = Layers;

export const templates = [
    {
        id: "1",
        name: "دریک",
        image: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
        ratio: 1,
        layers: [{ ...Background }, { ...Text }],
    },
];

export default templates;
