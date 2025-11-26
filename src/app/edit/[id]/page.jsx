"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMenuProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    price: "",
    image: "",
    date: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        setProduct({
          title: data.title ?? "",
          shortDescription: data.shortDescription ?? "",
          fullDescription: data.fullDescription ?? "",
          category: data.category ?? "",
          price: data.price ?? "",
          image: data.image ?? "",
          date: data.date ?? "",
          quantity: data.quantity ?? "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert("Product updated successfully!");
        router.push("/manage-products");
      } else {
        alert("Failed to update, please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const defaultImage = "/placeholder.png";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>

      <form className="bg-[var(--color-base-100)] p-6 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="font-bold block">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="input input-bordered w-full bg-[var(--color-base-100)]"
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="font-bold block">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            placeholder="Enter short description"
            className="input input-bordered w-full bg-[var(--color-base-100)]"
          />
        </div>

        {/* Full Description */}
        <div className="mb-4">
          <label className="font-bold block">Full Description</label>
          <textarea
            name="fullDescription"
            value={product.fullDescription}
            onChange={handleChange}
            placeholder="Enter full description"
            className="textarea textarea-bordered w-full bg-[var(--color-base-100)]"
            rows="3"
          />
        </div>

        {/* Price, Category, Date, Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="font-bold block">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="input input-bordered w-full bg-[var(--color-base-100)]"
            />
          </div>
          <div>
            <label className="font-bold block">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="input input-bordered w-full bg-[var(--color-base-100)]"
            />
          </div>
          <div>
            <label className="font-bold block">Date</label>
            <input
              type="date"
              name="date"
              value={product.date}
              onChange={handleChange}
              className="input input-bordered w-full bg-[var(--color-base-100)]"
            />
          </div>
          <div>
            <label className="font-bold block">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="input input-bordered w-full bg-[var(--color-base-100)]"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="mt-4">
          <label className="font-bold block">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full bg-[var(--color-base-100)]"
          />
        </div>

        {/* Image Preview */}
        <img
          src={product.image || defaultImage}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg mt-3 border"
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-secondary mt-6 w-full rounded-full text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}
