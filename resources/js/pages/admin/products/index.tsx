import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('admin.products.index'),
    },
];
interface ILink {
    url: string | null;
    label: string;
    active: boolean;
}

interface IPages {
    current_page: number;
    data: IProduct[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: ILink[];
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

    const { processing, delete: destroy } = useForm();

    const handleDeleteProduct = (id: string) => {
        destroy(route('admin.products.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="m-4">
                <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                    {flash.message && (
                        <Alert>
                            <CheckCircle2Icon />
                            <AlertTitle>Your action have been successful.</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="justify-self-end">
                        <Link href={route('admin.products.create')}>
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
                                        <Link href={route('admin.products.edit', { product: product.id })}>
                                            <Button>
                                                <Pencil />
                                            </Button>
                                        </Link>

                                        <AlertDialog>
                                            <AlertDialogTrigger className={buttonVariants({ variant: 'destructive' })}>
                                                <Trash />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete product{' '}
                                                        {`${product.name} with id: ${product.id}`} and remove data from the server.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction disabled={processing} onClick={() => handleDeleteProduct(product.id)}>
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
