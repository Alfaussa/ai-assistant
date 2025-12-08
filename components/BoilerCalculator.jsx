"use client";

import { useState } from "react";

import HeatLegend from "./HeatLegend";
import {
  SunSnow,
  BrickWallFire,
  Ruler,
  SquareCheckBig,
  Rotate3d,
} from "lucide-react";
import HeatLoss3D from "./HeatLoss3D";


export default function BoilerCalculator({ history, setHistory, power, setPower }) {
  const [area, setArea] = useState("");
  const [doors, setDoors] = useState("");
  const [windows, setWindows] = useState("");
  const [climate, setClimate] = useState("1.0");
  const [insulation, setInsulation] = useState("1.0");
  const [ceiling, setCeiling] = useState("standard");
  

  const calculatePower = () => {
    if (
      (!area && !doors && !windows) ||
      isNaN(area) ||
      isNaN(doors) ||
      isNaN(windows)
    ) {
      setPower("Enter correct number");
      return;
    }

    let base = area * 0.1;
    let result = base * parseFloat(climate) * parseFloat(insulation);

    const windowFactor = 1 + windows * 0.08;
    const doorFactor = 1 + doors * 0.05;

    result *= windowFactor;
    result *= doorFactor;

    if (ceiling === "high") {
      result *= 1.2;
    }

    const finalResult = result.toFixed(1);
    setPower(finalResult);

    setHistory([
      ...history,
      {
        area: area,
        climate: climate,
        insulation: insulation,
        ceiling: ceiling,
        power: Number(finalResult),
        name: "№" + (history.length + 1),
      },
    ]);
  };



  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            maxWidth: 400,
            margin: "20px auto",
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <label>
            House area (m²):
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </label>

          <div style={{ display: "flex", gap: "60px" }}>
            <label>
              Windows:
              <input
                type="number"
                value={windows}
                onChange={(e) => setWindows(e.target.value)}
              />
            </label>
            <label>
              Doors:
              <input
                type="number"
                value={doors}
                onChange={(e) => setDoors(e.target.value)}
              />
            </label>
          </div>

          <div className="icon">
          
              <SunSnow />
              <label>Climate:</label>
          
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
            >
              <option value="0.9">Warm</option>
              <option value="1.0">Moderate</option>
              <option value="1.2">Cold</option>
            </select>
          </div>

          <div className="icon">
           
              <BrickWallFire />
              <label>Insulation:</label>
            
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
            >
              <option value="0.8">Excellent</option>
              <option value="1.0">Average</option>
              <option value="1.2">Poor</option>
            </select>
          </div>

          <div className="icon">
           
              <Ruler />
              <label>Ceiling height:</label>
        
            <select
              value={ceiling}
              onChange={(e) => setCeiling(e.target.value)}
            >
              <option value="standard">Standard (≤ 3 m)</option>
              <option value="high">High (&gt; 3 m)</option>
            </select>
          </div>

          <button onClick={calculatePower} style={{ marginTop:20}}>
            Calculate
          </button>

          {power && (
            <p className="icon">
              <SquareCheckBig /> Recommended boiler power:{" "}
              <strong>{power} kW</strong>
            </p>
          )}
        </div>

        {/* 3D MODEL */}
        <div
          style={{
           
            maxWidth: 400,
            margin: "20px auto",
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <p >
            <Rotate3d /> 3D model
          </p>

          <HeatLoss3D
            area={area}
            climate={climate}
            insulation={insulation}
            ceiling={ceiling}
            doors={doors}
            windows={windows}
          />
             <HeatLegend />
        
        </div>
      </div>

      

    </div>
  );
}
