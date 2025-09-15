import { Head, Link, usePage } from '@inertiajs/react';

interface HomePageProps {
    banner: {
        href: string;
        image_path: string;
    };
}

export default function HomePage() {
    const { banner } = usePage().props as unknown as HomePageProps;

    return (
        <>
            <Head title="W Gorniatku" />
            <div className="bg-white">
                {/* banner */}
                {banner !== null && (
                    <div className="flex flex-row justify-center">
                        <div className="h-50 w-200">
                            <Link href={banner.href}>
                                <img
                                    src={`http://localhost:8000/storage/${banner?.image_path}`}
                                    alt="banner"
                                    className="h-full w-full object-scale-down"
                                />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
