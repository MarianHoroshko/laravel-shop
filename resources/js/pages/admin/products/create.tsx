import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create product',
        href: '/products/create',
    },
];

export default function ProductsIndex() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        price: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);

        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create product" />

            <div className="m-4 w-8/12">
                <h2 className="font-bold">Create a new product</h2>

                <form onSubmit={handleSubmit}>
                    <div className="m-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Name</Label>
                            <Input type="text" placeholder="Produnct name" value={data.name} onChange={(event) => setData('name', event.target.value)} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Price</Label>
                            <Input type="number" placeholder="Produnct name" value={data.price} onChange={(event) => setData('price', event.target.value)} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="product name">Description</Label>
                            <Textarea placeholder="Produnct name" value={data.description} onChange={(event) => setData('description', event.target.value)} />
                        </div>

                        <Button type="submit" className="float-end">Add product</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
