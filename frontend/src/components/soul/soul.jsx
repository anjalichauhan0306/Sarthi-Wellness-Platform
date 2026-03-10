import { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setShlokData } from "../../redux/shlokSlice";
import { useState } from "react";
import { serverURL } from "../../App";
import { setActivityData } from "../../redux/activitySlice";

export default function SoulPage() {
    const { shlokData } = useSelector(state => state.shlok)
    const { activityData } = useSelector(state => state.activity);

    const [isRead, setIsRead] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const isDone = activityData?.activities?.some(
        act => act.activityType === "soul" && act.contentId === "Daily Shlok"
    );

    const fetchDailyShlok = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${serverURL}/api/soul/today`, {
                withCredentials: true
            });
            dispatch(setShlokData(response.data));
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyShlok();
    }, [dispatch]);

    const logActivity = async (taskName, category = "soul") => {
        setIsRead(true);

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
                setIsRead(true);
            } else if (response.data.success) {
                setIsRead(true);
            }

        } catch (error) {
            setIsRead(false)
            console.error("Error logging activity:", error);
            alert(error.response?.data?.error || "Logging failed");
        }
    };

    useEffect(() => {
        if (!activityData) return;

        const doneToday = activityData?.activities?.some(
            (act) =>
                act.contentId === "Daily Shlok" &&
                act.activityType === "soul"
        );

        if (doneToday) {
            setIsRead(true);
        }
    }, [activityData]);

    if (!shlokData) {
        return <div className="text-center py-20">Something went wrong. Please try again later.</div>;
    }

    return (
        <>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Top Action Bar */}
                <div className="max-w-5xl mx-auto px-6 pt-6 flex justify-end">
                    {!isRead ? (
                        <button
                            onClick={() => logActivity("Daily Shlok", "soul")}
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all shadow-sm active:scale-95"
                        >
                            Mark as Read
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-orange-700 bg-orange-100 px-4 py-2 rounded-lg border border-orange-200 text-sm font-bold shadow-inner">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            Wisdom Internalized
                        </div>
                    )}
                </div>
                {" "}
                <img
                    src="https://www.shutterstock.com/image-photo/create-illustration-grand-epic-scene-260nw-2670904579.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-27 pointer-events-none"
                />{" "}
                <div className="text-center mb-12 animate-fade">
                    {" "}
                    <h1 className="text-4xl font-bold text-orange-500">Soul Wisdom</h1>{" "}
                    <p className="text-gray-500 mt-2">
                        Daily teachings for inner clarity & peace
                    </p>{" "}
                </div>{" "}
                <div className="bg-white p-10 rounded-3xl shadow-md border border-orange-100 text-center relative overflow-hidden animate-fade">
                    {" "}
                    <div className="absolute inset-0 opacity-5 text-9xl flex items-center justify-center select-none">
                        ॐ
                    </div>{" "}
                    <h2 className="text-lg text-gray-500 mb-4">Today’s Shlok</h2>{" "}
                    <p className=" text-2xl text-orange-800 font-medium leading-relaxed">
                        {shlokData.shlok}
                    </p>{" "}
                </div>{" "}
                {" "}
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    {" "}
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition">
                        {" "}
                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                            Meaning
                        </h3>{" "}
                        <p className="text-gray-700 leading-relaxed">
                            {shlokData.meaning}
                        </p>{" "}
                    </div>{" "}
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition">
                        {" "}
                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                            Story
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {shlokData.story}
                        </p>{" "}
                    </div>{" "}
                </div>{" "}
                <div className="mt-25 bg-linear-to-r from-orange-100 to-orange-50 p-8 rounded-2xl border border-orange-200 text-center hover:scale-[1.01] transition">

                    <h3 className="text-xl font-semibold text-orange-600">
                        Life Lesson
                    </h3>
                    <p className="mt-3 text-gray-800 text-lg">
                        {shlokData.lifeLesson}
                    </p>
                </div>
            </div>
            {/* <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
                bg-gradient-to-r from-orange-100 to-orange-50 
                border-y border-orange-200 py-14  text-center -mt-8">
                <h3 className="text-2xl font-semibold text-orange-600">
                    Life Lesson
                </h3>
                <p className="mt-4 text-gray-800 text-lg max-w-4xl mx-auto px-6 leading-relaxed">
                    {shlokData.lifeLesson}
                </p>
            </div> */}

        </>
    );
}
