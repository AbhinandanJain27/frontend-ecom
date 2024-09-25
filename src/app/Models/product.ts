export class product {
    productId: number;
    productName: string;
    price: number;
    description: string;
    byteImg: string;
    categoryId: number;
    img?: File;
    imageUrl?: string;
    processedImage?: string;
    categoryName?:string;

    constructor(productId: number, productName: string, price: number, description: string, byteImg: string, categoryId: number) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.byteImg = byteImg;
        this.categoryId = categoryId;
    }
}