
import React from 'react';
import { SituationData } from '../types';
import { Clock, MapPin, HandMetal, Info, CheckCircle2, XCircle, Layers, Users } from 'lucide-react';

interface InfoCardProps {
  data: SituationData;
}

const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'Ball Control': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Deflection': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-amber-50 text-amber-700 border-amber-100'; // Blocked
    }
  };

  return (
    <div className="bg-white border-l-4 border-[#E20613] shadow-sm p-6 rounded-r-xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-slate-50 pb-6">
        <div className="min-w-0 max-w-full">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">Live Situation Analysis</h2>
          <h1 className="text-2xl font-black text-slate-900 truncate" title={data.matchInfo}>{data.matchInfo}</h1>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <div className={`px-4 py-2.5 rounded-lg flex items-center gap-2 border font-bold text-xs uppercase tracking-wider ${getCategoryStyles(data.category)}`}>
            <Layers size={16} className="shrink-0" />
            <span className="whitespace-nowrap">{data.category}</span>
          </div>
          <div className={`px-4 py-2.5 rounded-lg flex items-center gap-2 border ${data.isHandball ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
            {data.isHandball ? <CheckCircle2 size={18} className="text-red-600 shrink-0" /> : <XCircle size={18} className="text-green-600 shrink-0" />}
            <span className="font-bold text-sm uppercase tracking-wider whitespace-nowrap">
              Hand Touched: {data.isHandball ? 'TRUE' : 'FALSE'}
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid - Distributed over full width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {/* Team */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="p-2.5 bg-white rounded-lg text-[#E20613] shadow-sm shrink-0 border border-slate-100">
            <Users size={20} />
          </div>
          <div className="flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Team</p>
            <p className="font-bold text-slate-900 text-sm leading-tight break-words" title={data.team}>{data.team ?? '—'}</p>
          </div>
        </div>

        {/* 1. Player (Subject) */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="p-2.5 bg-white rounded-lg text-[#E20613] shadow-sm shrink-0 border border-slate-100">
            <Info size={20} />
          </div>
          <div className="flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">Player</p>
            <p className="font-bold text-slate-900 text-sm leading-tight truncate" title={data.playerNumber}>{data.playerNumber}</p>
          </div>
        </div>

        {/* 2. Impact Zone */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="p-2.5 bg-white rounded-lg text-[#E20613] shadow-sm shrink-0 border border-slate-100">
            <HandMetal size={20} />
          </div>
          <div className="flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">Impact Zone</p>
            <p className="font-bold text-slate-900 text-sm leading-tight truncate" title={`${data.handTouched} Arm  `}>{data.handTouched} Arm</p>
          </div>
        </div>

        {/* 3. Match Time */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="p-2.5 bg-white rounded-lg text-[#E20613] shadow-sm shrink-0 border border-slate-100">
            <Clock size={20} />
          </div>
          <div className="flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">Time</p>
            <p className="font-bold text-slate-900 text-sm leading-tight truncate" title={data.timestamp}>{data.timestamp}</p>
          </div>
        </div>

        {/* 4. Position */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="p-2.5 bg-white rounded-lg text-[#E20613] shadow-sm shrink-0 border border-slate-100">
            <MapPin size={20} />
          </div>
          <div className="flex flex-col justify-center min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">Position</p>
            <p className="font-bold text-slate-900 text-sm leading-tight truncate" title={data.position}>{data.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
