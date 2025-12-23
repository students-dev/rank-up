"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Math", A: 120, fullMark: 150 },
  { subject: "Arrays", A: 98, fullMark: 150 },
  { subject: "Strings", A: 86, fullMark: 150 },
  { subject: "Graphs", A: 40, fullMark: 150 },
  { subject: "DP", A: 65, fullMark: 150 },
  { subject: "Logic", A: 110, fullMark: 150 },
];

export const SkillRadar = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "#71717a", fontSize: 10, fontWeight: 800 }} 
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
