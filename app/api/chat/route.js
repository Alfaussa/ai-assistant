export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const userPrompt = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt: userPrompt,
      }),
    });

    if (!response.body) {
      return new Response(
        JSON.stringify({ error: "Empty response from Ollama" }),
        { status: 500 }
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullReply = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      for (const line of chunk.split("\n")) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.response) {
            fullReply += data.response;
          }
        } catch {}
      }
    }

    return new Response(
      JSON.stringify({ reply: fullReply }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Ollama error:", error);
    return new Response(
      JSON.stringify({ error: "Ollama API Error" }),
      { status: 500 }
    );
  }
}
