import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, Popover, PopoverTrigger, PopoverContent, User } from "@nextui-org/react";
import Logo from "./Logo";
// import {AcmeLogo} from "./AcmeLogo.jsx";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/quizz" variant="flat">
                        Take Quizz
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* text-foreground */}

            <NavbarMenu className="bg-transparent">

                <NavbarMenuItem>
                    <Link
                        className="w-full text-white/70"
                        href="/"
                        size="lg"
                    >
                        Home
                    </Link>
                </NavbarMenuItem>


                <NavbarMenuItem>
                    <Link
                        className="w-full text-white/70"
                        href="/quizz"
                        size="lg"
                    >
                        Quizz
                    </Link>
                </NavbarMenuItem>



            </NavbarMenu>

        </Navbar>
    );
}


export default NavBar;
