"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect logged-in users
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // redirect to home if already logged in
    }
  }, [status, router]);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: res.error,
      });
    } else if (res?.ok) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting to homepage...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/"); // redirect after popup
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: error.message,
    });
  }
};

const handleGoogleLogin = async () => {
  try {
    await signIn("google", { callbackUrl: "/" });
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Redirecting to homepage...",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: error.message,
    });
  }
};


  // Show loading while session status is "loading"
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-2 bg-gray-100"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100"
            required
            autoComplete="current-password"
          />
          <button type="submit" className="btn btn-primary w-full mb-4">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full flex items-center gap-2 border border-base-300 bg-gray-100 hover:bg-gray-200"
        >
          <FcGoogle size={24} /> Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-secondary hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
