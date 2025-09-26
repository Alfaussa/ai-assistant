// pages/api/chat.js

import { Configuration, OpenAIApi } from 'openai';
//Configuration — объект с настройками API (например, ключ доступа)
//OpenAIApi — клиент для общения с OpenAI API (отправка запросов)


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,//Создаем конфигурацию с API-ключом.
});

const openai = new OpenAIApi(configuration);//Создаем объект openai, через который можно вызывать функции вроде createChatCompletion()

export default async function handler(req, res) {//API-обработчик! req — данные запроса (method, headers, body и т.д.), res — ответ обратно  https://nextjs.org/docs/pages/building-your-application/routing/api-routes
  if (req.method !== 'POST') {//Проверка что метод запроса — POST
    return res.status(405).end();
  }

  const { messages } = req.body;//Достаём messages из тела запроса.

  try {
    const response = await openai.createChatCompletion({//https://platform.openai.com/docs/guides/gpt/chat-completions-api
      model: 'gpt-4', 
      messages,
    });
//запрос в OpenAI:createChatCompletion() — метод библиотеки openai, который создаёт ответ на чат.
// model — указываем модель (GPT-4 или GPT-3.5).
// messages — передаём туда всю историю чата
// await означает, что мы ждём ответа от сервера OpenAI.


    const reply = response.data.choices[0].message?.content;

    res.status(200).json({ reply });//Отправляем ответ обратно клиенту — в формате JSON
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'OpenAI API Error' });
  }
}
