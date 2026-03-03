
import React from 'react';

interface MetricGaugeProps {
  percentage: number;
}

const MetricGauge: React.FC<MetricGaugeProps> = ({ percentage }) => {
  const palette = (val: number) => {
    if (val >= 75) {
      return {
        text: 'text-red-600',
        gradient: 'linear-gradient(90deg, #e20613 0%, #fb7185 60%, #fecdd3 100%)',
      };
    }
    if (val >= 50) {
      return {
        text: 'text-orange-500',
        gradient: 'linear-gradient(90deg, #f97316 0%, #fbbf24 70%, #fde68a 100%)',
      };
    }
    return {
      text: 'text-green-600',
      gradient: 'linear-gradient(90deg, #16a34a 0%, #22c55e 65%, #bbf7d0 100%)',
    };
  };

  const colors = palette(percentage);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Score</span>
        <span className={`text-lg font-black ${colors.text}`}>
          {percentage}
          <span className="text-xs font-bold align-super ml-1">%</span>
        </span>
      </div>
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
        <div 
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundImage: colors.gradient }}
        />
      </div>
    </div>
  );
};

export default MetricGauge;
