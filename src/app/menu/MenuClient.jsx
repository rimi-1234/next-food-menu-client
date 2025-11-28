"use client";
export const dynamic = "force-dynamic"; 
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Make sure to get category safely
  const categoryQuery = searchParams?.get("category") || "All";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://nextjs-project-foodmenu-server.vercel.app/products"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Generate categories dynamically after products are loaded
  const categories = ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))];

  // ✅ Filter products based on search & category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryQuery === "All" || p.category === categoryQuery;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    router.push(`/menu?category=${encodeURIComponent(newCategory)}`);
  };

  if (loading) return <p className="text-center mt-6">Loading products...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-food-pattern">
      <h1 className="text-4xl font-bold mb-2 text-center text-[var(--color-primary)]">Our Menu</h1>
      <p className="text-[var(--color-neutral)] text-center mb-6">
        Browse our delicious food items
      </p>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full max-w-md bg-[var(--color-base-100)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] hover:bg-[var(--color-base-200)] transition"
        />
        <select
          value={categoryQuery}
          onChange={handleCategoryChange}
          className="appearance-none w-full max-w-xs border rounded-lg p-2 bg-[var(--color-base-100)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] hover:bg-[var(--color-base-200)] transition cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-[var(--radius-box)] shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col p-4 focus-within:ring-2 focus-within:ring-[var(--color-accent)] outline-none"
              tabIndex={0}
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title}
                className="h-48 w-full object-cover rounded-md mb-4 border border-[var(--color-base-300)]"
              />

              <h2 className="font-bold text-lg mb-1 text-[var(--color-primary-content)]">{product.title}</h2>

              <p className="text-[var(--color-neutral)] text-sm mb-1 line-clamp-2">
                {product.shortDescription || "No short description."}
              </p>

              <p className="text-[var(--color-neutral)] text-xs mb-2 line-clamp-3">
                {product.fullDescription || "No full description."}
              </p>

              <div className="text-[var(--color-neutral)] text-xs mb-2 flex flex-wrap gap-2">
                <span>Category: <span className="text-[var(--color-secondary)]">{product.category || "Uncategorized"}</span></span>
                <span>Date: {product.date || "N/A"}</span>
                <span>Qty: {product.quantity || "N/A"}</span>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <span className="font-bold text-[var(--color-accent)]">{product.price}</span>
                <Link
                  href={`/menu/${product._id}`}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-neutral)] mt-6">No products found.</p>
      )}
    </div>
  );
}