import style from "./Background.module.css";
import { Image as ImageKonva } from "react-konva";
import useImage from "use-image";

export default function Background({ shapeProps, width, height, onSelect }) {
    const [image] = useImage(shapeProps.url);

    return (
        <ImageKonva
            onTap={onSelect}
            onClick={onSelect}
            width={width}
            height={height}
            image={image}
            {...shapeProps}
        ></ImageKonva>
    );
}

export function BackgroundSetting() {
    return <></>;
}

export function BackgroundDefault({ onClick }) {
    const def = {
        id: "1",
        component: Background,
        componentSetting: BackgroundSetting,
        url: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
    };

    return (
        <button
            className={`${style.button} widget`}
            onClick={() => {
                onClick(def);
            }}
        >
            اضافه کردن بکگراند
        </button>
    );
}
