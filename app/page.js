


import Chat from '../components/Chat.jsx';
import { Calculator, MessageCircle, Flame, BarChart3, Info, Heater, ShoppingBag  } from "lucide-react";
import EbayBoilerCards from "../components/EbayBoilerCards.jsx";
import ClientContainer from '../components/ClientContainer.jsx';

export const metadata = {
  title: 'Smart boiler selector',
  description: 'Smart Boiler Selector is a web application that helps users calculate optimal boiler power and receive AI-powered heating recommendations based on home parameters.',
}
export default function Home({ history, setHistory, power}) {


  return (

    <div style={{
      maxWidth: "1000px", margin: "0 auto", padding: "20px",
      backgroundColor: '#D9D7DD'


    }}>

      <header style={{
        position: "fixed", top: 0, left: 0, width: "100%",
        display:"flex",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        flexWrap: "wrap",
        zIndex: 1000,
      }}>
        <div style={{
          display: 'flex'

        }}>
          <Heater size={36} style={{ paddingTop: '4px', marginRight: '5px', minWidth: "36px", minHeight: "36px", marginRight: "8px", }} />
          <h1 style={{ marginBottom: '10px' }}>Smart Boiler Selector</h1></div>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '18px', display: "flex", flexWrap: "wrap", justifyContent: "center", marginRight: "30px" }}>
          <a href="#chat" >
            <MessageCircle size={20} /> Chat
          </a>
          <a href="#calc" >
            <Flame size={20} /> Calculator
          </a>
          <a href="#chart" >
            <BarChart3 size={20} /> Graph
          </a>
           <a href="#cards" >
            <ShoppingBag size={20} /> Offers
          </a>
          <a href="#about" >
            <Info size={20} /> About
          </a>
        </nav>
      </header>

      <main>

        <section id="chat">
          <h2><MessageCircle size={20} /> Chat</h2>
          <Chat />
        </section>
        <section id="calc" >
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calculator />Boiler power calculator</h2>


        <ClientContainer/>

       
           
        </section>
<section>
      <EbayBoilerCards power={power}/>
</section>
        <section id="about">
          <h2><Info size={20} /> About</h2>
          <p>Smart Boiler Selector is a modern web application designed to simplify boiler power selection for residential heating systems. The app allows users to calculate required boiler capacity based on house parameters and interact with an AI assistant for personalized heating advice, recommendations, and explanations. It combines calculation logic with an intuitive interface to support informed decision-making.<br/>
            Fugiat exercitation amet ullamco anim magna velit ut veniam consequat consequat commodo reprehenderit ut. Tempor culpa occaecat aliquip sunt do duis deserunt ut consectetur in ad amet elit quis. Nostrud cupidatat aliqua quis elit magna officia dolore magna ea. Dolor ut elit dolor voluptate aliqua veniam exercitation velit elit dolore.
          </p>
        </section>
      </main>

      <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p>© 2025 AI for construction | Contacts: info@example.com</p>
      </footer>
    </div>

  )
}