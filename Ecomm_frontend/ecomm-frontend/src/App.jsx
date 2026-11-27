import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";

const API = "http://localhost:8080";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [category, setCategory] = useState("All");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selected, setSelected] = useState(null);

  const loadProducts = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams({ keyword: search });
      fetch(`${API}/products/search?${params}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to search products");
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          if (search === "") {
            setCategories(["All", ...new Set(data.map((p) => p.productCategory).filter(Boolean))]);
          }
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, refreshKey]);

  const filtered = products.filter(
    (product) => category === "All" || product.productCategory === category
  );

  const openEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete ${product.productName}?`)) return;
    try {
      const res = await fetch(`${API}/products/${product.productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <span
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => setSelected(null)}
        >
          🛍️ Ecomm
        </span>
        <button className="btn" onClick={() => setShowForm(true)}>+ Add Product</button>
      </nav>

      {selected ? (
        <ProductDetail id={selected} onBack={() => setSelected(null)} />
      ) : (
        <main className="container">
          <div className="toolbar">
            <input
              placeholder="Search by name, brand, description, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {error && <div className="error">{error}. Is the backend running?</div>}
          {loading ? (
            <p className="state">Loading products...</p>
          ) : (
            <ProductList
              products={filtered}
              onSelect={setSelected}
              onEdit={openEdit}
              onDelete={deleteProduct}
            />
          )}
        </main>
      )}

      {showForm && (
        <AddProduct
          product={editingProduct}
          onClose={closeForm}
          onSaved={() => { closeForm(); loadProducts(); }}
        />
      )}
    </>
  );
}