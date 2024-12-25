"use client";

import dynamic from "next/dynamic";

const Text = dynamic(() => import("@/layers/text/Text"), { ssr: false });
const Image = dynamic(() => import("@/layers/image/Image"), { ssr: false });
const Shape = dynamic(() => import("@/layers/shape/Shape"), { ssr: false });
const Background = dynamic(() => import("@/layers/background/Background"), { ssr: false });

export const layers = {
    Text: Text,
    Image: Image,
    Shape: Shape,
    Background: Background,
};

export default layers;
