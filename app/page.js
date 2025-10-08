 
import BoilerCalculator from '../components/BoilerCalculator';
import Chat from '../components/Chat';
import { MessageCircle, Flame, BarChart3, Info } from "lucide-react";
import BoilerChart from '../components/BoilerChart';


export const metadata = {
  title: 'My page title',
  description: 'My page description',
}
export default function Home({history, setHistory}) {

  
  
  
  
  
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
        <section id="calc" style={{ marginBottom: "40px" }}>
          <h2><Flame size={20} />Boiler Sizing Calculator</h2>
          <BoilerCalculator/>
        </section>
        {/* <section id="chart">
        <h2>  <BarChart3 size={20} /> Graph: Power vs. Area</h2>
        <BoilerChart
        data={history}
        setHistory={setHistory}
        />
      </section> */}
        <section id="about">
          <h2><Info size={20} /> About</h2>
          <p>Этот проект помогает рассчитать отопление и задать вопросы AI.</p>
        </section>
      </main>

  <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p>© 2025 AI для строительства | Контакты: info@example.com</p>
      </footer>
      </div>
    
  )
}