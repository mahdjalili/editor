import Layers from "@/layers/layers";
const { Text, Image, Shape, Background } = Layers;

import template from "@/templates/example.json";

export const templatesConverter = (template) => {
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

export const templateExporter = (template) => {
    return {
        id: template.id,
        width: template.width,
        height: template.height,
        ratio: template.ratio,
        thumbnail: template.thumbnail,
        pages: [
            {
                background: template.background,
                children: template.layers.map((layer) => {
                    return {
                        ...layer,
                    };
                }),
            },
        ],
    };
};

export const defaultTemplate = templatesConverter(template);
