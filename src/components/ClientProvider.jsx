// src/components/ClientProvider.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer></Footer>
    </SessionProvider>
  );
}
