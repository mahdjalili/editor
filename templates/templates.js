import Layers from "@/layers/layers";
const { Background, Text, Image, Shape } = Layers;

import templatesJson from "./templates.json" assert { type: "json" };
import psdTemplate from "./psd.json" assert { type: "json" };

const templatesConverter = (template) => {
    return {
        id: "1",
        ratio: template.width / template.height,
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
        background: template.pages[0]?.background,
        ...template,
        layers: template.pages[0].children.map((layer) => {
            if (layer.type == "image") {
                return {
                    ...Image,
                    id: layer.id,
                    src: layer.src,
                    width: layer.width,
                    height: layer.height,
                    x: layer.x,
                    y: layer.y,
                    rotation: layer.rotation,
                    stroke: layer.borderColor,
                    strokeWidth: layer.borderSize,
                    opacity: layer.opacity,
                    keepRatio: layer.keepRatio,
                };
            } else if (layer.type == "svg") {
                return {
                    ...Shape,
                    id: layer.id,
                    src: layer.src,
                    width: layer.width,
                    height: layer.height,
                    x: layer.x,
                    y: layer.y,
                    rotation: layer.rotation,
                    stroke: layer.borderColor,
                    strokeWidth: layer.borderSize,
                    opacity: layer.opacity,
                    keepRatio: layer.keepRatio,
                    colorsReplace: layer.colorsReplace,
                };
            } else if (layer.type == "text") {
                return {
                    ...Text,
                    ...layer,
                };
            } else return { ...layer };
        }),
    };
};

export const templates = [templatesConverter(templatesJson[0])];

export default templates;
