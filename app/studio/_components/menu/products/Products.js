import { Spin } from "antd";
import { getProducts } from "@/api/products.api";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const products = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (products.isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spin />
            </div>
        );

    if (products.isError) return <div>Error: {products.error.message}</div>;

    return <div>Products</div>;
}
