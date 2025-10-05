"use client"

import { useState } from "react";

export default function BoilerCalculator(){

const [area, setArea] = useState('');
const [power, setPower] = useState(null);



const calculatePower = () => {
    if(!area || isNaN(area)){
        setPower("Enter correct number")
        return;
    }

    const result = Math.ceil(area * 0.1)
    setPower(result)
}
return(

   <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>🔧 Калькулятор мощности котла</h3>
      <label>
        Площадь дома (м²):
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        />
      </label>
      <button onClick={calculatePower} style={{ padding: "8px 12px" }}>
        Рассчитать
      </button>
      {power && (
        <p style={{ marginTop: 15 }}>
          ✅ Рекомендуемая мощность котла: <strong>{power} кВт</strong>
        </p>
      )}
    </div>
  );



}