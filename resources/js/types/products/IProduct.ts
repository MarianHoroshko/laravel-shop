import IProductCategory from './IProductCategory';

export default interface IProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    category: IProductCategory;
    images: {
        image_path: string;
    }[];
}
