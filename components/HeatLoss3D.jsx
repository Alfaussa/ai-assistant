"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import HeatLegend from "./HeatLegend";

// Цвет теплопотерь
function heatColor(loss) {
  const t = Math.min(1, Math.max(0, (loss - 0.7) / (1.6 - 0.7)));
  const colors = [
    [0, 0.4, 1],   // синий
    [0, 0.9, 0.3], // зеленый
    [1, 0.8, 0],   // жёлтый
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

function Door({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.8, 1.8, 0.05]} />
      <meshStandardMaterial color="#603000" />
    </mesh>
  );
}

function Window({ loss, position, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.6, 0.4, 0.05]} />
      <meshStandardMaterial color={heatColor(loss)} />
    </mesh>
  );
}

function Chimney() {
  return (
    <mesh position={[0.5, 1.3, 0]}>
      <boxGeometry args={[0.25, 0.6, 0.25]} />
      <meshStandardMaterial color="#555" />
    </mesh>
  );
}

// -------------------------
// 🚪 РАСПРЕДЕЛЕНИЕ ДВЕРЕЙ
// -------------------------

function getDoorTransform(index, doorsCount, width, depth) {
  const wall = index % 4;
  const spacing = 0.9;                        
  const offset = (index % doorsCount) * spacing - (doorsCount * spacing) / 2;

  switch (wall) {
    case 0: // SOUTH wall
      return { position: [offset, -0.4, depth / 2 + 0.06], rotation: [0, 0, 0] };
    case 1: // NORTH wall
      return { position: [offset, -0.4, -depth / 2 - 0.06], rotation: [0, Math.PI, 0] };
    case 2: // EAST wall
      return { position: [width / 2 + 0.06, -0.4, offset], rotation: [0, -Math.PI / 2, 0] };
    case 3: // WEST wall
      return { position: [-width / 2 - 0.06, -0.4, offset], rotation: [0, Math.PI / 2, 0] };
  }
}

function Roof({ loss }) {
  const texture = useTexture("/textures/roof.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);

  return (
    <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 1, 0]} castShadow>
      <coneGeometry args={[1.8, 0.9, 4]} />
      <meshStandardMaterial
        map={texture}
        color="#b3b3b3"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function Wall({ pos, rot, index }) {
  const brick = useTexture("/textures/brick.jpg");
  const colors = ["#bfbfbf", "#c9c9c9", "#d3d3d3", "#a9a9a9"];
  const baseColor = colors[index % colors.length];

  return (
    <mesh position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={[2, 1.6, 0.1]} />
      <meshStandardMaterial
        map={brick}
        color={baseColor}
        roughness={0.9}
        metalness={0.0}
      />
    </mesh>
  );
}

function PerimeterWindows({ windows, windowLoss }) {
  const countPerWall = Math.ceil(windows / 4);

  return (
    <>
      {Array.from({ length: countPerWall }).map((_, i) => (
        <Window key={"n" + i} loss={windowLoss} position={[-0.7 + i * 0.7, 0.2, -1.07]} />
      ))}
      {Array.from({ length: countPerWall }).map((_, i) => (
        <Window key={"s" + i} loss={windowLoss} position={[-0.7 + i * 0.7, 0.2, 1.07]} />
      ))}
      {Array.from({ length: countPerWall }).map((_, i) => (
        <Window key={"e" + i} loss={windowLoss} position={[1.07, 0.2, -0.7 + i * 0.7]} rotation={[0, Math.PI / 2, 0]} />
      ))}
      {Array.from({ length: countPerWall }).map((_, i) => (
        <Window key={"w" + i} loss={windowLoss} position={[-1.07, 0.2, -0.7 + i * 0.7]} rotation={[0, -Math.PI / 2, 0]} />
      ))}
    </>
  );
}

export default function HeatLossHouse({ climate, insulation, ceiling, doors, windows }) {

  const base = useMemo(() => climate * insulation, [climate, insulation]);

  // 📌 ДОБАВИЛ width / depth — ОЧЕНЬ ВАЖНО
  const width = 2;
  const depth = 2;

  const roofLoss = ceiling === "high" ? base * 1.25 : base;
  const windowLoss = base * 1.3;
  const doorLoss = base * 1.4;

  return (
    <div style={{ width: "100%", height: 380, marginTop: 20 }}>
      <Canvas shadows camera={{ position: [4, 3, 4], fov: 50 }}>

        <ambientLight intensity={0.45} />

        <directionalLight
          castShadow
          intensity={1.8}
          color={"#fff4d6"}
          position={[5, 8, 5]}
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>

        {/* Walls */}
        <Wall pos={[0, 0, 1]} rot={[0, Math.PI, 0]} index={0} />
        <Wall pos={[0, 0, -1]} rot={[0, 0, 0]} index={1} />
        <Wall pos={[1, 0, 0]} rot={[0, -Math.PI / 2, 0]} index={2} />
        <Wall pos={[-1, 0, 0]} rot={[0, Math.PI / 2, 0]} index={3} />

        {/* Roof & Chimney */}
        <Roof loss={roofLoss} />
        <Chimney />

        {/* DOORS */}
        {Array.from({ length: doors }).map((_, i) => {
          const t = getDoorTransform(i, doors, width, depth);
          return <Door key={"door" + i} position={t.position} rotation={t.rotation} />;
        })}

        {/* WINDOWS */}
        <PerimeterWindows windows={windows} windowLoss={windowLoss} />

        <OrbitControls makeDefault />
      </Canvas>

      <HeatLegend />
    </div>
  );
}
