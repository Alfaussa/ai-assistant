"use client";

import { useEffect, useState } from "react";

export default function EbayBoilerCards({ power }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!power) return;

    setLoading(true);

    // Запрос к твоему backend API
    fetch(`/api/ebay/search?q=boiler ${power} kW`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("eBay API error:", err);
        setLoading(false);
      });
  }, [power]);

  if (!power) return null;

  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ marginBottom: 10 }}>🔥 Boilers for {power} kW</h3>

      {loading && <p>Loading from eBay...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "14px"
      }}>
        {items.map(item => (
          <div
            key={item.itemId}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              gap: 12
            }}
          >
            <img
              src={item.image || "/placeholder.png"}
              alt={item.title}
              style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 6 }}
            />

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 6px", fontSize: "14px" }}>{item.title}</h4>

              <p style={{ margin: 0, fontWeight: "bold" }}>
                {item.price} {item.currency}
              </p>

              {item.condition && (
                <p style={{ margin: "6px 0 0", fontSize: 12 }}>
                  Condition: {item.condition}
                </p>
              )}

              <a
                href={item.itemWebUrl}
                target="_blank"
                style={{ color: "#0070f3", fontSize: 13 }}
              >
                View on eBay →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading && items.length === 0 && (
        <p>No suitable items found.</p>
      )}
    </div>
  );
}
