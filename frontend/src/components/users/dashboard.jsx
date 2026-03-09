import React from 'react';
import { useSelector } from 'react-redux';
import { Target, Zap , Award , TrendingUp } from 'lucide-react';

export default function Dashboardw() {
    const { userData } = useSelector(state => state.user);

    // Ye data baad mein backend se fetch karna
    const stats = {
        streak: 5,        // Dino ki streak
        points: 1250,     // Total points
        level: "Warrior", // User rank
        todayTasks: 4,    // Tasks completed today
        totalTasks: 6     // Total daily goals
    };

    return (
        <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                
                {/* 1. Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Ram Ram, {userData?.name || "Sarthi"}! 🙏
                    </h1>
                    <p className="text-gray-500 mt-1">Aaj ka din khatarnak banane ke liye taiyaar?</p>
                </div>

                {/* 2. Quick Stats Row (The Main Game) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    
                    {/* Streak Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Streak</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.streak} Days</h3>
                        </div>
                    </div>

                    {/* Points Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Sarthi Points</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.points}</h3>
                        </div>
                    </div>

                    {/* Quick Progress Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Target size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Daily Goal</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.todayTasks}/{stats.totalTasks}</h3>
                        </div>
                    </div>

                    {/* Rank Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Rank</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.level}</h3>
                        </div>
                    </div>
                </div>

                {/* 3. Main Action Sections (Mind, Body, Soul) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mind Section Card */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-3xl text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Mind Zone 🧠</h3>
                        <p className="text-orange-100 text-sm mb-4">Focus and Clarity starts here.</p>
                        <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm">Start Meditating</button>
                    </div>

                    {/* Body Section Card */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Body Activity 🏃‍♂️</h3>
                        <p className="text-gray-500 text-sm mb-4">Push your limits today.</p>
                        <div className="w-full bg-gray-100 h-2 rounded-full">
                            <div className="bg-orange-500 h-2 rounded-full w-[60%]"></div>
                        </div>
                    </div>

                    {/* Soul Section Card */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Soul Peace ✨</h3>
                        <p className="text-gray-500 text-sm mb-4">Connect with your inner self.</p>
                        <button className="text-orange-500 font-bold text-sm">Open Journal →</button>
                    </div>
                </div>

            </div>
        </div>
    );
}