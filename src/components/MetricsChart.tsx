import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const dataInit = [
  { time: '00:00', trust: 99.8, efficiency: 65 },
  { time: '04:00', trust: 99.9, efficiency: 70 },
  { time: '08:00', trust: 99.9, efficiency: 78 },
  { time: '12:00', trust: 99.8, efficiency: 86 },
  { time: '16:00', trust: 99.9, efficiency: 88 },
  { time: '20:00', trust: 99.9, efficiency: 92 },
  { time: '24:00', trust: 99.9, efficiency: 95 },
];

export function MetricsChart() {
  const [data, setData] = useState(dataInit);

  // Optional: subtle animation or live data feel
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        // small random fluctuation on the latest data point
        const lastIdx = newData.length - 1;
        const currentTrust = newData[lastIdx].trust;
        const currentEff = newData[lastIdx].efficiency;
        
        newData[lastIdx] = {
          ...newData[lastIdx],
          trust: Math.min(99.99, Math.max(99.5, currentTrust + (Math.random() * 0.1 - 0.05))),
          efficiency: Math.min(100, Math.max(90, currentEff + (Math.random() * 2 - 1)))
        };
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-96 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">System Trust Score & Continuous Care Efficiency</h3>
        <p className="text-sm text-slate-500">Real-time performance metrics across active edge fleets.</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis yAxisId="left" domain={[99, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
            <Area 
              yAxisId="left"
              type="monotone" 
              name="System Trust Score (%)"
              dataKey="trust" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTrust)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              name="Care Efficiency (%)"
              dataKey="efficiency" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEff)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
