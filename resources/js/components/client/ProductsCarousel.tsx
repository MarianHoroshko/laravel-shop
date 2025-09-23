import IProduct from '@/types/products/IProduct';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import ProductCard from './ProductCard';

interface CarouselProps {
    products: IProduct[];
}

export default function ProductsCarousel({ products }: CarouselProps) {
    return (
        <>
            {products !== null && products.length > 0 && (
                <div className="px-16 py-8">
                    <h2 className="p-8 text-5xl text-primary">Top sales</h2>

                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="max-w-8xl w-full"
                    >
                        <CarouselContent>
                            {products.map((product, index) => (
                                <CarouselItem key={index} className="md:basis-1 lg:basis-1/4">
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
        </>
    );
}
