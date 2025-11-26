export default function HeatLegend() {
  const legend = [
   
    { color: "rgb(121, 174, 139)", label: "Normal (green)" },
    { color: "rgb(218, 201, 131)", label: "Cold (yellow)" },
    { color: "rgb(208, 70, 70)",     label: "Very cold (red)" },
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
