import { Product } from "./product.interface";

export function transformProductData(data: Product | Product[]): any {

    const transform = (item: Product) => {
        return {
            ...item,
            slug: `${item?.category}_${item?.name}`
        };
    }

    if (!Array.isArray(data)) {
        return transform(data)
    }

    return data?.map((item) => {
        return transform(item)
    })

}
