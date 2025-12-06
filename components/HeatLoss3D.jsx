"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**

* HeatLossHouse.jsx
*
* 3D модель дома с автоматическим масштабированием,
* равномерным размещением дверей и окон, визуализация теплопотерь.
  */

// ---------- helper: цвет по loss ----------
function heatColor(loss) {
const t = Math.min(1, Math.max(0, (loss - 0.7) / (1.6 - 0.7)));
const colors = [
[0.474, 0.682, 0.545], // зеленый
[0.855, 0.788, 0.514], // желтый
[0.816, 0.275, 0.275], // красный
];
const idx = Math.floor(t * 2);
const frac = t * 2 - idx;
const c1 = colors[idx];
const c2 = colors[idx + 1] || colors[idx];
return [
c1[0] + (c2[0] - c1[0]) * frac,
c1[1] + (c2[1] - c1[1]) * frac,
c1[2] + (c2[2] - c1[2]) * frac,
];
}

// ---------- primitives ----------

function Door({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <mesh
      position={[position[0], position[1] + 0.45, position[2]]}
      rotation={rotation}
      castShadow
    >
      <boxGeometry args={[0.8, 1.5, 0.05]} />
      <meshStandardMaterial color="#603000" />
    </mesh>
  );
}


function Window({ loss = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const col = heatColor(loss);
  const glassColor = new THREE.Color(col[0], col[1], col[2]);

  return (
    <group position={position} rotation={rotation}>
      {/* Black frame */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.5, 0.08]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshStandardMaterial color={glassColor} />
      </mesh>
    </group>
  );
}


// Дымоход
function Chimney({ position = [0.5, 1.3, 0] }) {
return ( <mesh position={position} castShadow>
<boxGeometry args={[0.25, 0.6, 0.25]} /> <meshStandardMaterial color="#555" /> </mesh>
);
}

// Крыша
function Roof({ width = 2, depth = 2, height = 1.6 }) {
const texture = useTexture("/textures/roof.jpg");
if (texture) {
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 1);
}
const radius = Math.max(width, depth) * 0.9;

return (
<mesh rotation={[0, Math.PI / 4, 0]} position={[0, height / 1.2, 0]} castShadow>
<coneGeometry args={[radius, height * 0.8, 4]} /> <meshStandardMaterial map={texture} color="#b3b3b3" roughness={0.8} /> </mesh>
);
}

// Стена
function Wall({ pos, rot, length, height }) {
const brick = useTexture("/textures/brick.jpg");
return ( <mesh position={pos} rotation={rot} castShadow receiveShadow>
<boxGeometry args={[length, height, 0.1]} /> <meshStandardMaterial map={brick} roughness={0.9} metalness={0.0} /> </mesh>
);
}

// ---------- distribution logic ----------

// Позиции дверей
function getDoorTransform(index, doorsCount, width, depth) {
  const wall = index % 4;
  const perWall = Math.ceil(doorsCount / 4);
  const idxAlong = Math.floor(index / 4);

  const stepW = width / (perWall + 1);
  const stepD = depth / (perWall + 1);

  const y = -0.8+ 0.35; // исправлено

  switch (wall) {
    case 0:
      return { position: [-width/2 + stepW*(idxAlong+1), y, depth/2 + 0.06], rotation: [0,0,0] };
    case 1:
      return { position: [-width/2 + stepW*(idxAlong+1), y, -depth/2 - 0.06], rotation: [0,Math.PI,0] };
    case 2:
      return { position: [width/2 + 0.06, y, -depth/2 + stepD*(idxAlong+1)], rotation: [0,-Math.PI/2,0] };
    case 3:
      return { position: [-width/2 - 0.06, y, -depth/2 + stepD*(idxAlong+1)], rotation: [0,Math.PI/2,0] };
  }
}


// Распределение окон
function PerimeterWindows({ windows = 0, windowLoss = 1, width = 2, depth = 2 }) {
const perWall = Math.max(0, Math.ceil(windows / 4));
const items = [];

// NORTH & SOUTH
for (let i = 0; i < perWall; i++) {
const step = width / (perWall + 1);
items.push(<Window key={`n-${i}`} loss={windowLoss} position={[-width / 2 + step * (i + 1), 0.2, -depth / 2 - 0.06]} />);
items.push(<Window key={`s-${i}`} loss={windowLoss} position={[-width / 2 + step * (i + 1), 0.2, depth / 2 + 0.06]} />);
}

// EAST & WEST
for (let i = 0; i < perWall; i++) {
const step = depth / (perWall + 1);
items.push(<Window key={`e-${i}`} loss={windowLoss} position={[width / 2 + 0.06, 0.2, -depth / 2 + step * (i + 1)]} rotation={[0, Math.PI / 2, 0]} />);
items.push(<Window key={`w-${i}`} loss={windowLoss} position={[-width / 2 - 0.06, 0.2, -depth / 2 + step * (i + 1)]} rotation={[0, -Math.PI / 2, 0]} />);
}

return <>{items}</>;
}

// ---------- main component ----------
export default function HeatLossHouse({ climate = 1, insulation = 1, ceiling = "standard", doors = 0, windows = 0 }) {
const doorsNum = Number(doors) || 0;
const windowsNum = Number(windows) || 0;

const width = 2;
const depth = 2;
const height = 1.6;

const base = useMemo(() => Number(climate) * Number(insulation), [climate, insulation]);
const roofLoss = ceiling === "high" ? base * 1.25 : base;
const windowLoss = base * 1.3;
const doorLoss = base * 1.4;

return (
<div style={{ width: "100%", height: 300 }}>
<Canvas shadows camera={{ position: [4, 3, 4], fov: 50 }}> <ambientLight intensity={0.45} />
<directionalLight castShadow intensity={1.2} color="#fff4d6" position={[5, 8, 5]} />

```
    {/* Ground */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e8e8e8" />
    </mesh>

    {/* Walls */}
    <Wall pos={[0, 0, depth / 2]} rot={[0, Math.PI, 0]} length={width} height={height} />
    <Wall pos={[0, 0, -depth / 2]} rot={[0, 0, 0]} length={width} height={height} />
    <Wall pos={[width / 2, 0, 0]} rot={[0, -Math.PI / 2, 0]} length={depth} height={height} />
    <Wall pos={[-width / 2, 0, 0]} rot={[0, Math.PI / 2, 0]} length={depth} height={height} />

    {/* Roof & Chimney */}
    <Roof width={width} depth={depth} height={height} />
    <Chimney />

    {/* Doors */}
    {Array.from({ length: doorsNum }).map((_, i) => {
      const t = getDoorTransform(i, doorsNum, width, depth);
      return <Door key={`door-${i}`} position={t.position} rotation={t.rotation} />;
    })}

    {/* Windows */}
    <PerimeterWindows windows={windowsNum} windowLoss={windowLoss} width={width} depth={depth} />

    <OrbitControls makeDefault />
  </Canvas>
 </div> )
}