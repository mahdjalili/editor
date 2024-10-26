import { getProducts } from "@/api/products.api";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const products = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (products.isLoading) return <div>Loading...</div>;
    if (products.isError) return <div>Error: {products.error.message}</div>;

    console.log(products.data);

    return <div>Products</div>;
}
