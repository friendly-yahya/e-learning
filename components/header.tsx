import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SearchIcon, BellDot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
export default function () {
    return(
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
    )
}