
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SummaryDonutProps {
  score: number;
}

const SummaryDonut: React.FC<SummaryDonutProps> = ({ score }) => {
  const data = [
    { name: 'Foul Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (val: number) => {
    if (val >= 75) return '#E20613';
    if (val >= 50) return '#f97316';
    return '#22c55e';
  };

  const mainColor = getColor(score);

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-1">
      <div className="relative w-full h-48 md:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="82%"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={mainColor} />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-slate-900" style={{ color: mainColor }}>{score}%</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none">Violation Probability</span>
      </div>
    </div>
  );
};

export default SummaryDonut;
