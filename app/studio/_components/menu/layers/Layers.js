"use client";

import style from "./layers.module.css";
import { Button, Empty, Card, Collapse } from "antd";
import { useContext, useCallback, useRef } from "react";
import { EditorContext } from "@/providers/EditorProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";

export default function Setting() {
    const editorContext = useContext(EditorContext);
    const [layers, setLayers] = editorContext.layers;

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
            const updatedLayers = [...layers];
            updatedLayers.splice(index, 1);
            setLayers(updatedLayers);
        },
        [layers, setLayers]
    );

    if (layers.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="هیچ لایه‌ای وجود ندارد" />;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.setting}>
                {layers.map((layer, index) => (
                    <Layer key={layer.id} layer={layer} index={index} moveLayer={moveLayer} removeLayer={removeLayer} />
                ))}
            </div>
        </DndProvider>
    );
}

const ItemType = {
    LAYER: "layer",
};

function Layer({ layer, index, moveLayer, removeLayer }) {
    const editorContext = useContext(EditorContext);
    const [layers, setLayers] = editorContext.layers;
    const [selectedLayerId, setSelectedLayerId] = editorContext.selectedLayerId;
    const ref = useRef(null);

    // Drop functionality
    const [{ isOver }, drop] = useDrop({
        accept: ItemType.LAYER,

        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Get rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Get mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveLayer(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // Drag functionality
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.LAYER,
        item: { type: ItemType.LAYER, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Initialize drag and drop on the same ref
    drag(drop(ref));

    return (
        <Card
            extra={
                <Button
                    size="small"
                    danger
                    icon={<i className="fa-regular fa-trash-can"></i>}
                    onClick={() => removeLayer(index)}
                />
            }
            title={layer.name}
            ref={ref}
            style={{
                border: selectedLayerId === layer.id ? "1px solid var(--ant-color-primary)" : "",
                opacity: isDragging ? 0.2 : 1,
                cursor: "move",
                backgroundColor: isOver ? "#fafafa" : "",
                transform: isDragging ? "scale(1)" : "scale(1)",
                transition: "all 0.2s ease",
                marginBottom: 10,
            }}
            onClick={() => setSelectedLayerId(layer.id)}
            onDragStart={(e) => setSelectedLayerId(layer.id)}
            size="small"
        >
            <Collapse>
                <Collapse.Panel header="تنظیمات" key="1">
                    <layer.componentSetting
                        component={layer}
                        onChange={(newData) => {
                            const newLayers = layers.slice();
                            newLayers[index] = newData;
                            setLayers(newLayers);
                        }}
                    />
                </Collapse.Panel>
            </Collapse>
        </Card>
    );
}
