"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Цвет теплопотерь
function heatColor(loss) {
const t = Math.min(1, Math.max(0, (loss - 0.7) / (1.6 - 0.7)));
const colors = [
[0, 0.4, 1],   // синий
[0, 0.9, 0.3], // зеленый
[1, 0.8, 0],   // желтый
[1, 0, 0],     // красный
];
const idx = Math.floor(t * 3);
const f = t * 3 - idx;
const c1 = colors[idx];
const c2 = colors[idx + 1] || colors[idx];
return [
c1[0] + (c2[0] - c1[0]) * f,
c1[1] + (c2[1] - c1[1]) * f,
c1[2] + (c2[2] - c1[2]) * f,
];
}

// Черная рамка
function Outline({ width, height, position }) {
return ( <mesh position={position}>
<planeGeometry args={[width, height]} /> <meshBasicMaterial color="black" /> </mesh>
);
}

function Door({ loss, offset }) {
const x = -0.6 + offset * 0.6;
return (
<>
<Outline width={0.52} height={0.82} position={[x, -0.25, 1.07]} />
<mesh position={[x, -0.25, 1.05]}>
<boxGeometry args={[0.5, 0.8, 0.05]} /> <meshStandardMaterial color={heatColor(loss)} /> </mesh>
</>
);
}

function Window({ loss, offset }) {
return (
<mesh position={[-0.7 + offset * 0.7, 0.2, -1.07]}>
<boxGeometry args={[0.6, 0.4, 0.05]} /> <meshStandardMaterial color={heatColor(loss)} /> </mesh>
);
}

function Chimney() {
return (
<mesh position={[0.5, 1.3, 0]}>
<boxGeometry args={[0.25, 0.6, 0.25]} /> <meshStandardMaterial color="#555" /> </mesh>
);
}

function Roof({ loss }) {
const texture = useTexture("/textures/roof.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 1);

return (
<mesh rotation={[0, Math.PI / 4, 0]} position={[0, 1, 0]} castShadow>
<coneGeometry args={[1.8, 0.9, 4]} /> <meshStandardMaterial
     map={texture}
     color="#b3b3b3"
     roughness={0.8}
     metalness={0.1}
   /> </mesh>
);
}

function Wall({ pos, rot, index }) {
const brick = useTexture("/textures/brick.jpg");
const colors = ["#bfbfbf", "#c9c9c9", "#d3d3d3", "#a9a9a9"];
const baseColor = colors[index % colors.length];

return ( <mesh position={pos} rotation={rot} castShadow receiveShadow>
<boxGeometry args={[2, 1.6, 0.1]} /> <meshStandardMaterial
     map={brick}
     color={baseColor}
     roughness={0.9}
     metalness={0.0}
   /> </mesh>
);
}

export default function HeatLossHouse({ climate, insulation, ceiling, doors, windows }) {
const base = useMemo(() => climate * insulation, [climate, insulation]);
const northLoss = base * 1.2;
const southLoss = base * 0.9;
const eastLoss = base * 1.0;
const westLoss = base * 1.1;
const roofLoss = ceiling === "high" ? base * 1.25 : base;
const windowLoss = eastLoss * 1.3;
const doorLoss = southLoss * 1.4;

return (
<div style={{ width: "100%", height: 380, marginTop: 20 }}>
<Canvas shadows camera={{ position: [4, 3, 4], fov: 50 }}>
{/* Ambient */} <ambientLight intensity={0.45} />
{/* Sunlight */}
<directionalLight
castShadow
intensity={1.8}
color={"#fff4d6"}
position={[5, 8, 5]}
shadow-mapSize-width={2048}
shadow-mapSize-height={2048}
shadow-camera-near={1}
shadow-camera-far={30}
shadow-camera-left={-6}
shadow-camera-right={6}
shadow-camera-top={6}
shadow-camera-bottom={-6}
/>
{/* Ground */}
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
<planeGeometry args={[20, 20]} /> <meshStandardMaterial color="#e8e8e8" /> </mesh>

```
    {/* Walls */}
    <Wall pos={[0, 0, 1]} rot={[0, Math.PI, 0]} index={0} />
    <Wall pos={[0, 0, -1]} rot={[0, 0, 0]} index={1} />
    <Wall pos={[1, 0, 0]} rot={[0, -Math.PI / 2, 0]} index={2} />
    <Wall pos={[-1, 0, 0]} rot={[0, Math.PI / 2, 0]} index={3} />

    {/* Roof & Chimney */}
    <Roof loss={roofLoss} />
    <Chimney />

    {/* Doors & Windows */}
    {Array.from({ length: doors }).map((_, i) => (
      <Door key={i} loss={doorLoss} offset={i} />
    ))}
    {Array.from({ length: windows }).map((_, i) => (
      <Window key={i} loss={windowLoss} offset={i} />
    ))}

    <OrbitControls makeDefault/>
  </Canvas>
</div>

);
}
