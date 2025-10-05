 
import BoilerCalculator from '../components/BoilerCalculator';
import Chat from '../components/Chat';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { MessageCircle, Flame, BarChart3, Info } from "lucide-react";


export const metadata = {
  title: 'My page title',
  description: 'My page description',
}
export default function Home() {
 const data = [
    { area: 50, power: 5 },
    { area: 100, power: 10 },
    { area: 150, power: 15 },
    { area: 200, power: 20 },
    { area: 250, power: 25 },
  ];
  
  
  
  
  
  
  return (

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/*header*/}
      <header>
        <h1>🏗️ Smart Boiler Selector</h1>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '18px' }}>
      <a href="#chat" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <MessageCircle size={20} /> Chat
      </a>
      <a href="#calc" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Flame size={20} /> Calculator
      </a>
      <a href="#chart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <BarChart3 size={20} /> Graph
      </a>
      <a href="#about" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Info size={20} /> About
      </a>
    </nav>
      </header>

      <main>
        <section id="chat" style={{ marginBottom: "40px" }}>
          <h2><MessageCircle size={20} /> Chat</h2>
         <Chat/>
        </section>

        <section id="calc">
          <h2><Flame size={20} />Boiler Sizing Calculator</h2>
          <BoilerCalculator/>
        </section>

        <section id="about">
          <h2><Info size={20} /> About</h2>
          <p>Этот проект помогает рассчитать отопление и задать вопросы AI.</p>
        </section>
      </main>

      <footer>
        <p>© 2025 Строй-AI</p>
      </footer>
      </div>
    
  )
}