"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About / Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4">Foodie's Delight</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Delivering delicious meals to your doorstep. Fresh, fast, and flavorful.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-red-600 transition">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-red-600 transition">Menu</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-600 transition">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-600 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-red-600 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

      {/* Copyright */}
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Foodie's Delight. All rights reserved.
      </p>
    </footer>
  );
}
