"use client";

import { useEffect, useState } from "react";
import { Check, MoveRight } from "lucide-react";

export default function EbayBoilerCards({ power }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!power) return;

    setLoading(true);


    fetch(`/api/ebay/search?q=boiler ${power} kW`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("eBay API error:", err);
        setLoading(false);
      });
  }, [power]);

  if (!power) return null;

  return (
    <div style={{ marginTop: 50 }}>
      <h3
        style={{
          margin: "10px 0 30px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Check /> Boilers for {power} kW
      </h3>

      {loading && <p>Loading from eBay...</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {items.map((item) => (
          <div
            key={item.itemId}
            style={{
              width: "30%",
              minWidth: 250,
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              background: "#fff",
              boxSizing: "border-box",
            }}
          >
            <img
              src={item.image || "/placeholder.png"}
              alt={item.title}
              style={{
                width: "50%",
                height: 200,
                objectFit: "cover",
                borderRadius: 6,
                float: "left",
                marginRight: 12,
                marginBottom: 6,
              }}
            />

            <div style={{ overflow: "hidden" }}>
              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: "12px",
                  textAlign: "justify",
                }}
              >
                {item.title}
              </h4>

              <p style={{ margin: "0 0 4px", fontWeight: "bold" }}>
                {item.price} {item.currency}
              </p>

              {item.condition && (
                <p style={{ margin: "0 0 4px", fontSize: 12 }}>
                  Condition: {item.condition}
                </p>
              )}

              <a
                href={item.itemWebUrl}
                target="_blank"
                style={{ color: "#16191c", fontSize: 13 }}
              >
                View on eBay <MoveRight />
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading && items.length === 0 && <p>No suitable items found.</p>}
    </div>
  );
}
