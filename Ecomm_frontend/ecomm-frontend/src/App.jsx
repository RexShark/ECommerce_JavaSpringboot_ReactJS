import { useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";

const API = "http://localhost:8080";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selected, setSelected] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    fetch(`${API}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => { setProducts(data); setError(""); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.productCategory).filter(Boolean))],
    [products]
  );

  const filtered = products.filter((p) => {
    const text = `${p.productName} ${p.productBrand}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (category === "All" || p.productCategory === category)
    );
  });

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
              placeholder="Search by name or brand..."
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