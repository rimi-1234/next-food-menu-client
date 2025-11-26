"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const defaultImage = "/placeholder.png";

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Large Banner Image */}
      <div className="w-full h-72 sm:h-96 mb-6 overflow-hidden rounded-lg shadow-lg">
        <img
          src={product.image || defaultImage}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* Full Description */}
      <p className="text-gray-700 mb-4">
        {product.fullDescription || product.description || "No description available."}
      </p>

      {/* Meta Info */}
      <div className="text-gray-600 mb-6 flex flex-wrap gap-4">
        <span className="font-semibold">Price: <span className="text-green-600">{product.price}</span></span>
        <span className="font-semibold">Date: {product.date || "N/A"}</span>
        <span className="font-semibold">Quantity: {product.quantity || "N/A"}</span>
        <span className="font-semibold">Category: {product.category || "Uncategorized"}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Back
      </button>
    </div>
  );
}
