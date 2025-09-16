export default interface IProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    images: {
        image_path: string;
    }[];
}
