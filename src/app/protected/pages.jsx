"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // prevent flicker
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Protected Page</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
