import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const isProd = process.env.NODE_ENV === "production";

  try {
    const { messages } = await req.json();

    // ================= DEV → OLLAMA =================
    if (!isProd) {
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
        return new Response(
          JSON.stringify({ error: "No response from Ollama" }),
          { status: 500 }
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
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Chat API Error" }),
      { status: 500 }
    );
  }
}
