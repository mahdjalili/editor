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

    if (props.isLoading) return <Spin />;

    if (props.isError) return <div>Error</div>;

    console.log(props.data);

    return (
        <div>
            {props.data.map((category) => (
                <>
                    <div key={category.id}>{category.category}</div>

                    <div className="grid grid-cols-3 gap-4">
                        {category.props.map((prop) => (
                            <Tooltip key={prop._id} title={prop.name}>
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
                                    className="!border !border-white rounded-md aspect-square object-contain cursor-pointer"
                                    src={`https://${prop.image.bucket}.storage.c2.liara.space/${prop.image.key}`}
                                    alt={prop.name}
                                />
                            </Tooltip>
                        ))}
                    </div>

                    <Divider />
                </>
            ))}
        </div>
    );
}
