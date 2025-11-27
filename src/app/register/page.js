"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Inline validation
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: value ? "" : "Name is required" }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) ? "" : "Invalid email address" }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) ? "" : "Password must be at least 6 chars, include upper & lower case" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    const newErrors = {
      name: !formData.name ? "Name is required" : "",
      email: !validateEmail(formData.email) ? "Invalid email" : "",
      password: !validatePassword(formData.password)
        ? "Password must be at least 6 chars, include upper & lower case"
        : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      // Register user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Registration failed");

      // Auto-login
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Registered Successfully!",
        text: "Redirecting to homepage...",
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear form
      setFormData({ name: "", email: "", password: "", photoURL: "" });

      // Redirect after 2s
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Registration Failed", text: err.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-lg w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-100 ${errors.name ? "border-red-500" : "border-gray-300"}`}
              autoComplete="name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-100 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              autoComplete="email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-100 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              autoComplete="current-password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <input
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-secondary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
