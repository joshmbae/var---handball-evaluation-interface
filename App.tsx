
import React, { useState, useMemo } from 'react';
import { Settings, Shield, Activity, BarChart3, Database, AlertCircle } from 'lucide-react';
import { INITIAL_STATE } from './constants';
import { AppState } from './types';
import InfoCard from './components/InfoCard';
import MetricGauge from './components/MetricGauge';
import SummaryDonut from './components/SummaryDonut';
import EditPanel from './components/EditPanel';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isEditMode, setIsEditMode] = useState(false);

  // Calculate overall handball score based on weighted metrics or manual override
  const overallScore = useMemo(() => {
    if (state.manualScore !== undefined && state.manualScore !== null) {
      return state.manualScore;
    }
    if (state.metrics.length === 0) return 0;
    const sum = state.metrics.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round(sum / state.metrics.length);
  }, [state.metrics, state.manualScore]);

  const handleUpdateState = (newState: AppState) => {
    setState(newState);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/85 backdrop-blur-sm border-b border-slate-100 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#E20613] p-2 rounded-xl shadow-lg shadow-red-200">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-none tracking-tight">Sportec Solutions Handball Evaluation Dashboard</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Referee Evaluation Interface</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Analysis Engine Live</span>
            </div>
            <button 
              onClick={() => setIsEditMode(true)}
              className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-slate-400 hover:text-[#E20613] transition-all group shadow-sm"
              title="Open Simulator Settings"
            >
              <Settings size={20} className="group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-4 md:px-8 pb-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          {/* Situation card directly below header */}
          <section className="grid grid-cols-1 pt-6">
            <InfoCard data={state.situation} />
          </section>

          {/* Metrics + Overall row */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Metrics Table Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-[#E20613]" size={20} />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Automated Metric Analysis</h3>
                </div>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.25em]">Performance Metric</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.25em] text-center">Measured Value</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.25em] min-w-[240px]">Violation Likelihood</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.metrics.map((metric) => (
                      <tr key={metric.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-5">
                          <span className="font-bold text-slate-900 text-base">{metric.name}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block px-4 py-2 bg-slate-900/90 text-white border border-slate-800 rounded-xl font-mono font-black text-base tracking-wide shadow-md">
                            {metric.value} {metric.unit}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <MetricGauge percentage={metric.rating} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          {/* Right Column - Overall Summary */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <Activity className="text-[#E20613]" size={24} />
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider">Overall Score</h3>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <SummaryDonut score={overallScore} />
              </div>

              {/* Evidence Summary Section */}
              <div className="mt-auto pt-8 space-y-4">
                <div className="flex flex-col gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${overallScore >= 50 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      <AlertCircle size={20} className={overallScore >= 50 ? 'text-red-600' : 'text-green-600'} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">EVALUATION NOTE</h4>
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {overallScore >= 75 
                          ? `With a score of ${overallScore}, the data indicates a high likelihood of a handball violation.`
                          : overallScore >= 50
                          ? `With a score of ${overallScore}, the data indicates a possible handball violation.`
                          : `With a score of ${overallScore}, the data indicates a low probability of a handball violation.`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                    <Database size={12} className="text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Source: Ball & skeletal tracking
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>
      </main>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <EditPanel 
          state={state} 
          onUpdate={handleUpdateState} 
          onClose={() => setIsEditMode(false)} 
        />
      )}

      {/* Hidden Toggle Trigger Info */}
      <div className="fixed bottom-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none select-none">
        Simulation v1.0.4 - Secure Instance
      </div>
    </div>
  );
};

export default App;
