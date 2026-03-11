import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiZap, FiActivity, FiClock, FiTrendingUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getActivityStats } from "../../api/activityapi";

export default function Progress() {
  const { userData } = useSelector((state) => state.user);
  const { activityData } = useSelector((state) => state.activity);
  console.log(activityData);
  console.log(userData);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await getActivityStats();
        const chartData = (res || []).map((item) => ({
          name: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          score: item.score,
        }));
        setWeeklyData(chartData);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeekly();
  }, []);

  let rankLabel = "Beginner";

  if (userData?.totalPoints > 1000) {
    rankLabel = "Expert";
  } else if (userData?.totalPoints > 500) {
    rankLabel = "Advanced";
  } else if (userData?.totalPoints > 200) {
    rankLabel = "Intermediate";
  }


  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
                <FiZap size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  Current Streak
                </p>
                <h3 className="text-3xl font-black text-gray-800">
                  {userData?.streak} Days
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                <FiActivity size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  Total Points
                </p>
                <h3 className="text-3xl font-black text-gray-800">
                  {userData?.totalPoints || 12}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  Global Rank
                </p>
                <h3 className="text-3xl font-black text-gray-800">{rankLabel}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Consistency Curve
              </h3>
              <span className="bg-gray-50 border-none text-sm font-bold rounded-lg px-2 py-1 outline-none">
                Last 7 Days
              </span>
            </div>
            <div className="h-64 w-full">
              {weeklyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "15px",
                        border: "none",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#f97316"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-12">Your progress chart will appear here once you log activities.</p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-lg font-bold mb-6">User Details</h3>

            {userData ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-400">Username</span>
                  <span className="font-bold text-orange-400">{userData.username || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-400">Goal</span>
                  <span className="font-bold text-orange-400">{userData.goal || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-400">Activity Level</span>
                  <span className="font-bold text-orange-400">{userData.activityLevel || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-400">Streak</span>
                  <span className="font-bold text-orange-400">{userData.streak || 0} Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-400">Total Points</span>
                  <span className="font-bold text-orange-400">{userData.totalPoints || 0}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-6">
                User details will appear here once loaded.
              </p>
            )}
          </div>
        </div>

        {/* 3. RECENT ACTIVITY TIMELINE */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <FiClock className="text-orange-500" /> Recent Activity Log
          </h3>
          <div className="space-y-6">
            {activityData?.activities?.length > 0 ? (
              activityData?.activities?.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-gray-400 w-16">
                      {new Date(act.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"></div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition">
                        {act.contentId}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {act.activityType}
                      </p>
                    </div>
                  </div>
                  <span className="text-orange-600 font-black bg-orange-50 px-3 py-1 rounded-lg text-sm">
                    +{act.points}
                  </span>
                </div>
              ))) : (
              <p className="text-gray-400 text-center py-6">No activities done yet. Start today to see your progress!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
