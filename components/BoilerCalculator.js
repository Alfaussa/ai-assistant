"use client"

import { useState } from "react";
import BoilerChart from "./BoilerChart";
import { Calculator, SunSnow, BrickWallFire, Ruler, Printer, SquareCheckBig} from "lucide-react";

export default function BoilerCalculator(){

const [area, setArea] = useState('');
const [climate, setClimate] = useState("1.0");
const [insulation, setInsulation] = useState("1.0");
const [ceiling, setCeiling] = useState("standard");
const [power, setPower] = useState(null);
const [history, setHistory] = useState([]);

const calculatePower = () => {
    if(!area || isNaN(area)){
        setPower("Enter correct number")
        return;
    }

    let base= area * 0.1;
    let result = base * parseFloat(climate) * parseFloat(insulation);
    
    if (ceiling === 'high'){
        result *= 1.2;
    }
    const finalResult = result.toFixed(1)
    setPower(finalResult);

    setHistory([...history,
        {
        area:area,
        climate: climate,
        insulation: insulation,
        ceiling: ceiling,
        power: Number(finalResult),
        name: 'calc no:' + (history.length + 1),
        }
     
    ])

      
  };
      const printReport = () => {
    window.print();
}
return(

   <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>  <Calculator /> Калькулятор мощности котла</h3>
      <label>
        Площадь дома (м²):
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        />
      </label>
        <div style={{ marginBottom: 10 }}>
        <label><SunSnow /> Climate: </label>
        <select value={climate} onChange={(e) => setClimate(e.target.value)}>
          <option value="0.9">Warm</option>
          <option value="1.0">Moderate</option>
          <option value="1.2">Cold</option>
        </select>
      </div>
       <div style={{ marginBottom: 10 }}>
        <label><BrickWallFire />Insulation: </label>
        <select
          value={insulation}
          onChange={(e) => setInsulation(e.target.value)}
        >
          <option value="0.8">Excellent</option>
          <option value="1.0">Average</option>
          <option value="1.2">Poor</option>
        </select>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label><Ruler /> Ceiling height: </label>
        <select
          value={ceiling}
          onChange={(e) => setCeiling(e.target.value)}
        >
          <option value="standard">Standard (≤ 3 m)</option>
          <option value="high">High (&gt; 3 m)</option>
        </select>
      </div>
      <button onClick={calculatePower} style={{ padding: "8px 12px" }}>
        Рассчитать
      </button>
      {power && (
        <p style={{ marginTop: 15 }}>
          <SquareCheckBig /> Recommended boiler power: <strong>{power} кВт</strong>
        </p>
      )}
       <BoilerChart history={history} setHistory={setHistory}/>

        <button onClick={printReport} style={{ background: "#10b981" }}>
        <Printer /> Print report
      </button>
    </div>

  

  );



}