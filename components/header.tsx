
import { HeaderNavigationMenu } from "@/components/header_nav_menu";
import { SearchIcon, BellDot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ModeToggle } from "@/components/ui/toggle";
export default function () {
    return(
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center justify-between content-between strech gap-6" >
            <h1 className="text-4xl font-semibold" >Echo</h1>
            <HeaderNavigationMenu/>
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
              <ModeToggle/>
            </div>
          </div>
        </div>
    )
}

