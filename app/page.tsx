import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { BellDot } from "lucide-react";
import { Sparkles, Zap, Timer, Flame, Check, LibraryBig } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 container bg-zinc-300 dark:bg-black sm:items-start">
       
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center justify-between content-between strech gap-6" >
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
          <div className="flex flex-row items-center gap-6">
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
        <div className="h-full w-full grid grid-rows-3">
          <div className="row-span-2 flex h-full w-full gap-6 ">
            <div className=" py-8 flex flex-col flex-[2] px-10 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 border-1">
              <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                Last Course Watched
              </h2>
              <div className="mt-4 mb-4 relative w-full aspect-video overflow-hidden rounded-3xl bg-zinc-900">
              </div>
              <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">
                Motion & Forces 
              </h3>
              <Field>
                <FieldDescription>
                  Video 2 of 8 • Understanding Acceleration
                </FieldDescription>
                <Progress value={25}/>
                <FieldDescription>
                  25% complete
                </FieldDescription>
                <Button className="w-full">Continue Learning</Button>

              </Field>
            </div>
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-2 flex-col justify-between items-start py-8 px-10 row-span-2 border-zinc-200 rounded-3xl bg-zinc-100 border-1">
                <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                  Next Topic Preview
                </h2>
                <div className="px-4">
                  <div className="flex-row gap-2 flex items-center">
                    <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black ">
                      Energy & Work
                    </h3>
                    <Zap className="fill-black stroke-black"/>
                  </div>
                  <FieldDescription>
                    “Discover how energy powers everything!”
                  </FieldDescription>
                </div>
                <Button className="w-full">Explore Topic</Button>
              </div>
              <div className="flex flex-col flex-1 border-zinc-200 rounded-3xl bg-zinc-100 border-1 justify-between items-start py-8 px-10">
                <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">Your Learning Time</h2>
                <div className="flex-row items-center gap-2 flex ">
                    <Timer className="stroke-black size-10"/>
                    <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                      2.5 Hours
                    </h1>
                    
                </div>
              </div>
              <div className="flex flex-3 flex-col border-zinc-200 rounded-3xl bg-zinc-100 border-1 justify-between items-start py-8 px-10">
                <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">Your Streak</h2>
                <div>
                  <div className="flex-row items-center gap-2 flex ">
                    <Flame className="fill-black stroke-black size-10"/>
                    <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                      33 Days
                    </h1>
                  </div>
                  <p className="my-4 mx-2">
                    Every day, Every hour counts. Come back soon!
                  </p>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">M</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">T</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">W</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">T</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-zinc-800 rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">F</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-zinc-700 rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">S</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-zinc-600 rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">S</h3>
                      <div className="flex justify-center items-center w-8 h-8  bg-zinc-500 rounded-full">
                        <Check className="stroke-zinc-100 size-4"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1">
            <div className="flex flex-row gap-4 items-center ">

            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
             Browse Topics 
            </h1>
            <LibraryBig className="stroke-violet-400 size-8 "/>
          </div>
          <div className="flex flex-col py-8 px-10 min-w-[350px] max-h-[400px] border-zinc-200 rounded-3xl bg-zinc-100 border-1">
            <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                Next Topic Preview
            </h2>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
