import ImageDefault from "@/layers/image/Image";
import { useEditor } from "@/providers/EditorProvider";

import { Spin, Image, Tooltip, Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getProps } from "@/api/props.api";

export default function Props() {
    const editor = useEditor();
    const [layers, setLayers] = editor.layers;

    const props = useQuery({
        queryKey: ["props"],
        queryFn: getProps,
    });

    if (props.isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spin />
            </div>
        );

    if (props.isError) return <div>Error</div>;

    return (
        <div>
            {props.data.map((category) => (
                <>
                    <h4 key={category.id}>{category.category}</h4>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {category.props.map((prop) => (
                            <Tooltip
                                placement="bottom"
                                key={prop._id}
                                title={
                                    <div className="flex flex-col">
                                        <span className="font-bold">{prop.name}</span>
                                        <span className="text-xs text-white/70">برای اضافه کردن کلیک کنید.</span>
                                    </div>
                                }
                            >
                                <Image
                                    onClick={() => {
                                        setLayers((prev) => [
                                            ...prev,
                                            {
                                                ...ImageDefault,
                                                name: prop.name,
                                                id: prop._id,
                                                src: `https://${prop.image.bucket}.storage.c2.liara.space/${prop.image.key}`,
                                            },
                                        ]);
                                    }}
                                    preview={false}
                                    style={{
                                        border: "1px solid var(--ant-color-border)",
                                        transition: "all 0.3s ease",
                                    }}
                                    className="hover:border-primary hover:shadow-md hover:scale-105 p-1 rounded-[var(--ant-border-radius)] aspect-square object-contain cursor-pointer"
                                    src={`https://${prop.image.bucket}.storage.c2.liara.space/${prop.image.key}`}
                                    alt={prop.name}
                                />
                            </Tooltip>
                        ))}
                    </div>
                </>
            ))}
        </div>
    );
}
