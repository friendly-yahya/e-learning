"use client"

import Link from "next/link"
import * as React from "react"

import { 
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
 } from "@/components/ui/navigation-menu";

 export function HeaderNavigationMenu() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="#">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="#">Analytics</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-1 w-[180px]">
                            <ListItem href="#" title="1 bac PC"></ListItem>
                            <ListItem href="#" title="2 bac PC"></ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
 }
function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    {children && (
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    )}
                </Link>
            </NavigationMenuLink>
        </li>
    )
}