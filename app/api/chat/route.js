export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  return new Response(
    JSON.stringify({ reply: "HELLO FROM PRODUCTION API" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
