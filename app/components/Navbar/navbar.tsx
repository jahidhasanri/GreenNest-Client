"use client";

import Image from "next/image";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log(user)

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PRODUCTS", path: "/products" },
    { name: "ABOUT US", path: "/aboutUs" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
    { name: "Dashboard", path: "/Dashboard/Admin" },
  ];

 const handleLogout = async () => {
  setLoggingOut(true);

  try {
    const result = await authClient.signOut();

    if (result?.error) {
      toast.error(result.error.message || "Logout failed");
      return;
    }

    toast.success("Logout successful!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } catch {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoggingOut(false);
  }
};

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

          {/* Cart + Login/Logout (md and up) */}
          {!isPending && user ? (
            <div className="hidden md:flex items-center gap-6">
              <Link href={'/profile'} className="shrink-0">
                <Image
                  src={user?.image || "/images/logo.png"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#5a8139]"
                />
              </Link>
              <Link href={'/cart'}>
                <TiShoppingCart
                  size={26}
                  className="cursor-pointer hover:text-[#5a8139]"
                />
              </Link>


              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link href={'/login'} className="hidden md:flex items-center gap-6">
              <TiShoppingCart
                size={26}
                className="cursor-pointer hover:text-[#5a8139]"
              />
              <button className="bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded">
                Login
              </button>
            </Link>
          )}

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

              {/* User avatar in mobile menu */}
              {!isPending && user && (
                <li>
                  <Link
                    href={'/profile'}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={user?.image || "/images/logo.png"}
                      alt={user?.name || "User"}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#5a8139]"
                    />
                    <span>{user?.name}</span>
                  </Link>
                </li>
              )}

              {/* Login/Logout in mobile menu */}
              <li>
                {!isPending && user ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    disabled={loggingOut}
                    className="bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                ) : (
                  <Link
                    href={'/login'}
                    onClick={() => setMenuOpen(false)}
                    className="inline-block bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;