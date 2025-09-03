import { Command, CommandInput } from '@/components/ui/command';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link, usePage } from '@inertiajs/react';
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
        <div>
            <div>
                <div className="flex items-center justify-between border-b-1 border-input">
                    {/* logo */}
                    <div>
                        <Link href="/" className="m-1">
                            <img src="/logo.png" className="w-30" />
                        </Link>
                    </div>

                    {/* search */}
                    <div className="m-1">
                        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                            <CommandInput placeholder="Type a command or search..." />
                            {/* <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <CommandItem>
                                        <Calendar />
                                        <span>Calendar</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Smile />
                                        <span>Search Emoji</span>
                                    </CommandItem>
                                    <CommandItem disabled>
                                        <Calculator />
                                        <span>Calculator</span>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>
                                        <User />
                                        <span>Profile</span>
                                        <CommandShortcut>⌘P</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <CreditCard />
                                        <span>Billing</span>
                                        <CommandShortcut>⌘B</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <Settings />
                                        <span>Settings</span>
                                        <CommandShortcut>⌘S</CommandShortcut>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList> */}
                        </Command>
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
                                    <NavigationMenuItem key={productCategory.id}>
                                        <NavigationMenuTrigger>{productCategory.name}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[250px] gap-2 md:w-[350px] md:grid-cols-2 lg:w-[450px]">
                                                {productCategory.categories.length > 0 &&
                                                    productCategory.categories.map((category) => (
                                                        <li>
                                                            <NavigationMenuLink asChild key={category.id}>
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
            <div>test</div>
        </div>
    );
}
