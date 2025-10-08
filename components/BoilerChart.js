"use client"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

export default function BoilerChart({history, setHistory}){

  if (!history || history.length === 0) {
    return <p style={{ marginTop: 20 }}>📊 Нет данных для отображения</p>;
  }
//  const data = [
//     { area: 50, power: 5 },
//     { area: 100, power: 10 },
//     { area: 150, power: 15 },
//     { area: 200, power: 20 },
//     { area: 250, power: 25 },
//   ];

const clearHistory = () => setHistory([]);


    return(
<div>
  
        <div style={{ marginTop: 30 }}>
          <h3>📊 Calculation history</h3>

          <button
        onClick={clearHistory}
        style={{
          marginBottom: 10,
          background: "#ef4444",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        ❌ Clear history
      </button>

           <BarChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="power" fill="#2563eb" />
      </BarChart>
        </div>
      

      </div>
      )
}