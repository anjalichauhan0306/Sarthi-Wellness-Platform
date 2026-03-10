import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../../App";
import { setWellnessData } from "../../redux/wellnessSlice";
import { useEffect, useState, useCallback } from "react";
import { setActivityData } from "../../redux/activitySlice";

export default function BodySection() {
    const { userData } = useSelector(state => state.user);
    const { wellnessData } = useSelector(state => state.wellness);
    const dispatch = useDispatch();
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const cleanURL = serverURL.endsWith('/') ? serverURL.slice(0, -1) : serverURL;
    const [isCompleting, setIsCompleting] = useState(false);
    const { activityData } = useSelector(state => state.activity);

    const bodyData = wellnessData?.wellness?.body || {
        waterIntake: loading ? "Calculating..." : "No data",
        breakfast: loading ? "Generating..." : "No data",
        lunch: loading ? "Generating..." : "No data",
        dinner: loading ? "Generating..." : "No data",
        healthyChoice: loading ? "Selecting..." : "No data"
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

    const logActivity = async (taskName, category = "body") => {
        setIsCompleting(true);

        try {
            const response = await axios.post(
                serverURL + `/api/activity/log`,
                {
                    activityType: category.toLowerCase(),
                    contentId: taskName,
                },
                { withCredentials: true }
            );

            dispatch(setActivityData(response.data));

            if (response.data.alreadyDone) {
                setIsDone(true);
            } else if (response.data.success) {
                setIsDone(true);
            }

        } catch (error) {
            console.error("Error logging activity:", error);
            alert(error.response?.data?.error || "Logging failed");
        } finally {
            setIsCompleting(false);
        }
    };
    useEffect(() => {
        if (!activityData) return;

        const doneToday = activityData?.activities?.some(
            (act) =>
                act.contentId === "Healthy Choice" &&
                act.activityType === "body"
        );

        if (doneToday) {
            setIsDone(true);
        }
    }, [activityData]);

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
                <div className="mt-10 bg-linear-to-br from-green-50 to-white border border-green-100 p-10 rounded-[2.5rem] text-center shadow-sm">
                    <h3 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-4">Today’s Healthy Choice</h3>

                    <p className="text-xl md:text-2xl text-gray-800 font-semibold italic leading-relaxed mb-8">
                        "{bodyData.healthyChoice}"
                    </p>

                    <button
                        onClick={() => logActivity("Healthy Choice", "Body")}
                        disabled={isCompleting || isDone}
                        className={`mx-auto flex items-center gap-3 px-10 py-4 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all 
    ${isDone ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 shadow-green-200"}`}
                    >
                        {isCompleting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span className="text-xl">{isDone ? "✅" : "💪"}</span>
                        )}

                        <span>
                            {isCompleting ? "Logging..." : isDone ? "Done" : "I Chose Health"}
                        </span>

                        {!isDone && (
                            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-lg text-xs">+10 Pts</span>
                        )}
                    </button>
                    <p className="mt-4 text-xs text-green-600/60 font-medium">Click after you complete your healthy choice for today</p>
                </div>
            </div>
        </div>
    );
}