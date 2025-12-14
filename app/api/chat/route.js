import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const isProd = process.env.NODE_ENV === "production";

  console.log("API /chat called");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

  try {
    const body = await req.json();
    const messages = body.messages || [];

    // ================= DEV → OLLAMA =================
    if (!isProd) {
      console.log("Using Ollama (dev)");

      const prompt = messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma3:4b",
          prompt,
          options: {
            num_predict: 200,
          },
        }),
      });

      if (!response.body) {
        console.error("Ollama response body is empty");
        return new Response(
          JSON.stringify({ reply: "" }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let reply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        for (const line of chunk.split("\n")) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) reply += json.response;
          } catch {}
        }
      }

      return new Response(
        JSON.stringify({ reply }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ================= PROD → GROQ =================
    console.log("Using Groq (production)");

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: 0.7,
    });

    console.log(
      "Groq completion:",
      JSON.stringify(completion, null, 2)
    );

    const reply =
      completion &&
      completion.choices &&
      completion.choices[0] &&
      completion.choices[0].message &&
      completion.choices[0].message.content;

    return new Response(
      JSON.stringify({
        reply: reply || "EMPTY_REPLY_FROM_GROQ",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API fatal error:", error);
    return new Response(
      JSON.stringify({ error: "Chat API Error" }),
      { status: 500 }
    );
  }
}
