import fetch from "node-fetch";

export async function POST(req) {
  const { title, description, price, quantity } = await req.json();

  const EBAY_TOKEN = process.env.EBAY_TOKEN; // OAuth token eBay

  try {
    const response = await fetch("https://api.ebay.com/sell/inventory/v1/inventory_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${EBAY_TOKEN}`,
      },
      body: JSON.stringify({
        sku: "boiler_" + Date.now(),
        product: {
          title,
          description,
          brand: "Custom Boiler",
          mpn: "N/A",
          imageUrls: [],
        },
        availability: {
          shipToLocationAvailability: {
            quantity: quantity || 1
          }
        },
        condition: "NEW",
        price: {
          value: price,
          currency: "USD"
        }
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
