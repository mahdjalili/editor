"use client";

import dynamic from "next/dynamic";

import Text from "@/layers/text/Text";
import Image from "@/layers/image/Image";
import Shape from "@/layers/shape/Shape";
import Background from "@/layers/background/Background";

export const layers = {
    Text: Text,
    Image: Image,
    Shape: Shape,
    // Background: Background,
};

export default layers;
