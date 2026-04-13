import { useState } from "react";
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

const Barplot = ({ data }) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

  const margin = { top: 60, right: 30, bottom: 40, left: 100 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, height])
    .padding(0.2);

  const maxStudents = d3.max(data, (d) => d.students);
  const xTicks = d3.range(0, maxStudents + 10, 10);

  const handleMouseEnter = (event, d) => {
    setTooltip({
      show: true,
      x: event.clientX + 10,
      y: event.clientY - 10,
      content: `${d.country}: ${d.students} students`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: "" });
  };

  return (
    <>
      <svg width={500} height={400}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Title */}
          <text
            x={width / 2}
            y={-30}
            textAnchor="middle"
            fontSize="18"
            fontFamily="Nunito"
            fill="#3E2C23"
            fontWeight="bold"
          >
            Students that ❤️ D3 ❤️ React Course
          </text>

          {/* Subtitle */}
          <text
            x={width / 2}
            y={-10}
            textAnchor="middle"
            fontSize="15"
            fontFamily="Nunito"
            fill="#5D4037"
          >
            Where are they from?
          </text>

          {/* Gridlines */}
          {xTicks.map((tick) => (
            <line
              key={tick}
              x1={xScale(tick)}
              y1={0}
              x2={xScale(tick)}
              y2={height}
              stroke="#D2B48C"
              strokeWidth="1"
            />
          ))}

          {/* X-axis line */}
          <line
            x1={0}
            y1={height}
            x2={width}
            y2={height}
            stroke="#D2B48C"
            strokeWidth="2"
          />

          {/* Bars */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={0}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              fill="#2FA4D7"
              onMouseEnter={(event) => handleMouseEnter(event, d)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Y-axis labels (countries) */}
          {data.map((d, i) => (
            <text
              key={i}
              x={-10}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
              fontFamily="Nunito"
              fill="#3E2C23"
            >
              {d.country}
            </text>
          ))}

          {/* X-axis labels (ticks) */}
          {xTicks.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={height + 15}
              textAnchor="middle"
              fontSize="12"
              fontFamily="Nunito"
              fill="#3E2C23"
            >
              {tick}
            </text>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: "#cce7f5",
            border: "2px solid #0d4a6b",
            borderRadius: "8px",
            padding: "8px",
            fontFamily: "Nunito",
            fontSize: "14px",
            color: "#3E2C23",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
      />
      <div style={{ backgroundColor: "#F5E9D8" }}>
        <Barplot data={data} />
      </div>
    </>
  );
}

export default App;
