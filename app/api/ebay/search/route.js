export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) {
    return Response.json({ error: "Missing q parameter" }, { status: 400 });
  }

  // Гарантированный правильный абсолютный URL
  const tokenUrl = `${url.origin}/api/ebay/token`;

  const tokenResp = await fetch(tokenUrl);
  if (!tokenResp.ok) {
    const err = await tokenResp.text();
    return Response.json(
      { error: "Failed to fetch token", detail: err },
      { status: 500 }
    );
  }

  const { access_token } = await tokenResp.json();

  if (!access_token) {
    return Response.json({ error: "No access token returned" }, { status: 500 });
  }

  const searchUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
    q
  )}&limit=3`;

  const resp = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    return Response.json(
      { error: "eBay search failed", detail: text },
      { status: resp.status }
    );
  }

  const data = await resp.json();

  const items = (data.itemSummaries || []).map((it) => ({
    itemId: it.itemId,
    title: it.title,
    price: it.price?.value,
    currency: it.price?.currency,
    image:
      it.thumbnailImages?.[0]?.imageUrl || it.image?.imageUrl || null,
    itemWebUrl: it.itemWebUrl,
    condition: it.condition,
    seller: it.seller?.username || null,
  }));

  return Response.json({ items });
}
