import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banners',
        href: route('admin.banners.index'),
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
    banner?: {
        href: string;
        image_path: string;
    };
}

export default function BannersIndex() {
    const { flash, banner } = usePage().props as unknown as PageProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Banners" />

            <div className="m-4">
                {flash.message && (
                    <Alert>
                        <CheckCircle2Icon />
                        <AlertTitle>Your action have been successful.</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {/* header */}
                <div className="my-1 h-25 w-150 rounded-2xl border-2">
                    {banner !== null ? (
                        <img src={`http://localhost:8000/storage/${banner?.image_path}`} className="h-full w-full object-scale-down" />
                    ) : (
                        <Link href={route('admin.banners.create')}>
                            <Button className="h-full w-full">Add banner</Button>
                        </Link>
                    )}
                </div>

                <div className="flex">
                    {/* left */}
                    <div className="my-1 h-50 w-50 rounded-2xl border-2">
                        <Link href={route('admin.banners.create')}>
                            <Button className="h-full w-full">Add banner</Button>
                        </Link>
                    </div>

                    {/* center */}
                    <div className="my-1 h-50 w-50"></div>

                    {/* right */}
                    <div className="my-1 h-50 w-50 rounded-2xl border-2">
                        <Link href={route('admin.banners.create')}>
                            <Button className="h-full w-full">Add banner</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
