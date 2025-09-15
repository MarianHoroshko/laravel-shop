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
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, Trash } from 'lucide-react';

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

    const { processing, delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('admin.banners.destroy', banner));
    };

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
                <div className="relative my-1 h-25 w-150 rounded-2xl border-2">
                    {banner !== null ? (
                        <>
                            <Link href={route('admin.banners.edit', banner)}>
                                <img src={`http://localhost:8000/storage/${banner?.image_path}`} className="h-full w-full object-scale-down" />
                            </Link>

                            <AlertDialog>
                                <AlertDialogTrigger className={cn(buttonVariants({ variant: 'destructive' }), 'absolute', 'top-0', 'right-0')}>
                                    <Trash />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete banner and remove data from the server.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction disabled={processing} onClick={handleDelete}>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
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
