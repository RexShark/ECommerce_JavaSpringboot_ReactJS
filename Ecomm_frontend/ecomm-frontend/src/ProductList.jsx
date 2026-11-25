const icons = {
  mobiles: "📱", laptops: "💻", headphones: "🎧",
  tablets: "📲", speakers: "🔊", watches: "⌚",
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});

export default function ProductList({ products }) {
  if (products.length === 0) return <p className="empty">No products found.</p>;

  return (
    <div className="grid">
      {products.map((p) => {
        const inStock = p.productAvailability && p.productStock > 0;
        return (
          <div className="card" key={p.productId}>
            <div className="card-img">
              {icons[p.productCategory?.toLowerCase()] || "📦"}
            </div>
            <div className="card-body">
              <div className="card-top">
                <span className="brand">{p.productBrand}</span>
                <span className="badge cat">{p.productCategory}</span>
              </div>
              <h3>{p.productName}</h3>
              <p className="desc">{p.productDesc}</p>
              <div className="card-bottom">
                <span className="price">{money.format(p.productPrice)}</span>
                <span className={`badge ${inStock ? "in" : "out"}`}>
                  {inStock ? `${p.productStock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}