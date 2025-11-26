// src/components/ClientProvider.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
