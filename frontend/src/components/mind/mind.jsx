import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setWellnessData } from "../../redux/wellnessSlice";
import { setActivityData } from '../../redux/activitySlice';
import { logActivityApi } from '../../api/activityapi';
import { getWellness } from '../../api/wellnessapi';

const videos = [
    "https://www.youtube.com/embed/inpok4MKVLM",
    "https://www.youtube.com/embed/ZToicYcHIOU",
    "https://www.youtube.com/embed/1vx8iUvfyCY"
]

export default function MindSection() {
    const [showVideos, setShowVideos] = useState(false)
    const { wellnessData } = useSelector(state => state.wellness);
    const { activityData } = useSelector(state => state.activity);
    const dispatch = useDispatch();
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchMindWellness = useCallback(async () => {
        if (wellnessData?.wellness?.mind) {
            return;
        }
        setLoading(true);
        try {
            const data = await getWellness();
            dispatch(setWellnessData(data));
        } catch (error) {
            console.error("Mind data fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, wellnessData]);

    useEffect(() => {
        fetchMindWellness();
    }, [fetchMindWellness]);

    const mindData = wellnessData?.wellness?.mind;


const logActivity = async () => {
    setIsRead(true);

    try {
      const data = await logActivityApi(
        category.toLowerCase(),
        taskName
      );

      dispatch(setActivityData(data));

      if (data.alreadyDone || data.success) {
        setIsDone(true);
      }

    } catch (error) {
      setIsRead(false);
      console.error("Error logging activity:", error);
      alert(error.response?.data?.error || "Logging failed");
    }
  };


  useEffect(() => {
    if (!activityData) return;

    const doneToday = activityData?.activities?.some(
      act =>
        act.contentId === "Mindful Habit" &&
        act.activityType === "mind"
    );

    if (doneToday) {
      setIsRead(true);
    }

  }, [activityData]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-96">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-4"></div>
            <p className="text-orange-600 font-medium">Finding Clarity...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-14">
            {showVideos ? (
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-orange-500">Meditation Library</h1>
                        <button
                            onClick={() => setShowVideos(false)}
                            className="px-6 py-2 rounded-full bg-orange-100 text-orange-600 font-medium hover:scale-105 transition"
                        >
                            Back
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((link, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-orange-100 shadow-sm">
                                <iframe className="w-full h-64" src={link} title="Meditation video" allowFullScreen />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-12">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold text-orange-500">Mind Clarity</h1>
                            <p className="text-gray-600 mt-2">Gentle care for your thoughts</p>
                        </div>

                        <button
                            onClick={() => setShowVideos(true)}
                            className="px-7 py-3 rounded-full bg-linear-to-r from-orange-400 to-orange-600 text-white font-medium shadow-md hover:scale-105 active:scale-95 transition"
                        >
                            Meditation
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-2 bg-linear-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-10 shadow-sm">
                            <h2 className="text-orange-500 font-semibold">Today's Thought</h2>
                            <p className="mt-6 text-2xl leading-relaxed text-gray-800 italic">“{mindData?.todayThought || "Loading daily wisdom..."}”</p>
                            <button
                                disabled={isRead}
                                onClick={logActivity}
                                className={`w-full mt-4 py-3 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2
                ${isRead
                                        ? "bg-green-500"
                                        : "bg-orange-500 hover:bg-orange-600"
                                    }`}
                            >
                                {isRead ? "Completed ✓" : "Habit Maintained ⚡"}

                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-lg text-orange-100">
                                    +10 Pts
                                </span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-orange-100 rounded-2xl p-6">
                                <h3 className="text-orange-500 font-semibold">Daily Habit</h3>
                                <p className="mt-2 text-gray-700">✨ {mindData?.dailyHabit || "Consistency is key"}</p>
                            </div>

                            <div className="bg-white border border-orange-100 rounded-2xl p-6">
                                <h3 className="text-orange-500 font-semibold">Affirmation</h3>
                                <p className="mt-2 text-gray-700">🌿 {mindData?.affirmation || "I am enough"}</p>
                            </div>
                        </div>

                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8">
                        <h3 className="text-lg font-semibold text-orange-500 mb-4">Today's Gentle Reminders</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                            {mindData?.gentleReminders?.length > 0 ? (
                                mindData.gentleReminders.map((t, i) => (
                                    <div key={i}>🩷 {t}</div>
                                ))
                            ) : (
                                <div>🩷 Be kind to yourself today</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
