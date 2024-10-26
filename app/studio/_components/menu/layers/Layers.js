"use client";

import style from "./layers.module.css";

import { Button, Empty } from "antd";
import { useContext, useCallback, useRef } from "react";
import { EditorContext } from "@/providers/EditorProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";

// Define a type for the draggable items
const ItemType = {
    LAYER: "layer",
};

export default function Setting() {
    const editorContext = useContext(EditorContext);

    const [layers, setLayers] = editorContext.layers;

    // Function to handle moving a layer
    const moveLayer = useCallback(
        (dragIndex, hoverIndex) => {
            const draggedLayer = layers[dragIndex];
            const updatedLayers = [...layers];
            updatedLayers.splice(dragIndex, 1);
            updatedLayers.splice(hoverIndex, 0, draggedLayer);
            setLayers(updatedLayers);
        },
        [layers, setLayers]
    );

    const removeLayer = useCallback(
        (index) => {
            const newLayers = layers.slice();
            newLayers.splice(index, 1);
            setLayers(newLayers);
        },
        [layers, setLayers]
    );

    if (layers.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="هیچ لایه‌ای وجود ندارد" />;
    }

    return (
        <DndProvider backend={HTML5Backend} className={style.wrapper}>
            <div className={style.list}>
                {layers.map((layer, index) => (
                    <Layer
                        key={`key-${index}`}
                        index={index}
                        layer={layer}
                        moveLayer={moveLayer}
                        removeLayer={removeLayer}
                    />
                ))}
            </div>
        </DndProvider>
    );
}

// New Layer component to handle drag and drop
function Layer({ layer, index, moveLayer, removeLayer }) {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemType.LAYER,
        hover(item) {
            if (item.index !== index) {
                moveLayer(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.LAYER,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="cursor-grab relative">
            <div className="flex justify-between items-center absolute top-2 left-2  z-10">
                <Button
                    color="danger"
                    icon={<i className="fa-regular fa-trash-can"></i>}
                    onClick={() => removeLayer(index)}
                />
            </div>
            <layer.componentSetting
                component={layer}
                onChange={(newData) => {
                    const newComponents = layers.slice();
                    newComponents[index] = newData;
                    setLayers(newComponents);
                }}
            />
        </div>
    );
}
