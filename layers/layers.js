"use client";

import dynamic from "next/dynamic";



export const layers = {
    Text: dynamic(() => import("@/layers/text/Text")),
    Image: dynamic(() => import("@/layers/image/Image")),
    Shape: dynamic(() => import("@/layers/shape/Shape")),
    // Background: dynamic(() => import("@/layers/background/Background")),
};

export default layers;
