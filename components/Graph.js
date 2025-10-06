"use client"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

export default function Graph(){
 const data = [
    { area: 50, power: 5 },
    { area: 100, power: 10 },
    { area: 150, power: 15 },
    { area: 200, power: 20 },
    { area: 250, power: 25 },
  ];
  

    return(
<div>
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="area" label={{ value: "Area (m²)", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "Power (kW)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="power" stroke="#8884d8" />
        </LineChart>

      </div>
      )
}