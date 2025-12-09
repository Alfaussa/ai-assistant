let cached = { token: null, expiresAt: 0 };

export async function GET() {
  const now = Date.now();
  if (cached.token && cached.expiresAt - 5000 > now) {
    return new Response(JSON.stringify({ access_token: cached.token, fromCache: true }), { status: 200 });
  }

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(JSON.stringify({ error: "Missing eBay credentials" }), { status: 500 });
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
   
    const resp = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basic}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope"
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: "Token request failed", detail: text }), { status: resp.status });
    }

    const data = await resp.json();
    cached.token = data.access_token;
    cached.expiresAt = Date.now() + data.expires_in * 1000;

    return new Response(JSON.stringify({
      access_token: data.access_token,
      expires_in: data.expires_in
    }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
