import { useEffect, useState } from "react";

export const useSvgColors = (dataUrl) => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (!dataUrl) return;

        // Extract the Base64 part of the data URL
        const base64Svg = dataUrl.split(",")[1];
        if (!base64Svg) return;

        // Decode the Base64 SVG
        const svgString = atob(base64Svg);

        // Parse the SVG content as XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgString, "image/svg+xml");

        // Traverse the SVG and collect colors
        const allElements = xmlDoc.querySelectorAll("*");
        const colorSet = new Set();

        allElements.forEach((element) => {
            // Check 'fill' and 'stroke' attributes
            const fill = element.getAttribute("fill");
            const stroke = element.getAttribute("stroke");

            // Add valid colors to the set
            if (fill && isValidColor(fill)) colorSet.add(fill);
            if (stroke && isValidColor(stroke)) colorSet.add(stroke);
        });

        // Set the colors to state
        setColors(Array.from(colorSet));
    }, [dataUrl]);

    // Helper function to validate colors
    const isValidColor = (color) => {
        // Exclude 'none' and other non-color values
        if (color === "none" || color.startsWith("url(")) return false;
        // Additional validations for color formats could be added here
        return true;
    };

    return colors;
};

export const replaceSvgColor = (dataUrl, targetColor, newColor) => {
    if (!dataUrl || !targetColor || !newColor) return "";

    try {
        // Extract the Base64 part of the data URL
        const base64Svg = dataUrl.split(",")[1];
        if (!base64Svg) return "";

        // Decode the Base64 SVG
        const svgString = atob(base64Svg);

        // Parse the SVG content as XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgString, "image/svg+xml");

        // Traverse the SVG and replace colors
        const allElements = xmlDoc.querySelectorAll("*");

        allElements.forEach((element) => {
            // Replace 'fill' color if it matches targetColor
            const fill = element.getAttribute("fill");
            if (fill && fill === targetColor) {
                element.setAttribute("fill", newColor);
            }

            // Replace 'stroke' color if it matches targetColor
            const stroke = element.getAttribute("stroke");
            if (stroke && stroke === targetColor) {
                element.setAttribute("stroke", newColor);
            }
        });

        // Serialize the modified XML back to a string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(xmlDoc);

        // Encode the modified SVG back to Base64
        const newBase64Svg = btoa(modifiedSvgString);

        // Return the new data URL
        return `data:image/svg+xml;base64,${newBase64Svg}`;
    } catch (error) {
        console.error("Error processing SVG:", error);
        return "";
    }
};

export const useReplaceSvgColors = (dataUrl, colorsReplace) => {
    const [updatedDataUrl, setUpdatedDataUrl] = useState("");

    useEffect(() => {
        if (!dataUrl || !colorsReplace) return;

        let modifiedDataUrl = dataUrl;

        Object.keys(colorsReplace).forEach((targetColor) => {
            const newColor = colorsReplace[targetColor];
            modifiedDataUrl = replaceSvgColor(modifiedDataUrl, targetColor, newColor);
        });

        setUpdatedDataUrl(modifiedDataUrl);
    }, [dataUrl, colorsReplace]);

    return updatedDataUrl;
};
