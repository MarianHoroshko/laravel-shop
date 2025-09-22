import ProductsCarousel from '@/components/client/ProductsCarousel';
import IProduct from '@/types/products/IProduct';
import { Head, Link, usePage } from '@inertiajs/react';

interface HomePageProps {
    banner: {
        href: string;
        image_path: string;
    };
    products: IProduct[];
}

export default function HomePage() {
    const { banner, products } = usePage().props as unknown as HomePageProps;

    return (
        <>
            <Head title="W Gorniatku" />
            <div className="bg-white">
                {/* banner */}
                {banner !== null && (
                    <div className="flex flex-row justify-center">
                        <div className="m-3 h-50 w-200">
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

                <ProductsCarousel products={products} />
            </div>
        </>
    );
}
