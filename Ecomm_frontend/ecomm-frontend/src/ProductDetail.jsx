import { useEffect, useState } from "react";

const API = "http://localhost:8080";

const icons = {
  mobiles: "📱", laptops: "💻", headphones: "🎧",
  tablets: "📲", speakers: "🔊", watches: "⌚",
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});

export default function ProductDetail({ id, onBack }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <main className="container">
      <button className="btn secondary" onClick={onBack}>← Back</button>

      {error && <div className="error" style={{ marginTop: 16 }}>{error}</div>}
      {!product && !error && <p className="state">Loading...</p>}

      {product && (
        <div className="detail">
          <div className="detail-img">
            {icons[product.productCategory?.toLowerCase()] || "📦"}
          </div>
          <div className="detail-info">
            <span className="brand">{product.productBrand}</span>
            <h1>{product.productName}</h1>
            <span className="badge cat">{product.productCategory}</span>
            <p className="detail-price">{money.format(product.productPrice)}</p>
            <p className="detail-desc">{product.productDesc}</p>
            <span className={`badge ${product.productAvailability && product.productStock > 0 ? "in" : "out"}`}>
              {product.productAvailability && product.productStock > 0
                ? `${product.productStock} in stock`
                : "Out of stock"}
            </span>
            <p className="brand">Released: {String(product.productReleaseDate).slice(0, 10)}</p>
          </div>
        </div>
      )}
    </main>
  );
}