import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiZap, FiActivity, FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

export default function Progress() {
    // Area Chart Data (Growth curve dikhane ke liye)
    const growthData = [
        { name: 'Mon', score: 200 }, { name: 'Tue', score: 450 }, { name: 'Wed', score: 300 },
        { name: 'Thu', score: 800 }, { name: 'Fri', score: 600 }, { name: 'Sat', score: 950 }, { name: 'Sun', score: 1100 },
    ];

    // Activity Log
    const activities = [
        { time: '06:00 AM', task: 'Morning Meditation', cat: 'Mind', pts: '+50' },
        { time: '08:30 AM', task: 'High Intensity Workout', cat: 'Body', pts: '+120' },
        { time: '11:00 AM', task: 'Gratitude Journaling', cat: 'Soul', pts: '+30' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-12">
            <div className="max-w-6xl mx-auto px-6 py-10">
                
                {/* 1. THE POWER STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl"><FiZap size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Current Streak</p>
                                <h3 className="text-3xl font-black text-gray-800">12 Days</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl"><FiActivity size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Total Points</p>
                                <h3 className="text-3xl font-black text-gray-800">14,250</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-green-100 text-green-600 rounded-2xl"><FiTrendingUp size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Global Rank</p>
                                <h3 className="text-3xl font-black text-gray-800">#142</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PROGRESS GRAPH & ACTIVITY HEATMAP */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    
                    {/* Growth Area Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Consistency Curve</h3>
                            <select className="bg-gray-50 border-none text-sm font-bold rounded-lg px-2 py-1 outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" hide />
                                    <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)'}} />
                                    <Area type="monotone" dataKey="score" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Breakdown Circulars */}
                    <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                        <h3 className="text-lg font-bold mb-6">Efficiency</h3>
                        <div className="space-y-6">
                            {[{l: 'Mind', p: 85}, {l: 'Body', p: 60}, {l: 'Soul', p: 45}].map(item => (
                                <div key={item.l}>
                                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-gray-400">
                                        <span>{item.l}</span>
                                        <span>{item.p}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full">
                                        <div className="bg-orange-500 h-full rounded-full" style={{width: `${item.p}%`}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Weekly Average</p>
                            <h4 className="text-2xl font-bold">740 <span className="text-sm font-normal text-orange-400">pts/day</span></h4>
                        </div>
                    </div>
                </div>

                {/* 3. RECENT ACTIVITY TIMELINE */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <FiClock className="text-orange-500" /> Recent Activity Log
                    </h3>
                    <div className="space-y-6">
                        {activities.map((act, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group">
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-bold text-gray-400 w-16">{act.time}</span>
                                    <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition">{act.task}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{act.cat}</p>
                                    </div>
                                </div>
                                <span className="text-orange-600 font-black bg-orange-50 px-3 py-1 rounded-lg text-sm">{act.pts}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}