import CommandSearch from '@/components/client/CommandSearch';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';

interface HomePageProps {
    productCategories: {
        categories: {
            id: number;
            name: string;
        }[];
        id: number;
        name: string;
    }[];
}

export default function HomePage() {
    const { productCategories } = usePage().props as unknown as HomePageProps;

    return (
        <>
            <Head title="Home" />
            <div>
                {/* Header */}
                <div className="relative">
                    <div className="flex items-center justify-between border-b-1 border-input">
                        {/* logo */}
                        <div>
                            <Link href="/" className="m-1">
                                <img src="/logo.png" className="h-30 w-45" />
                            </Link>
                        </div>

                        {/* search */}
                        <div className="m-1">
                            <CommandSearch />
                        </div>

                        {/* card and user buttons */}
                        <div className="m-1 flex justify-between">
                            <div className="flex cursor-pointer flex-col items-center p-3 hover:underline">
                                <ShoppingCart className="h-8 w-8" />
                                <h5>Shopping card</h5>
                            </div>

                            <div className="flex cursor-pointer flex-col items-center p-3 hover:underline">
                                <User className="h-8 w-8" />
                                <h5>Log in</h5>
                            </div>
                        </div>
                    </div>
                    {/* nav with dropdowns */}
                    <div className="flex justify-center">
                        <NavigationMenu viewport={false}>
                            <NavigationMenuList>
                                {productCategories.length > 0 &&
                                    productCategories.map((productCategory) => (
                                        <NavigationMenuItem key={productCategory.name}>
                                            <NavigationMenuTrigger>{productCategory.name}</NavigationMenuTrigger>

                                            <NavigationMenuContent>
                                                <ul className="grid w-[250px] gap-2 md:w-[350px] md:grid-cols-2 lg:w-[450px]">
                                                    {productCategory.categories.length > 0 &&
                                                        productCategory.categories.map((category) => (
                                                            <li>
                                                                <NavigationMenuLink asChild key={category.name}>
                                                                    <Link href="#">{category.name}</Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Footer */}
                <div>test</div>
            </div>
        </>
    );
}
