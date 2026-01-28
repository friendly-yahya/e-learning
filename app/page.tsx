import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { BellDot } from "lucide-react";
import { Sparkles } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 px-16 bg-white dark:bg-black sm:items-start">
       
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center justify-between content-between strech gap-8" >
            <h1 className="text-4xl font-semibold" >Echo</h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                   <Button variant="ghost" className="rounded-full">Home</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" className="rounded-full">Analytics</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="rounded-full">Browse
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex flex-row items-center gap-8">
            <InputGroup className="rounded-full">
              <InputGroupInput placeholder="Search..."/>
              <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
            <div className="flex flex-row gap-2">
              <Avatar size="lg">
                <AvatarImage className="grayscale" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex justify-center items-center w-10 h-10  bg-zinc-100 rounded-full">
                <BellDot/>
              </div>
              
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left w-full">
          <div className="flex flex-row gap-4 items-center ">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
             Hey Amin!
            </h1>
            <Sparkles className="fill-violet-400 stroke-violet-400"/>
          </div>
          <p className="max-w-xl text-xls leading-8 text-zinc-600 dark:text-zinc-400">
              Ready to continue your physics journey? Let's pick up where you left off.
          </p>
        </div>
        <div className="h-full w-full grid-rows-3">
          <div className="row-span-2 h-full w-full grid grid-cols-3">
            <div className="flex col-span-2">

            </div>
            <div className="grid grid-rows-6 col-span-1">
              <div className="flex row-span-2">

              </div>
              <div className="flex row-span-1">

              </div>
              <div className="flex row-span-3">

              </div>
            </div>
          </div>
          <div className="row-span-1"></div>
        </div>
      </main>
    </div>
  );
}
