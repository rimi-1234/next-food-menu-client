"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1️⃣ Register user in your DB
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, photoURL }),
    });

    if (!res.ok) {
      return alert("Registration failed");
    }

    // 2️⃣ Auto-login the user after successful registration
    const loginRes = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (loginRes?.error) {
      alert("Login failed after registration, please try logging in manually");
    } else {
      router.push("/"); // Redirect to home page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="p-10 bg-white shadow-xl rounded-lg w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Create Account
        </h1>

        <form className="flex flex-col w-full" onSubmit={handleRegister}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-2 bg-gray-100"
            autoComplete="name"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-2 bg-gray-100"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mb-2 bg-gray-100"
            autoComplete="new-password"
          />
          <input
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100"
          />

          <button type="submit" className="btn btn-primary w-full mb-4">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-secondary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
