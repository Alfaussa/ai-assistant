"use client";
import { useState } from "react";
import BoilerCalculator from "./BoilerCalculator"
import BoilerChart from "./BoilerChart";

export default function ClientContainer() {
  const [history, setHistory] = useState([]);

  return (
    <>
      <section id="calc">
        <BoilerCalculator history={history} setHistory={setHistory} />
      </section>

      <section id="chart">
        <BoilerChart history={history} setHistory={setHistory} />
      </section>
    </>
  );
}
