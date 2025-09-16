import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import IProduct from '@/types/products/IProduct';
import { Head, Link, usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';

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

                <div className="p-16">
                    <h2 className="p-1 text-5xl text-primary">Top sales</h2>

                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="max-w-8xl w-full"
                    >
                        <CarouselContent>
                            {products.map((product, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                                    <div className="p-1">
                                        <Link href={`/product/${product.id}`}>
                                            <Card>
                                                <CardContent className="flex aspect-square flex-col p-6">
                                                    <img src={`http://localhost:8000/storage/${product.images[0].image_path}`} alt={product.name} />

                                                    <div className="m-1 flex justify-between">
                                                        <div className="m-1">
                                                            <h3 className="text-xl font-semibold">{product.price} zł</h3>
                                                            <h5 className="text-md font-semibold">{product.name}</h5>
                                                        </div>

                                                        <div className="m-1 flex">
                                                            <Star color="yellow" fill="yellow" />

                                                            <h3 className="text-xl font-semibold">5.0</h3>
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="flex">
                                                    <Button className="justify-end">Add to card</Button>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </>
    );
}
