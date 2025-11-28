"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoading = status === "loading";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg px-4 lg:px-8 h-20">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          🍕 FoodMenus
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`px-3 py-1 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "bg-accent text-white font-semibold shadow-md scale-105"
                    : "text-white hover:bg-base-200 hover:text-white hover:scale-105"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Session / User Buttons */}
      <div className="navbar-end hidden lg:flex items-center gap-2">
        {isLoading ? (
          <div className="animate-pulse flex gap-2">
            <div className="w-20 h-8 bg-gray-400 rounded-full"></div>
            <div className="w-20 h-8 bg-gray-400 rounded-full"></div>
          </div>
        ) : session ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-secondary rounded-full px-4 flex items-center gap-2 text-white shadow-md hover:scale-105 transition-transform"
            >
              {session.user?.name || "Profile"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-base-100 text-base-content rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <li className="px-4 py-2 text-gray-700 font-medium cursor-default">
                  {session.user?.email}
                </li>
                <li>
                  <Link
                    href="/menu/add"
                    className="block px-4 py-2 hover:bg-[var(--color-base-200)] transition-colors"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-products"
                    className="block px-4 py-2 hover:bg-[var(--color-base-200)] transition-colors"
                  >
                    Manage Products
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--color-base-200)] transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-secondary px-6 rounded-full">
              Login
            </Link>
            <Link href="/register" className="btn btn-secondary px-6 rounded-full">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden navbar-end relative">
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label htmlFor="menu-toggle" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        <div className="absolute top-20 left-0 w-full bg-primary text-primary-content p-4 flex flex-col gap-2 shadow-lg rounded-b-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive(link.path)
                  ? "bg-accent text-white font-semibold shadow-md scale-105"
                  : "text-white hover:bg-base-200 hover:text-white hover:scale-105"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href="/menu/add"
                className="block px-3 py-2 rounded-lg hover:bg-[var(--color-base-200)] transition-colors"
              >
                Add Product
              </Link>
              <Link
                href="/manage-products"
                className="block px-3 py-2 rounded-lg hover:bg-[var(--color-base-200)] transition-colors"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--color-base-200)] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary w-full mt-2">
                Login
              </Link>
              <Link href="/register" className="btn btn-secondary w-full mt-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
