export default function HeatLegend() {
  const legend = [
    { color: "rgb(0, 102, 255)", label: "Холодно (синий)" },
    { color: "rgb(0, 230, 80)", label: "Норма (зелёный)" },
    { color: "rgb(255, 204, 0)", label: "Плохо (жёлтый)" },
    { color: "rgb(255, 0, 0)",     label: "Очень плохо (красный)" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "14px",
      marginTop: "12px",
      flexWrap: "wrap",
      alignItems: "center",
    }}>
      {legend.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              backgroundColor: item.color,
              borderRadius: 4,
              border: "1px solid black",
            }}
          />
          <span style={{ fontSize: 14 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
