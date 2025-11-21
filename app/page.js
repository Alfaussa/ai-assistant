 
import BoilerCalculator from '../components/BoilerCalculator';
import Chat from '../components/Chat';
import { MessageCircle, Flame, BarChart3, Info, Heater } from "lucide-react";

 

export const metadata = {
  title: 'My page title',
  description: 'My page description',
}
export default function Home({history, setHistory}) {

  
  
  
  
  
  return (

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px",
        backgroundColor: '#D9D7DD' 

    
      }}>
      {/*header*/}
      <header style={{position: "fixed", top: 0, left: 0,width: "100%",
    background: "rgba(255, 255, 255, 0.9)", // немного прозрачности
    backdropFilter: "blur(8px)", // мягкий эффект стекла
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      flexWrap: "wrap", 
    zIndex: 1000, // чтобы всегда был поверх
  }}>
        <div style={{display:'flex'
          
        }}>
        <Heater size={36} style={{paddingTop:'4px', marginRight:'5px',  minWidth: "36px",minHeight: "36px", marginRight: "8px",}} /> 
        <h1 style={{marginBottom:'10px'}}>Smart Boiler Selector</h1></div>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '18px', display: "flex",flexWrap: "wrap", justifyContent: "center",marginRight: "30px"}}>
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
        <section id="chat" style={{ marginBottom: "40px"}}>
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
          <p>This project helps calculate heating and ask your questions.</p>
        </section>
      </main>

  <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p>© 2025 AI for construction | Contacts: info@example.com</p>
      </footer>
      </div>
    
  )
}