import Layers from "@/layers/layers";
const { Background, Text } = Layers;

export const templates = [
    {
        id: "1",
        name: "دریک",
        image: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
        ratio: 1,
        canvasSize: function (size) {
            if (this.ratio <= 1) {
                return {
                    width: size,
                    height: size * this.ratio,
                };
            } else
                return {
                    width: size * this.ratio,
                    height: size,
                };
        },

        layers: [{ ...Background }, { ...Text }],
    },
];

export default templates;
