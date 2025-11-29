"use client"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import {ChartColumn, Trash } from "lucide-react";


export default function BoilerChart({history, setHistory}){

  if (!history || history.length === 0) {
    return <p style={{ margin: 50, display: "flex", alignItems: "center", gap: "8px"  }}><ChartColumn/> No data to display</p>;
  }
//  const data = [
//     { area: 50, power: 5 },
//     { area: 100, power: 10 },
//     { area: 150, power: 15 },
//     { area: 200, power: 20 },
//     { area: 250, power: 25 },
//   ];

const clearHistory = () => setHistory([]);
       console.log(history)

    return(
<div>
  
        <div style={{ marginTop:40 }}>
          <h3><ChartColumn /> Calculation history</h3>
<div style={{width: "90%", margin: 30, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
 
          <button
          
        onClick={clearHistory}
        style={{
          display:"flex",
          marginBottom: 30,
          background: "rgb(208, 70, 70)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          gap: "8px", 
          alignItems: "center"
         
        }}
      >
        <Trash />Clear history
      </button>
          <table border="1" cellPadding="10" style={{ marginBottom: 40, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Area (m²)</th>
                <th>Climate</th>
                <th>Insulation</th>
                <th>Ceiling</th>
                <th>Power (kW)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr key={i}>
                  <td>{item.area}</td>
                  <td>{item.climate}</td>
                  <td>{item.insulation}</td>
                  <td>{item.ceiling}</td>
                  <td>{item.power}</td>
                </tr>
              ))}
            </tbody>
          </table>
     
           <BarChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="power" fill="#6d81aeff" />
      </BarChart>
        </div>
      

      </div></div> 
      )
}