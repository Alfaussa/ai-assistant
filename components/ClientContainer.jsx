"use client";
import { useState } from "react";
import BoilerCalculator from "./BoilerCalculator"
import BoilerChart from "./BoilerChart";
import EbayBoilerCards from "./EbayBoilerCards";

export default function ClientContainer() {
  const [history, setHistory] = useState([]);
    const [power, setPower] = useState(null);
  return (
    <>
      <section id="calc">
        <BoilerCalculator history={history} setHistory={setHistory}  power={power}
  setPower={setPower}/>
      </section>

      <section id="chart">
        <BoilerChart history={history} setHistory={setHistory} />
      </section>
      
        <section id="cards">
        <EbayBoilerCards power={power} />
      </section>
    </>
  );
}
