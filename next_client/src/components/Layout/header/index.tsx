'use client';
import { IconCart, IconLogo, IconUser } from "@/assets/icons";
import {useState} from "react";
import Link from "next/link";
import SearchBox from "./search-box";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";
import "./styles/header.css";

const transformLeft = {
    transform: "translateX(-4rem)",
}

export function Header() {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    return (
        <header className="sticky-top z-30 bg-primary" style={{ minHeight: "80px" }}>
            <div className="d-flex w-100 justify-content-center align-items-center py-2" style={{ height: "100%", minHeight: "80px" }}>
                <Link href={"/"} className="me-4">
                    <IconLogo className="small" />
                </Link>
               <SearchBox onSearch={query => console.log(query)} />
                <nav className="d-flex align-items-center ms-auto">
                    <Link href="/product" className="btn btn-link text-white me-3">
                        Product
                    </Link>
                    <Link href="/wishlist" className="btn btn-link text-white me-3">
                        Wishlist
                    </Link>
                    <Link href="/cart" className="btn btn-link text-white me-3 position-relative d-flex align-items-center">
                        <IconCart className="small me-1" />
                        Cart
                        {/* Example cart badge */}
                        <span className="badge bg-warning position-absolute top-0 start-100 translate-middle">2</span>
                    </Link>
                    <Dropdown isOpen={isProfileDropdownOpen} setIsOpen={setIsProfileDropdownOpen}>
                        <DropdownTrigger className="btn btn-link text-white dropdown-toggle">
                                <span className="me-2">User</span>
                                <IconUser className="small text-white" />
                        </DropdownTrigger>
                        <DropdownContent align="start" style={transformLeft}>
                            <ul className="dropdown-menu-list">
                                <li>
                                    <Link className="dropdown-item" href="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/register">Register</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/settings">Setting</Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/logout">Logout</Link>
                                </li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </nav>
            </div>
        </header>
    );
}