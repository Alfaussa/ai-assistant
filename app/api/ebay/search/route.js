// app/api/ebay/search/route.js
import fetch from "node-fetch";

export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");
  if (!q) return new Response(JSON.stringify({ error: "Missing q parameter" }), { status: 400 });

  // Получаем token из нашего роутa
  const baseUrl = process.env.BASE_URL || ""; // установить BASE_URL в .env для локального dev, e.g. http://localhost:3000
  const tokenResp = await fetch(`${baseUrl}/api/ebay/token`);
  if (!tokenResp.ok) {
    const errText = await tokenResp.text();
    return new Response(JSON.stringify({ error: "Failed to fetch token", detail: errText }), { status: 500 });
  }
  const tokenData = await tokenResp.json();
  const accessToken = tokenData.access_token;
  if (!accessToken) return new Response(JSON.stringify({ error: "No access token" }), { status: 500 });

  // Формируем запрос к Browse API — лимит 3
  const searchUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&limit=3`;

  try {
    const resp = await fetch(searchUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
      }
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: "eBay search failed", detail: text }), { status: resp.status });
    }

    const data = await resp.json();
    // Вернём itemSummaries (или []), но уберём лишнее
    const items = (data.itemSummaries || []).map(it => ({
      itemId: it.itemId,
      title: it.title,
      price: it.price?.value,
      currency: it.price?.currency,
      image: it.thumbnailImages?.[0]?.imageUrl || it.image?.imageUrl || null,
      itemWebUrl: it.itemWebUrl,
      condition: it.condition,
      seller: it.seller?.username || null
    }));

    return new Response(JSON.stringify({ items }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
