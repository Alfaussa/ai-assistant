'use client'
import React, { useState } from "react";

export default function Chat1() {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([])
const [typing, setTyping] = useState(false)

    const sendMessage = async() => {
        if(!input.trim()) return;

        const newMessages = [...messages, {role: 'user', content: input}]
        setMessages(newMessages);
        setInput('');
        setTyping(true);
   
try{
    const res = await fetch('/api/chat',{
        method:'POST',
        headers: {
      "Content-Type": "application/json",},
        body: JSON.stringify({messages: newMessages}),}
     )
    const data = await res.json();
    const reply = data.reply;
    setMessages([...newMessages,{role:'assistant', content: reply}]);
    } catch (err){
        console.error("Ошибка",err);
    }finally{
        setTyping(false)
    }
};

return<>

<input value={input} 
type="text"
onChange={e=>setInput(e.target.value )}
   onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
placeholder="write here..."></input>
 <button onClick={sendMessage} ></button>
<div>{typing && <p>Typing...</p>}</div>


</>

}


