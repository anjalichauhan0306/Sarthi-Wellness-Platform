import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../../App";
import { setWellnessData } from "../../redux/wellnessSlice";
import { useEffect, useState, useCallback } from "react";

export default function BodySection() {
    const { userData } = useSelector(state => state.user);
    const { wellnessData } = useSelector(state => state.wellness);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cleanURL = serverURL.endsWith('/') ? serverURL.slice(0, -1) : serverURL;

    const bodyData = wellnessData?.wellness?.body || {
        waterIntake: loading ? "Calculating..." : "No data",
        breakfast: loading ? "Generating..." : "No data",
        lunch: loading ? "Generating..." : "No data",
        dinner: loading ? "Generating..." : "No data",
        healthyChoice: loading ? "Selecting..." : "No data"
    };

    const [isCompleting, setIsCompleting] = useState(false);
const [completed, setCompleted] = useState(wellnessData?.wellness?.body?.completed || false);
const markBodyDone = async () => {
    setIsCompleting(true);
    try {
        // Your API call here...
        setCompleted(true);
    } catch (e) {
        console.log("Error", e);
    } finally {
        setIsCompleting(false);
    }
};
    const calculateStats = () => {
        if (!userData?.weight || !userData?.height) return null;
        const heightInMeters = userData.height / 100;
        const bmi = (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);

        let status = "Healthy";
        let color = "text-green-500";
        if (bmi < 18.5) { status = "Underweight"; color = "text-yellow-500"; }
        else if (bmi >= 25) { status = "Overweight"; color = "text-red-500"; }

        return { bmi, status, color };
    };

    const fetchOrGenerateWellness = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${cleanURL}/api/wellness/get-wellness`, { withCredentials: true });
            dispatch(setWellnessData(res.data));
        } catch (error) {
            if (error.response?.status === 404) {
                try {
                    const genRes = await axios.post(`${cleanURL}/api/wellness/generate-wellness`, {}, { withCredentials: true });
                    dispatch(setWellnessData(genRes.data));
                } catch (genErr) {
                    console.error("Auto-generation failed", genErr);
                }
            } else {
                console.error("Fetch Error:", error);
            }
        } finally {
            setLoading(false);
        }
    }, [cleanURL, wellnessData, dispatch]);

    useEffect(() => {
        if (!wellnessData) {
            fetchOrGenerateWellness();
        }
    }, [wellnessData, fetchOrGenerateWellness]);

    const stats = calculateStats();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-12 animate-fade">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-5xl ">
                    {loading ? "⌛" : "🥗"}
                </div>
                <h1 className="text-4xl font-bold text-orange-500">Body Balance</h1>
                <p className="text-gray-600 mt-2">
                    {loading ? "AI is crafting your personalized plan..." : "Simple daily nutrition for steady energy"}
                </p>
            </div>

            {stats && (
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white border-2 border-orange-50 p-6 rounded-3xl shadow-sm text-center">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Your BMI</p>
                        <h2 className={`text-4xl font-black mt-1 ${stats.color}`}>{stats.bmi}</h2>
                        <p className={`text-sm font-medium ${stats.color}`}>{stats.status}</p>
                    </div>
                    <div className="bg-white border-2 border-orange-50 p-6 rounded-3xl shadow-sm text-center">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Daily Goal</p>
                        <h2 className="text-4xl font-black mt-1 text-orange-500">
                            {userData?.goal === 'weight_loss' ? 'Deficit' : userData?.goal === 'weight_gain' ? 'Surplus' : 'Maintain'}
                        </h2>
                        <p className="text-sm font-medium text-orange-400">Target: {userData?.targetWeight} kg</p>
                    </div>
                </div>
            )}

            <div className={`transition-opacity duration-500 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">💧 Water Intake</h3>
                    <p className="text-gray-700 font-medium">{bodyData.waterIntake}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                        <div key={meal} className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold text-orange-500">{meal}</h3>
                            <p className="mt-2 text-gray-700">{bodyData[meal.toLowerCase()]}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 bg-green-50 border border-green-100 p-8 rounded-2xl text-center">
                    <h3 className="text-xl font-semibold text-green-600">Today’s Healthy Choice</h3>
                    <p className="mt-3 text-gray-800 text-lg font-medium italic">"{bodyData.healthyChoice}"</p>
                </div>
            </div>
            {/* Fixed Action Container - This keeps everything organized */}
            {/* Mark as Done - Floating above the Global Chat Button */}
{!completed && (
    <div className="fixed bottom-28 right-6 z-[90] animate-in slide-in-from-bottom-5 duration-500">
        <button
            onClick={markBodyDone}
            disabled={isCompleting}
            className="group relative flex items-center gap-4 bg-[#1a1c1e] hover:bg-black text-white pl-5 pr-2 py-2 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-300 active:scale-95"
        >
            <div className="flex flex-col items-start">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-0.5">
                    Daily Goal
                </span>
                <span className="text-xs font-bold tracking-tight">
                    {isCompleting ? "Processing..." : "Mark as Done"}
                </span>
            </div>

            <div className="bg-white/5 px-3 py-2 rounded-xl flex items-center gap-2 group-hover:bg-orange-600 transition-colors border border-white/5">
                {isCompleting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span className="text-sm">⚡</span>
                        <span className="text-[11px] font-black">+10 XP</span>
                    </>
                )}
            </div>
            
            {/* Subtle Pulse Effect */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
        </button>
    </div>
)}

{/* Subtle Achievement Pill */}
{completed && (
    <div className="fixed bottom-28 right-6 z-[90] animate-in zoom-in duration-300">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
            <span className="text-[10px] font-black uppercase">Goal Achieved</span>
            <span className="bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</span>
        </div>
    </div>
)}
        </div>
    );
}