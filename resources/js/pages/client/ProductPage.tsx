import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import IProduct from '@/types/products/IProduct';
import IProductCategoryType from '@/types/products/IProductCategoryType';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingBasket, Star } from 'lucide-react';

interface ProductPageProps {
    productCategoryTypes: IProductCategoryType[];
    product: IProduct;
}

export default function ProductPage() {
    const { product } = usePage().props as undefined as ProductPageProps;

    console.log(product);

    return (
        <>
            <Head title={product.name} />
            <div>
                <div className="px-25 py-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    {/* TODO: menu link */}
                                    <Link href="/components">{product.category.name}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{product.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex">
                        {/* image carousel */}
                        <div className="w-[50%] p-3">
                            <img
                                src={`http://localhost:8000/storage/${product.images[0].image_path}`}
                                alt={product.name}
                                className="h-150 w-full object-scale-down"
                            />
                        </div>

                        <div className="w-[50%] p-3">
                            <h2 className="text-4xl font-semibold">{product.name}</h2>

                            <div className="flex">
                                <p className="p-1">4,8</p>

                                <div className="flex p-1">
                                    <Star className="fill-secondary text-secondary" />
                                    <Star className="fill-secondary text-secondary" />
                                    <Star className="fill-secondary text-secondary" />
                                    <Star className="text-secondary" />
                                    <Star className="text-secondary" />
                                </div>

                                <p className="p-1">(22)</p>
                            </div>

                            <div className="py-3">
                                <h2 className="text-5xl font-semibold">{product.price} zł</h2>
                            </div>

                            <div>
                                <p>
                                    Category: <span className="font-semibold">{product.category.name}</span>
                                </p>

                                <p className="py-3">{product.description}</p>
                            </div>

                            <Button className="my-3 h-10 w-full">
                                <ShoppingBasket /> Add to card
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
