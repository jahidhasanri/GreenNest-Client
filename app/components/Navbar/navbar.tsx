"use client";

import Image from "next/image";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PRODUCTS", path: "/products" },
    { name: "ABOUT US", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="bg-[#1d2b1e] text-white">
      <div className="container mx-auto px-2 py-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
         <Link href={'/'}>
          <Image
            src="/images/logo.png"
            alt="Green Nest Logo"
            width={100}
            height={50}
            priority
          />
         </Link>

          {/* Desktop Menu (lg only) */}
          <ul className="hidden lg:flex gap-10 font-normal text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`pb-1 transition-all duration-300
                      ${
                        isActive
                          ? "border-b-2 border-[#5a8139]"
                          : "border-b-2 border-transparent hover:border-[#5a8139]"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Cart + Login (md and up) */}
          <Link href={'/login'} className="hidden md:flex items-center gap-6">
            <TiShoppingCart
              size={26}
              className="cursor-pointer hover:text-[#5a8139]"
            />
            <button className="bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded">
              Login
            </button>
          </Link>

          {/* Hamburger (md & sm only) */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile + Tablet Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="flex flex-col gap-4 font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block pb-1
                        ${
                          isActive
                            ? "border-b-2 border-green-400"
                            : "border-b-2 border-transparent hover:border-green-400"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
