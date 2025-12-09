let cached = { token: null, expiresAt: 0 };

export async function GET() {
  const now = Date.now();

  // If token exists and is valid → return cached version
  if (cached.token && cached.expiresAt - 5000 > now) {
    return Response.json({
      access_token: cached.token,
      fromCache: true,
    });
  }

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json(
      { error: "Missing EBAY_CLIENT_ID or EBAY_CLIENT_SECRET" },
      { status: 500 }
    );
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const resp = await fetch(
      "https://api.ebay.com/identity/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${basic}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "https://api.ebay.com/oauth/api_scope",
        }),
      }
    );

    if (!resp.ok) {
      const error = await resp.text();
      return Response.json(
        { error: "eBay token request failed", detail: error },
        { status: resp.status }
      );
    }

    const data = await resp.json();

    cached.token = data.access_token;
    cached.expiresAt = Date.now() + data.expires_in * 1000;

    return Response.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      fromCache: false,
    });
  } catch (err) {
    return Response.json(
      { error: "Request error", detail: err.message },
      { status: 500 }
    );
  }
}
