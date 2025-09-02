import ImageUploader from '@/components/product/ImageUploader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import IProductCategory from '@/types/products/IProductCategory';
import IProductCategoryType from '@/types/products/IProductCategoryType';
import { Head, useForm, usePage } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update product',
        href: '/products/update/{id}',
    },
];

interface IProduct {
    id: number;
    name: string;
    product_category_id: string;
    price: string;
    description: string;
    images: File[];
}

interface UpdateProps {
    productCategoryTypes: IProductCategoryType[];
    product: IProduct;
}

export default function ProductsIndex() {
    const { productCategoryTypes, product } = usePage().props as unknown as UpdateProps;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        id: product.id,
        name: product.name,
        category_id: product.product_category_id,
        price: product.price,
        description: product.description,
        images: product.images as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(data);

        post(route('admin.products.update', product.id), {
            forceFormData: true,
        });
    };

    const handleCategorySelect = (categoryId: string) => {
        setData('category_id', categoryId);
    };

    const onFilesSelect = (files: File[]) => {
        setData('images', files);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create product" />

            {Object.keys(errors).length > 0 && (
                <div className="m-4 w-8/12">
                    <Alert variant="destructive">
                        <AlertCircleIcon />

                        <AlertTitle>Unable to add new product.</AlertTitle>

                        <AlertDescription>
                            <p>Please verify your product information and try again.</p>

                            <ul className="list-inside list-disc text-sm">
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="m-4 w-8/12">
                <h2 className="font-bold">Create a new product</h2>

                <form onSubmit={handleSubmit}>
                    <div className="m-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Name</Label>
                            <Input
                                type="text"
                                placeholder="Produnct name"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="product category">Choose product category</Label>
                            <Select defaultValue={product.product_category_id.toString()} onValueChange={handleCategorySelect}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a procuct category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {productCategoryTypes.map((categoryType: IProductCategoryType) => (
                                        <SelectGroup key={categoryType.id}>
                                            <SelectLabel>{categoryType.name}</SelectLabel>

                                            {categoryType.categories.map((category: IProductCategory) => (
                                                <SelectItem value={category.id.toString()} key={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="gap-3">
                            <Label htmlFor="product images">Add images</Label>
                            <ImageUploader filesProps={product.images} onFilesSelect={onFilesSelect} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Price</Label>
                            <Input
                                type="number"
                                placeholder="Produnct name"
                                value={data.price}
                                onChange={(event) => setData('price', event.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Description</Label>
                            <Textarea
                                placeholder="Produnct name"
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                            />
                        </div>

                        <Button disabled={processing} type="submit" className="float-end">
                            Update product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
