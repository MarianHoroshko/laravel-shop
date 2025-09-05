import { generateKey } from '@/lib/utils';
import { IProductCategories } from '@/types/client/IProductCategories';
import { Link } from '@inertiajs/react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../ui/navigation-menu';

interface NavMenuProps {
    productCategories: IProductCategories[];
}

export default function NavMenu({ productCategories }: NavMenuProps) {
    const navMenuListItems = productCategories.map((productCategory) => {
        const categories =
            productCategory.categories.length > 0 &&
            productCategory.categories.map((category) => (
                <li key={generateKey(`category_name_${category.name}`)}>
                    <NavigationMenuLink asChild>
                        <Link href="#">{category.name}</Link>
                    </NavigationMenuLink>
                </li>
            ));

        return (
            <NavigationMenuItem key={generateKey(`category_type_${productCategory.name}`)}>
                <NavigationMenuTrigger>{productCategory.name}</NavigationMenuTrigger>

                <NavigationMenuContent>
                    <ul className="grid w-[250px] gap-2 md:w-[350px] md:grid-cols-2 lg:w-[450px]">{categories}</ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    });

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>{navMenuListItems}</NavigationMenuList>
        </NavigationMenu>
    );
}
