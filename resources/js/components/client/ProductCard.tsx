import IProduct from '@/types/products/IProduct';
import { Link } from '@inertiajs/react';
import { ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

interface CardProps {
    product: IProduct;
}

export default function ProductCard({ product }: CardProps) {
    return (
        <Card className="h-125 w-75">
            <CardContent className="flex aspect-square h-full w-full flex-col">
                <Link href={`/products/${product.id}`}>
                    <img
                        className="h-50 w-full object-cover"
                        src={`http://localhost:8000/storage/${product.images[0].image_path}`}
                        alt={product.name}
                    />

                    <div>
                        <h5 className="p-1 text-xl font-bold capitalize">{product.name}</h5>

                        <div className="px-1 py-5">
                            <p>
                                Type: <span className="font-semibold">Coffee beans</span>
                            </p>

                            <p>
                                Composition: <span className="font-semibold">80% arabica</span>
                            </p>
                        </div>
                    </div>
                </Link>
            </CardContent>

            <CardFooter>
                <Button className="w-full">
                    <ShoppingBasket />
                    {product.price} zł
                </Button>
            </CardFooter>
        </Card>
    );
}
