import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  console.log("CHAT API CALLED");

  try {
    const { messages } = await req.json();

    console.log("MESSAGES:", messages);
    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
    });

    console.log("GROQ RESPONSE:", completion);

    return new Response(
      JSON.stringify({
        reply: completion.choices?.[0]?.message?.content || "NO_REPLY",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GROQ ERROR:", err);
    return new Response(
      JSON.stringify({ error: "GROQ_FAILED" }),
      { status: 500 }
    );
  }
}
