import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface IPages {
    current_page: number;
    data: IProduct[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface IProduct {
    id: string;
    name: string;
    description: string;
    price: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    pages: IPages;
}

export default function ProductsIndex() {
    const { flash, pages } = usePage().props as unknown as PageProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="m-4">
                <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                    {flash.message && (
                        <Alert>
                            <CheckCircle2Icon />
                            <AlertTitle>Success! Your product have been added</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="justify-self-end">
                        <Link href={route('products.create')}>
                            <Button>Add new product</Button>
                        </Link>
                    </div>
                </div>

                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.data.length > 0 &&
                            pages.data.map((product: IProduct) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-right">${product.price}</TableCell>
                                    <TableCell className="space-x-3 text-center">
                                        <Button>
                                            <Pencil />
                                        </Button>
                                        <Button className="bg-red-500 hover:bg-red-700">
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <div className="float-end m-2 space-x-0.5">
                    {pages.links.length > 0 &&
                        pages.links.map((link, index) => (
                            <Link key={index} href={link.url || '#'}>
                                <Button disabled={link.active} dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        ))}
                </div>
            </div>
        </AppLayout>
    );
}
