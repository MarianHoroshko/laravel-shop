import ImageUploader from '@/components/product/ImageUploader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create product',
        href: '/products/create',
    },
];

export default function ProductsIndex() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        images: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('products.store'), {
            forceFormData: true,
        });
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

                        <div className="gap-3">
                            <Label htmlFor="product images">Add images</Label>
                            <ImageUploader onFilesSelect={onFilesSelect} />
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
                            Add product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
