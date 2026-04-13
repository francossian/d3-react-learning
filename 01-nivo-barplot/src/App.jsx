import * as d3 from "d3";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

function App() {
  const margin = { top: 20, right: 30, bottom: 40, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // D3 for math: scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, height])
    .padding(0.1);

  // D3 for math: axis ticks
  const xTicks = xScale.ticks().map((tick) => ({
    value: tick,
    x: xScale(tick),
  }));

  const yTicks = data.map((d) => ({
    value: d.country,
    y: yScale(d.country) + yScale.bandwidth() / 2,
  }));

  return (
    <div style={{ backgroundColor: "white" }}>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Bars - React rendering */}
          {data.map((d, i) => {
            const barWidth = xScale(d.students);
            const barY = yScale(d.country);
            const barHeight = yScale.bandwidth();
            const radius = 5;
            const pathData = `M 0 ${barY} L ${barWidth - radius} ${barY} Q ${barWidth} ${barY} ${barWidth} ${barY + radius} L ${barWidth} ${barY + barHeight - radius} Q ${barWidth} ${barY + barHeight} ${barWidth - radius} ${barY + barHeight} L 0 ${barY + barHeight} Z`;
            return (
              <g key={i}>
                <path d={pathData} fill="steelblue" />
                <text
                  x={barWidth + 5}
                  y={barY + barHeight / 2}
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="black"
                >
                  {d.students}
                </text>
              </g>
            );
          })}

          {/* X-axis - React rendering */}
          <line x1={0} y1={height} x2={width} y2={height} stroke="black" />
          {xTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={tick.x}
                y1={height}
                x2={tick.x}
                y2={height + 5}
                stroke="black"
              />
              <text
                x={tick.x}
                y={height + 20}
                textAnchor="middle"
                fontSize="12"
              >
                {tick.value}
              </text>
            </g>
          ))}

          {/* Y-axis - React rendering */}
          <line x1={0} y1={0} x2={0} y2={height} stroke="black" />
          {yTicks.map((tick, i) => (
            <text
              key={i}
              x={-10}
              y={tick.y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
            >
              {tick.value}
            </text>
          ))}

          {/* Labels */}
          <text
            x={width / 2}
            y={height + margin.bottom - 5}
            textAnchor="middle"
          >
            Number of Students
          </text>
          <text
            transform={`rotate(-90) translate(${-height / 2}, ${-margin.left + 20})`}
            textAnchor="middle"
          >
            Country
          </text>
        </g>
      </svg>
    </div>
  );
}

export default App;
