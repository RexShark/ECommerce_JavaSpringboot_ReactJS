import { useState } from "react";

const API = "http://localhost:8080";

export default function AddProduct({ nextId, onClose, onAdded }) {
  const [form, setForm] = useState({
    productId: nextId,
    productName: "",
    productDesc: "",
    productPrice: "",
    productBrand: "",
    productCategory: "",
    productReleaseDate: "",
    productAvailability: true,
    productStock: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productId: Number(form.productId),
          productPrice: Number(form.productPrice),
          productStock: Number(form.productStock),
        }),
      });
      if (!res.ok) throw new Error();
      onAdded();
    } catch {
      alert("Failed to add product. Check the ID is unique and the backend is running.");
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, name, full, ...rest }) => (
    <label className={`field ${full ? "full" : ""}`}>
      {label}
      <input name={name} value={form[name]} onChange={handleChange} {...rest} />
    </label>
  );

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div className="form-grid">
          <Field label="ID" name="productId" type="number" required />
          <Field label="Name" name="productName" required />
          <Field label="Description" name="productDesc" full />
          <Field label="Price (₹)" name="productPrice" type="number" step="0.01" required />
          <Field label="Stock" name="productStock" type="number" required />
          <Field label="Brand" name="productBrand" />
          <Field label="Category" name="productCategory" />
          <Field label="Release date" name="productReleaseDate" type="date" full />
          <label className="field check full">
            <input
              type="checkbox"
              name="productAvailability"
              checked={form.productAvailability}
              onChange={handleChange}
            />
            Available for sale
          </label>
        </div>
        <div className="actions">
          <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}