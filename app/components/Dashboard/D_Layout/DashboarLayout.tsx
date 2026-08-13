"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";

import {
  LayoutDashboard,
  Sprout,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  FileText,
} from "lucide-react";

const navItems = [
  {
    name: "Overview",
    href: "/Dashboard/Admin",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    name: "Overview",
    href: "/Dashboard/user",
    icon: LayoutDashboard,
    roles: ["user"],
  },
  {
    name: "Add Products",
    href: "/Dashboard/addProducts",
    icon: Sprout,
    roles: ["admin"],
  },
  {
    name: "My Orders",
    href: "/Dashboard/MyOrders",
    icon: ShoppingBag,
    roles: ["admin", "user"],
  },
  {
    name: "Manage All Orders",
    href: "/Dashboard/ManageAllOrders",
    icon: ShoppingBag,
    roles: ["admin"],
  },
  {
    name: "Manage Users",
    href: "/Dashboard/ManageUsers",
    icon: Users,
    roles: ["admin"],
  },
  {
    name: "Add Blogs",
    href: "/Dashboard/addBlogs",
    icon: FileText,
    roles: ["admin"],
  },
  {
    name: "Update Profile",
    href: "/Dashboard/Setting",
    icon: Settings,
    roles: ["admin", "user"],
  },
];

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = user?.role;

  /*
   * ----------------------------------------------------
   * ROLE BASED ACCESS CONTROL
   * ----------------------------------------------------
   */

  useEffect(() => {
    // Session এখনও loading হলে কিছু করবো না
    if (isPending) return;

    // User login করা না থাকলে
    if (!user) {
      router.replace("/login");
      return;
    }

    /*
     * ADMIN ONLY ROUTES
     */
    const adminOnlyRoutes = [
      "/Dashboard/Admin",
      "/Dashboard/addProducts",
      "/Dashboard/ManageAllOrders",
      "/Dashboard/ManageUsers",
      "/Dashboard/addBlogs",
    ];

    const isAdminRoute = adminOnlyRoutes.some(
      (route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    /*
     * USER DASHBOARD
     */
    const isUserDashboard =
      pathname === "/Dashboard/user" ||
      pathname.startsWith("/Dashboard/user/");

    /*
     * USER যদি admin route access করতে চায়
     */
    if (isAdminRoute && role !== "admin") {
      router.replace("/Dashboard/user");
      return;
    }

    /*
     * ADMIN যদি user dashboard access করতে চায়
     */
    if (isUserDashboard && role !== "user") {
      router.replace("/Dashboard/Admin");
      return;
    }
  }, [user, role, pathname, isPending, router]);

  /*
   * ----------------------------------------------------
   * FILTER SIDEBAR ITEMS BASED ON ROLE
   * ----------------------------------------------------
   */

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(role || "")
  );

  /*
   * ----------------------------------------------------
   * LOGOUT
   * ----------------------------------------------------
   */

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        toast.error(
          result.error.message || "Logout failed"
        );
        return;
      }

      toast.success("Logged out successfully");

      router.replace("/login");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoggingOut(false);
    }
  };

  /*
   * ----------------------------------------------------
   * LOADING STATE
   * ----------------------------------------------------
   */

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F3]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#5a8139] border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------
   * NOT LOGGED IN
   * ----------------------------------------------------
   */

  if (!user) {
    return null;
  }

  /*
   * ----------------------------------------------------
   * PREVENT UNAUTHORIZED PAGE FROM FLASHING
   * ----------------------------------------------------
   */

  const adminOnlyRoutes = [
    "/Dashboard/Admin",
    "/Dashboard/addProducts",
    "/Dashboard/ManageAllOrders",
    "/Dashboard/ManageUsers",
    "/Dashboard/addBlogs",
  ];

  const isAdminRoute = adminOnlyRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  const isUserDashboard =
    pathname === "/Dashboard/user" ||
    pathname.startsWith("/Dashboard/user/");

  if (isAdminRoute && role !== "admin") {
    return null;
  }

  if (isUserDashboard && role !== "user") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F3]">

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-70
          bg-[#1d2b1e]
          text-white
          transform
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* ---------------- BRAND ---------------- */}

          <div className="flex items-center justify-between px-6 h-26 border-b border-white/10">

            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/logo.png"
                alt="Green Nest Logo"
                width={36}
                height={36}
                className="rounded"
              />

              <span className="font-semibold text-lg tracking-wide">
                Green Nest
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          {/* ---------------- NAVIGATION ---------------- */}

          <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">

            {filteredNavItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`
                    group relative
                    flex items-center gap-3
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-[#2e4e2a] text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-1
                        rounded-r
                        bg-[#5a8139]
                      "
                    />
                  )}

                  <Icon size={18} />

                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* ---------------- USER CARD ---------------- */}

          <div className="p-4 border-t border-white/10">

            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5">

              <Image
                src={
                  user?.image ||
                  "/images/logo.png"
                }
                alt={user?.name || "User"}
                width={36}
                height={36}
                className="
                  w-9 h-9
                  rounded-full
                  object-cover
                  border
                  border-[#5a8139]
                "
              />

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium truncate">
                  {user?.name || "Guest"}
                </p>

                <p className="text-xs text-white/50 truncate">
                  {user?.email || ""}
                </p>

                <p className="text-[11px] text-[#7fa65b] capitalize">
                  {role}
                </p>

              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Logout"
                className="
                  text-white/60
                  hover:text-red-400
                  transition-colors
                  disabled:opacity-50
                "
              >
                <LogOut size={17} />
              </button>

            </div>
          </div>
        </div>
      </aside>

      {/* ==================================================
          MAIN COLUMN
      ================================================== */}

      <div className="lg:pl-64 flex flex-col min-h-screen">

        {/* ==================================================
            TOPBAR
        ================================================== */}

        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">

          <div className="flex items-center justify-between h-16 px-4 sm:px-6 gap-4">

            {/* ---------------- LEFT ---------------- */}

            <div className="flex items-center gap-3 flex-1">

              {/* Mobile menu button */}

              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#192C27]"
              >
                <Menu size={24} />
              </button>

              {/* Search */}

              <div
                className="
                  hidden sm:flex
                  items-center gap-2
                  w-full max-w-sm
                  bg-[#F5F7F3]
                  rounded-lg
                  px-3 py-2
                "
              >
                <Search
                  size={17}
                  className="text-gray-400 shrink-0"
                />

                <input
                  type="text"
                  placeholder="Search orders, products, customers..."
                  className="
                    bg-transparent
                    outline-none
                    text-sm
                    w-full
                    text-[#192C27]
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            {/* ---------------- RIGHT ---------------- */}

            <div className="flex items-center gap-4">

              {/* Notification */}

              <button
                className="
                  relative
                  text-gray-500
                  hover:text-[#2e4e2a]
                  transition-colors
                "
              >
                <Bell size={20} />

                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    h-2
                    w-2
                    rounded-full
                    bg-[#5a8139]
                  "
                />
              </button>

              {/* Profile */}

              <div className="relative">

                <button
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="flex items-center gap-2"
                >
                  <Image
                    src={
                      user?.image ||
                      "/images/logo.png"
                    }
                    alt={user?.name || "User"}
                    width={34}
                    height={34}
                    className="
                      w-8 h-8
                      rounded-full
                      object-cover
                      border
                      border-gray-200
                    "
                  />

                  <ChevronDown
                    size={16}
                    className={`
                      hidden sm:block
                      text-gray-400
                      transition-transform
                      ${
                        profileOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {/* Profile Dropdown */}

                {profileOpen && (
                  <>
                    {/* Outside click */}

                    <div
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="fixed inset-0 z-10"
                    />

                    <div
                      className="
                        absolute
                        right-0
                        mt-3
                        w-48
                        bg-white
                        rounded-lg
                        shadow-lg
                        border
                        border-gray-100
                        py-2
                        z-20
                      "
                    >

                      <p
                        className="
                          px-4 py-2
                          text-sm
                          font-medium
                          text-[#192C27]
                          truncate
                          border-b
                          border-gray-100
                        "
                      >
                        {user?.name || "Guest"}
                      </p>

                      <p
                        className="
                          px-4
                          py-1
                          text-xs
                          text-gray-400
                          truncate
                        "
                      >
                        {user?.email || ""}
                      </p>

                      <p
                        className="
                          px-4 py-1
                          text-xs
                          text-[#5a8139]
                          capitalize
                        "
                      >
                        Role: {role}
                      </p>

                      <Link
                        href="/Dashboard/Setting"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="
                          block
                          px-4 py-2
                          text-sm
                          text-[#192C27]
                          hover:bg-[#F5F7F3]
                        "
                      >
                        Update Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="
                          w-full
                          text-left
                          px-4 py-2
                          text-sm
                          text-red-500
                          hover:bg-red-50
                          disabled:opacity-50
                        "
                      >
                        {loggingOut
                          ? "Logging out..."
                          : "Logout"}
                      </button>

                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="flex-1 md:ml-10">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;