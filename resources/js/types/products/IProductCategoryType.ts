import IProductCategory from '@/types/products/IProductCategory';

export default interface IProductCategoryType {
    id: number;
    name: string;
    categories: IProductCategory[];
}
