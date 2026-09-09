export default function GraphMotif() {
  const nodes = [
    [60, 12],
    [24, 46],
    [96, 46],
    [8, 82],
    [40, 82],
    [80, 82],
    [112, 82],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];

  return (
    <svg viewBox="0 0 120 96" className="h-24 w-28 opacity-70" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#3A3F4C"
          strokeWidth="1.4"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 5 : 4}
          fill={i === 0 ? "rgb(var(--accent))" : "rgb(var(--panel-raised))"}
          stroke="rgb(var(--accent))"
          strokeWidth="1.3"
        />
      ))}
    </svg>
  );
}
