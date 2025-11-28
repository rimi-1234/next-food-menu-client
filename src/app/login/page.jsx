"use client";

import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Redirect logged-in users
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status, router]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 chars, include upper & lower case",
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email) ? "Invalid email" : "",
      password: !validatePassword(formData.password)
        ? "Password must be at least 6 chars, include upper & lower case"
        : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        Swal.fire({ icon: "error", title: "Login Failed", text: res.error });
      } else if (res?.ok) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to homepage...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => router.push("/"));

        setFormData({ email: "", password: "" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Something went wrong", text: err.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", { redirect: false });
      if (res?.error) {
        Swal.fire({ icon: "error", title: "Google Login Failed", text: res.error });
      } else if (res?.ok) {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: "Redirecting to homepage...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => router.push("/"));
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: error.message });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-lg w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        <form className="flex flex-col w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className={`input input-bordered w-full bg-gray-100 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={`input input-bordered w-full bg-gray-100 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full flex items-center gap-2 border border-base-300 bg-gray-100 hover:bg-gray-200 mt-4"
        >
          <FcGoogle size={24} /> Login with Google
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-secondary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
