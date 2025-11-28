"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // wait for session
    if (!session) {
      router.push("/login"); // redirect if not logged in
    } else {
      setLoading(false);
    }
  }, [session, status]);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    image: "",
    category: "",
    date: "",
    quantity: "",
  });

  const userEmail = session?.user?.email; // get email from session
  const adminToken = "admin123";


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const productData = { ...formData, email: userEmail }
    try {
      const res = await fetch("https://nextjs-project-foodmenu-server.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
          "x-admin-token": adminToken// Must match server middleware
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      Swal.fire({
        title: "Success!",
        text: "Product added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/menu"); // redirect after OK click
      });

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    }
  };
  if (status === "loading") return <p className="text-center mt-6">Loading products...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          className="border w-full p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <textarea
          name="fullDescription"
          placeholder="Full Description"
          className="border w-full p-3 rounded"
          rows="4"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g. $5)"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="border w-full p-3 rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}