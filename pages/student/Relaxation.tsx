
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, Wind } from 'lucide-react';
import { SOUND_TRACKS } from '../../constants';

const Relaxation: React.FC = () => {
  const [breathingMode, setBreathingMode] = useState<'box' | '478' | 'deep'>('box');
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const configs = {
    box: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    '478': { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
    deep: { inhale: 5, hold1: 0, exhale: 5, hold2: 0 },
  };

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const config = configs[breathingMode];
    if (phase === 'Inhale' && timer >= config.inhale) {
      setPhase(config.hold1 > 0 ? 'Hold' : 'Exhale');
      setTimer(0);
    } else if (phase === 'Hold' && timer >= config.hold1) {
      setPhase('Exhale');
      setTimer(0);
    } else if (phase === 'Exhale' && timer >= config.exhale) {
      setPhase(config.hold2 > 0 ? 'Rest' : 'Inhale');
      setTimer(0);
    } else if (phase === 'Rest' && timer >= config.hold2) {
      setPhase('Inhale');
      setTimer(0);
    }
  }, [timer, phase, breathingMode]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Breathing Exercise */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 flex flex-col items-center">
          <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Guided Breathing</h2>
            <div className="flex justify-center gap-2 mt-4">
              {Object.keys(configs).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBreathingMode(mode as any);
                    setIsActive(false);
                    setPhase('Inhale');
                    setTimer(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    breathingMode === mode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className={`absolute w-full h-full border-4 border-indigo-100 rounded-full`}></div>
            <div
              className={`w-full h-full bg-indigo-500/20 rounded-full transition-all duration-1000 flex items-center justify-center
                ${phase === 'Inhale' ? 'scale-100' : phase === 'Exhale' ? 'scale-50' : 'scale-75'}`}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{phase}</p>
                <p className="text-indigo-400 font-mono">{timer}s</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${
                isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isActive ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
            </button>
            <button
              onClick={() => { setIsActive(false); setPhase('Inhale'); setTimer(0); }}
              className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Sound Therapy */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Sound Therapy</h2>
          <p className="text-slate-500">Calming background noises for focus or sleep.</p>
          
          <div className="grid grid-cols-1 gap-3">
            {SOUND_TRACKS.map((track) => (
              <div
                key={track.id}
                onClick={() => setActiveSound(activeSound === track.id ? null : track.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                  ${activeSound === track.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${track.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                    {track.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{track.name}</h4>
                    <p className="text-xs text-slate-400">Continuous Loop</p>
                  </div>
                </div>
                {activeSound === track.id ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-4 bg-indigo-500 animate-pulse"></div>
                    <div className="w-1 h-6 bg-indigo-500 animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-1 h-3 bg-indigo-500 animate-pulse [animation-delay:0.4s]"></div>
                  </div>
                ) : (
                  <Play size={20} className="text-slate-300" />
                )}
              </div>
            ))}
          </div>

          {activeSound && (
            <div className="mt-8 p-4 bg-indigo-600 rounded-2xl text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={24} />
                <span className="font-bold">Now Playing: {SOUND_TRACKS.find(s => s.id === activeSound)?.name}</span>
              </div>
              <button onClick={() => setActiveSound(null)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all">
                <Pause size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Relaxation;
