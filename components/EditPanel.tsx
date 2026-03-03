
import React from 'react';
import { AppState, Metric, HandballCategory } from '../types';
import { X, Save, Settings, Info, Activity } from 'lucide-react';

interface EditPanelProps {
  state: AppState;
  onUpdate: (newState: AppState) => void;
  onClose: () => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ state, onUpdate, onClose }) => {
  const handleMetricChange = (id: string, field: keyof Metric, value: string | number) => {
    const newMetrics = state.metrics.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    );
    onUpdate({ ...state, metrics: newMetrics });
  };

  const handleSituationChange = (field: string, value: any) => {
    onUpdate({
      ...state,
      situation: {
        ...state.situation,
        [field]: value
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in">
        <div className="p-6 bg-[#E20613] text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Settings size={24} className="text-white animate-spin-slow" />
            <h2 className="text-xl font-bold text-white">Simulator Controls</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Situation Section */}
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Info size={14} className="text-[#E20613]" />
              General Constants
            </h3>
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Situation Category</label>
                  <select 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.category}
                    onChange={(e) => handleSituationChange('category', e.target.value as HandballCategory)}
                  >
                    <option value="Blocked">Blocked</option>
                    <option value="Ball Control">Ball Control</option>
                    <option value="Deflection">Deflection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Impact Zone</label>
                  <select 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.handTouched}
                    onChange={(e) => handleSituationChange('handTouched', e.target.value)}
                  >
                    <option value="Left">Left Hand</option>
                    <option value="Right">Right Hand</option>
                    <option value="Both">Both Hands</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Match Info</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.matchInfo}
                    onChange={(e) => handleSituationChange('matchInfo', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Team</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.team}
                    onChange={(e) => handleSituationChange('team', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Subject (Player)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.playerNumber}
                    onChange={(e) => handleSituationChange('playerNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-tighter">Timestamp</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold text-slate-900"
                    value={state.situation.timestamp}
                    onChange={(e) => handleSituationChange('timestamp', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700 uppercase">Hand Touched Sensor</span>
                <button 
                  onClick={() => handleSituationChange('isHandball', !state.situation.isHandball)}
                  className={`w-14 h-7 rounded-full relative transition-colors ${state.situation.isHandball ? 'bg-red-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${state.situation.isHandball ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Activity size={14} className="text-[#E20613]" />
              Evaluation Metrics
            </h3>

            {/* Manual Override Control */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Manual Score Override</h3>
                    <button
                        onClick={() => onUpdate({ ...state, manualScore: state.manualScore === null || state.manualScore === undefined ? 50 : null })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${state.manualScore !== null && state.manualScore !== undefined ? 'bg-red-600' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${state.manualScore !== null && state.manualScore !== undefined ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>

                {state.manualScore !== null && state.manualScore !== undefined && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-end mb-1">
                            <label className="block text-[9px] font-bold text-slate-400 uppercase">Overall Score</label>
                            <span className="text-xs font-black text-red-600">{state.manualScore}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                            value={state.manualScore}
                            onChange={(e) => onUpdate({ ...state, manualScore: parseInt(e.target.value) })}
                        />
                        <p className="text-[9px] text-slate-400 mt-2 italic">
                            * Overrides calculated average from individual metrics below
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-6">
              {state.metrics.map(metric => (
                <div key={metric.id} className={`p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-opacity duration-300 ${state.manualScore !== null && state.manualScore !== undefined ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                  <p className="text-[11px] font-black text-slate-800 mb-4 uppercase tracking-tighter">{metric.name}</p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Raw Value</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-sm border rounded-lg bg-white text-slate-900 font-medium"
                          value={metric.value}
                          onChange={(e) => handleMetricChange(metric.id, 'value', e.target.value)}
                        />
                      </div>
                      <div className="w-16">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Unit</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-sm border rounded-lg bg-white text-center font-mono text-slate-900 font-bold"
                          value={metric.unit}
                          onChange={(e) => handleMetricChange(metric.id, 'unit', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Violation Weighting</label>
                        <span className="text-xs font-black text-red-600">{metric.rating}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        value={metric.rating}
                        onChange={(e) => handleMetricChange(metric.id, 'rating', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 border-t bg-white flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98]"
          >
            <Save size={20} className="text-white" />
            Save Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
