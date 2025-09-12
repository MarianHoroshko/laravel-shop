import ImageUploader from '@/components/product/ImageUploader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add banner',
        href: '/banners/create',
    },
];

export default function BannersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        href: '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.banners.store'), {
            forceFormData: true,
        });
    };

    const onFileSelect = (files: File[]) => {
        setData('image', files[0]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add banner" />

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
                <form onSubmit={handleSubmit}>
                    <div className="m-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <Label htmlFor="image href">Image href</Label>
                            <Input type="text" placeholder="Image href" value={data.href} onChange={(event) => setData('href', event.target.value)} />
                        </div>
                    </div>

                    <div className="gap-3">
                        <Label htmlFor="product images">Add images</Label>
                        <ImageUploader maxImagesCount={1} onFilesSelect={onFileSelect} />
                    </div>

                    <Button disabled={processing} type="submit" className="float-end">
                        Apply banner
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
