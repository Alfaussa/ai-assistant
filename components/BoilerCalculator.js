"use client"

import { useState } from "react";
import BoilerChart from "./BoilerChart";
import {  SunSnow, BrickWallFire, Ruler, Printer, SquareCheckBig, Rotate3d} from "lucide-react";
import HeatLoss3D from "./HeatLoss3D";
import EbayBoilerCards from "./EbayBoilerCards";

export default function BoilerCalculator(){

const [area, setArea] = useState('');
const [doors, setDoors] = useState('');
const [windows,setWindows] = useState('');
const [climate, setClimate] = useState("1.0");
const [insulation, setInsulation] = useState("1.0");
const [ceiling, setCeiling] = useState("standard");
const [power, setPower] = useState(null);
const [history, setHistory] = useState([]);


const calculatePower = () => {
    if(!area && !doors && !windows || isNaN(area) ||isNaN(doors)||isNaN(windows)){
        setPower("Enter correct number")
        return;
    }

    let base= area * 0.1;
    let result = base * parseFloat(climate) * parseFloat(insulation);
    
     const windowFactor = 1 + windows * 0.08; // 8% за окно
      const doorFactor = 1 + doors * 0.05;     // 5% за дверь
result *= windowFactor;
  result *= doorFactor;
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
        name: '№' + (history.length + 1),
        }
     
    ])

      
  };
      const printReport = () => {
    window.print();
}
return(
<div >
   <div style={{ display:"flex", flexWrap: "wrap"}}>
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
 
      <label>
        House area (m²):
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        />
      </label>
      <div style={{ display:"flex", gap:"60px"}}
      ><label>
        Windows:
        <input
          type="number"
          value={windows}
          onChange={(e) => setWindows(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        />
      </label>
        <label>
        Doors:
        <input
          type="number"
          value={doors}
          onChange={(e) => setDoors(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        />
      </label>
      </div>
        <div style={{ marginBottom: 10,display: "flex",gap: "8px", alignItems: "center" }}>
          <SunSnow />
        <label > Climate: </label>
        <select value={climate} onChange={(e) => setClimate(e.target.value)}>
          <option value="0.9">Warm</option>
          <option value="1.0">Moderate</option>
          <option value="1.2">Cold</option>
        </select>
      </div>
       <div style={{ marginBottom: 10,display: "flex",gap: "8px", alignItems: "center" }}>
        <BrickWallFire />
        <label>Insulation: </label>
        <select
          value={insulation}
          onChange={(e) => setInsulation(e.target.value)}
        >
          <option value="0.8">Excellent</option>
          <option value="1.0">Average</option>
          <option value="1.2">Poor</option>
        </select>
      </div>
      <div style={{ marginBottom: 10,display: "flex",gap: "8px", alignItems: "center" }}>
        <Ruler /> 
        <label>Ceiling height: </label>
        <select   
          value={ceiling}
          onChange={(e) => setCeiling(e.target.value)}
        >
          <option value="standard">Standard (≤ 3 m)</option>
          <option value="high">High (&gt; 3 m)</option>
        </select>
      </div>
      <button onClick={calculatePower} style={{ padding: "8px 12px" }}>
        Calculate
      </button>
      {power && (
        <p style={{ marginTop: 15, display: "flex", alignItems: "center", gap: "8px"  }}>
          <SquareCheckBig /> Recommended boiler power: <strong>{power} кВт</strong>
        </p>
      )}
      </div>

 <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
   <div style={{}}>
  <p><Rotate3d />3D model</p></div>
  <HeatLoss3D
  area={area}
  climate={climate}
  insulation={insulation}
  ceiling={ceiling}
  doors={doors}
  windows={windows}
/>
</div> 
</div >
       <BoilerChart  history={history} setHistory={setHistory}/>

        <button onClick={printReport} style={{ margin:"20px 50px", padding: "8px 12px", display: "flex",gap: "8px", alignItems: "center"}}>
        <Printer /> Print report
      </button>

      <EbayBoilerCards power={power}/>
    </div>

  

  );



}