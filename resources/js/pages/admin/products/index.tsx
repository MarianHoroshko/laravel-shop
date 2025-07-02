import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface PageProps {
    flash: {
        message?: string;
    }
}

export default function ProductsIndex() {
    const { flash } = usePage().props as unknown as PageProps;

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


            </div>
        </AppLayout>
    );
}
