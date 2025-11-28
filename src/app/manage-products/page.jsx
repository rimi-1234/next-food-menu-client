"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function ManageProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // wait for session
    if (!session) {
      router.push("/login"); // redirect if not logged in
    } else {
      setLoading(false);
    }
  }, [session, status]);
  const userEmail = session?.user?.email;
  console.log(userEmail);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://nextjs-project-foodmenu-server.vercel.app/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    // 1️⃣ Ask for confirmation using SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://nextjs-project-foodmenu-server.vercel.app/products/${id}`, {
          method: "DELETE",
          headers: {
            "x-admin-token": "admin123",
          },
        });

        if (!res.ok) throw new Error("Delete failed");

        // Update state
        setProducts(products.filter((p) => p._id !== id));

        // Success popup
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The product has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || "Failed to delete product",
        });
      }
    }
  };

  if (loading) return <p className="text-center mt-6">Loading products...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-[var(--color-base-200)]">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Short Desc</th>
              <th>Full Desc</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="hover:bg-[var(--color-base-100)] transition-colors">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.title || "Product Image"}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.shortDescription || "-"}</td>
                  <td>{product.fullDescription || "-"}</td>
                  <td>{product.category || "Uncategorized"}</td>
                  <td className="font-bold text-green-600">{product.price}</td>
                  <td>{product.date || "-"}</td>
                  <td>{product.quantity || "-"}</td>
                  <td className="flex gap-2">
                    <Link href={`/edit/${product._id}`} className="btn btn-sm btn-primary">
                      View
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-error">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center text-gray-500 py-4">
                  No products available.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-[var(--color-base-100)] rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title || "Product Image"}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h2 className="font-bold text-lg mb-1">{product.title}</h2>
              <p className="text-[var(--color-neutral)] mb-1">Short: {product.shortDescription || "-"}</p>
              <p className="text-[var(--color-neutral)] mb-1">Full: {product.fullDescription || "-"}</p>
              <p className="text-[var(--color-neutral)] mb-1">Category: {product.category || "Uncategorized"}</p>
              <p className="font-bold text-green-600 mb-1">{product.price}</p>
              <p className="text-[var(--color-neutral)] mb-1">Date: {product.date || "-"}</p>
              <p className="text-[var(--color-neutral)] mb-2">Quantity: {product.quantity || "-"}</p>
              <div className="flex gap-2 mt-auto">
                <Link href={`/edit/${product._id}`} className="btn btn-sm btn-primary flex-1">
                  View
                </Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-error flex-1">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}

      </div>
    </div>
  );
}
