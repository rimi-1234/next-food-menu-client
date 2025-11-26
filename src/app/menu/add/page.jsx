"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
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

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "admin123", // Must match server middleware
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      router.push("/menu"); // redirect to item list
    } catch (error) {
      alert(error.message);
    }
  };

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
