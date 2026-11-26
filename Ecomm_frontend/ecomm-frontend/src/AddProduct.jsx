import { useState } from "react";

const API = "http://localhost:8080";
const PRODUCT_CATEGORIES = [
  "Mobiles",
  "Laptops",
  "Headphones",
  "Tablets",
  "Speakers",
  "Watches",
];

function Field({ label, name, full, value, onChange, ...rest }) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      {label}
      <input name={name} value={value} onChange={onChange} {...rest} />
    </label>
  );
}

export default function AddProduct({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product ? {
    ...product,
    productReleaseDate: product.productReleaseDate
      ? String(product.productReleaseDate).slice(0, 10)
      : "",
  } : {
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
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const editing = Boolean(product);
      const productFields = { ...form };
      delete productFields.productId;
      const res = await fetch(
        editing ? `${API}/products/${product.productId}` : `${API}/products`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productFields,
            ...(editing ? { productId: product.productId } : {}),
            productPrice: Number(form.productPrice),
            productStock: Number(form.productStock),
          }),
        }
      );
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || `Request failed (${res.status})`);
      }
      onSaved();
    } catch (error) {
      const action = product ? "update" : "add";
      alert(`Failed to ${action} product: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{product ? "Update Product" : "Add Product"}</h2>
        <div className="form-grid">
          {product && (
            <Field label="ID" name="productId" value={product.productId} readOnly />
          )}
          <Field label="Name" name="productName" value={form.productName} onChange={handleChange} required />
          <Field label="Description" name="productDesc" value={form.productDesc} onChange={handleChange} full />
          <Field label="Price (₹)" name="productPrice" value={form.productPrice} onChange={handleChange} type="number" step="0.01" required />
          <Field label="Stock" name="productStock" value={form.productStock} onChange={handleChange} type="number" required />
          <Field label="Brand" name="productBrand" value={form.productBrand} onChange={handleChange} />
          <label className="field">
            Category
            <select
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {form.productCategory &&
                !PRODUCT_CATEGORIES.includes(form.productCategory) && (
                  <option value={form.productCategory}>{form.productCategory}</option>
                )}
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <Field label="Release date" name="productReleaseDate" value={form.productReleaseDate} onChange={handleChange} type="date" full />
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
            {saving ? "Saving..." : product ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}