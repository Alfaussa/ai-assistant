"use client"
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply = data.reply;

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>

      <div style={{ minHeight: 200, marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}
          >
            <p>
              <strong>{msg.role === 'user' ? 'Вы' : 'AI'}:</strong> {msg.content}
            </p>
          </div>
        ))}
        {loading && <p><em>Печатает...</em></p>}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8 }}
          placeholder="Введите сообщение..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Отправить
        </button>
      </div>
    </div>
  );
}
