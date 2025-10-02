// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
``

export default async function handler(req, res) {//API-обработчик! req — данные запроса (method, headers, body и т.д.), res — ответ обратно  https://nextjs.org/docs/pages/building-your-application/routing/api-routes
  if (req.method !== 'POST') {//Проверка что метод запроса — POST
   return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;//Достаём messages из тела запроса.
  const userPrompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");
  //Ollama (и большинство локальных LLM) не понимают формат messages как OpenAI.
// Им нужен один текстовый prompt, в который мы вручную кладём историю диалога.
// Таким образом, эта строка превращает массив сообщений в цельный текст для модели.
  try {
  const response = await fetch("http://localhost:11434/api/generate",{
     method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt: userPrompt,
}),
});
//запрос в OpenAI:createChatCompletion() — метод библиотеки openai, который создаёт ответ на чат.
// model — указываем модель (GPT-4 или GPT-3.5).
// messages — передаём туда всю историю чата
// await означает, что мы ждём ответа от сервера OpenAI.


//     const reply = response.data.choices[0].message?.content;

//     res.status(200).json({ reply });//Отправляем ответ обратно клиенту — в формате JSON
//   } catch (error) {
//     console.error('OpenAI error:', error);
//     res.status(500).json({ error: 'OpenAI API Error' });
//   }
// }
  // Ollama возвращает поток (stream) JSON-строк (JSONL)
    let fullReply = "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

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
        } catch (err) {
          console.error("Ошибка парсинга JSON:", err);
        }
      }
    }

    res.status(200).json({ reply: fullReply });
  } catch (error) {
    console.error("Ollama error:", error);
    res.status(500).json({ error: "Ollama API Error" });
  }
}