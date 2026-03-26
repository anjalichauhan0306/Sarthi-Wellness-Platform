import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { setUserData } from "../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../api/userapi.js";

const schema = Yup.object({
    username: Yup.string().required("Username required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    age: Yup.number().min(10).max(100).required("Age required"),
    gender: Yup.string().required("Select gender"),
    height: Yup.number().min(80).max(250).required("Height required"),
    weight: Yup.number().min(25).max(250).required("Weight required"),
    nutritionGoal: Yup.string().required("Select goal"),
    mindGoals: Yup.array().min(1, "Select at least one"),
    targetWeight: Yup.number().min(25).max(250).required("Target weight required"),
    sleepHours: Yup.number().required(),
    activityLevel: Yup.string().required("Activity level is required"),
});

export default function UserProfileForm() {

    const [savedProfile, setSavedProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(true);
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const input =
        "w-full px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed";
    const chip =
        "px-4 py-2 rounded-full border border-orange-200 cursor-pointer hover:bg-orange-100";
    const chipActive =
        "px-4 py-2 rounded-full bg-orange-500 text-white cursor-pointer";

    const handleSubmit = async (values) => {
        try {

            const mentalState = {
                overthinking: values.mindGoals.includes("Overthinking"),
                anxiety: values.mindGoals.includes("Anxiety"),
                loneliness: values.mindGoals.includes("Loneliness"),
                lowConfidence: values.mindGoals.includes("Low Confidence"),
                focusProblems: values.mindGoals.includes("Focus Problems"),
                fearOfFailure: values.mindGoals.includes("Fear of Failure"),
            };

            const goalMap = {
                "Weight Loss": "weight_loss",
                "Weight Gain": "weight_gain",
                "Maintain": "maintain",
            };

            const activityMap = {
                Sedentary: "low",
                Moderate: "moderate",
                Active: "high",
            };


            const payload = {
                username: values.username,
                email: values.email,
                age: Number(values.age),
                gender: values.gender?.toLowerCase(),
                height: Number(values.height),
                weight: Number(values.weight),
                targetWeight: Number(values.targetWeight),
                activityLevel: activityMap[values.activityLevel],
                goal: goalMap[values.nutritionGoal],
                foodType: values.foodType?.toLowerCase(),

                moodLevel: Number(values.mood),

                mentalState,

                lifestyle: {
                    sleepHours: Number(values.sleepHours),
                    screenTimeHours: Number(values.screenTime),
                    exercise: values.exercise?.toLowerCase(),
                    workType: values.workType?.toLowerCase(),
                },
            };
            console.log("Form values:", values);
            const data = await updateUserProfile(payload);
            dispatch(setUserData(data));
            setSavedProfile(data);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
        }
    };
    return (
        <Formik
            enableReinitialize
            initialValues={
                savedProfile || {
                    username: userData?.username || "",
                    email: userData?.email || "",
                    age: userData?.age ?? "",
                    gender: userData?.gender || "",
                    height: userData?.height ?? "",
                    weight: userData?.weight ?? "",
                    targetWeight: userData?.targetWeight ?? "",

                    activityLevel:
                        userData?.activityLevel === "low"
                            ? "Sedentary"
                            : userData?.activityLevel === "moderate"
                                ? "Moderate"
                                : userData?.activityLevel === "high"
                                    ? "Active"
                                    : "",

                    nutritionGoal:
                        userData?.goal === "weight_loss"
                            ? "Weight Loss"
                            : userData?.goal === "weight_gain"
                                ? "Weight Gain"
                                : userData?.goal === "maintain"
                                    ? "Maintain"
                                    : "",

                    foodType: userData?.foodType || "",

                    mindGoals: userData?.mentalState
                        ? [
                            userData.mentalState.overthinking ? "Overthinking" : null,
                            userData.mentalState.anxiety ? "Anxiety" : null,
                            userData.mentalState.stress ? "Focus Problems" : null,
                            userData.mentalState.lowMood ? "Low Confidence" : null,
                        ].filter(Boolean)
                        : [],

                    mood: userData?.moodLevel ?? 5,
                    sleepHours: userData?.lifestyle?.sleepHours ?? 7,
                    screenTime: userData?.lifestyle?.screenTimeHours ?? 4,

                    exercise:
                        userData?.lifestyle?.exercise || "",

                    workType: userData?.lifestyle?.workType || "",
                }
            }
            validationSchema={schema}
            onSubmit={(values) => handleSubmit(values)}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
            }) => (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-5xl mx-auto p-8 space-y-12"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-orange-500">
                            Your Wellness Profile
                        </h1>
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 rounded-full bg-orange-100 text-orange-600 font-medium"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    <section className="bg-white rounded-3xl p-7 shadow-md space-y-5">
                        <h2 className="text-xl font-semibold text-orange-500">
                            👤 Basic Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="username"
                                disabled={!isEditing}
                                value={values.username}
                                placeholder="Username"
                                className={input}
                                onChange={handleChange}
                            />
                            <input
                                name="email"
                                disabled={!isEditing}
                                value={values.email}
                                placeholder="Email"
                                className={input}
                                onChange={handleChange}
                            />
                            <input
                                name="age"
                                disabled={!isEditing}
                                type="number"
                                value={values.age}
                                placeholder="Age"
                                className={input}
                                onChange={handleChange}
                            />
                            <select
                                name="gender"
                                disabled={!isEditing}
                                value={values.gender}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </section>

                    <section className="bg-orange-50 rounded-3xl p-7 space-y-5">
                        <h2 className="text-xl font-semibold text-orange-500">
                            🧍 Body Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="height"
                                disabled={!isEditing}
                                type="number"
                                value={values.height}
                                placeholder="Height (cm)"
                                className={input}
                                onChange={handleChange}
                            />
                            <input
                                name="weight"
                                disabled={!isEditing}
                                type="number"
                                value={values.weight}
                                placeholder="Weight (kg)"
                                className={input}
                                onChange={handleChange}
                            />
                            <input
                                name="targetWeight"
                                disabled={!isEditing}
                                type="number"
                                value={values.targetWeight}
                                placeholder="Target Weight"
                                className={input}
                                onChange={handleChange}
                            />
                            <select
                                name="activityLevel"
                                disabled={!isEditing}
                                value={values.activityLevel}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Activity Level</option>
                                <option>Sedentary</option>
                                <option>Moderate</option>
                                <option>Active</option>
                            </select>
                        </div>
                    </section>

                    {/* NUTRITION */}
                    <section className="bg-white rounded-3xl p-7 shadow-md space-y-5">
                        <h2 className="text-xl font-semibold text-orange-500">
                            🍎 Nutrition Goals
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select
                                name="nutritionGoal"
                                disabled={!isEditing}
                                value={values.nutritionGoal}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Goal</option>
                                <option>Weight Loss</option>
                                <option>Weight Gain</option>
                                <option>Maintain</option>
                            </select>
                            <select
                                name="foodType"
                                disabled={!isEditing}
                                value={values.foodType}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Food Type</option>
                                <option value="veg">Veg</option>
                                <option value="non_veg">Non-Veg</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </div>
                    </section>

                    {/* MIND */}
                    <section className="bg-orange-50 rounded-3xl p-7 space-y-6">
                        <h2 className="text-xl font-semibold text-orange-500">
                            🧠 Mind Wellness
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {["Overthinking", "Anxiety", "Loneliness", "Low Confidence", "Focus Problems", "Fear of Failure"].map((g) => (
                                <div
                                    key={g}
                                    className={values.mindGoals?.includes(g) ? chipActive : chip}
                                    onClick={() =>
                                        isEditing &&
                                        setFieldValue(
                                            "mindGoals",
                                            values.mindGoals?.includes(g)
                                                ? values.mindGoals.filter((x) => x !== g)
                                                : [...(values.mindGoals || []), g]
                                        )
                                    }
                                >
                                    {g}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">
                                Mood Level: {values.mood}/10
                            </p>
                            <input
                                disabled={!isEditing}
                                type="range"
                                min="1"
                                max="10"
                                value={values.mood ?? 5}
                                onChange={(e) => setFieldValue("mood", e.target.value)}
                                className="w-full accent-orange-500"
                            />
                        </div>
                    </section>

                    {/* LIFESTYLE */}
                    <section className="bg-white rounded-3xl p-7 shadow-md space-y-6">
                        <h2 className="text-xl font-semibold text-orange-500">
                            🌙 Lifestyle
                        </h2>
                        <div>
                            <p className="text-sm text-gray-600">
                                Average Sleep: {values.sleepHours} hrs
                            </p>
                            <input
                                disabled={!isEditing}
                                type="range"
                                min="3"
                                max="12"
                                step="0.5"
                                value={values.sleepHours ?? 7}
                                onChange={(e) => setFieldValue("sleepHours", e.target.value)}
                                className="w-full accent-orange-500"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">
                                Screen Time: {values.screenTime} hrs/day
                            </p>
                            <input
                                disabled={!isEditing}
                                type="range"
                                min="0"
                                max="16"
                                step="0.5"
                                value={values.screenTime ?? 4}
                                onChange={(e) => setFieldValue("screenTime", e.target.value)}
                                className="w-full accent-orange-500"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select
                                name="exercise"
                                disabled={!isEditing}
                                value={values.exercise || ""}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Exercise Frequency</option>
                                <option value="Never">Never</option>
                                <option value="1-2 / week">1-2 / week</option>
                                <option value="3-5 / week">3-5 / week</option>
                                <option value="Daily">Daily</option>
                            </select>
                            <select
                                name="workType"
                                disabled={!isEditing}
                                value={values.workType || ""}
                                className={input}
                                onChange={handleChange}
                            >
                                <option value="">Work Type</option>
                                <option>Student</option>
                                <option>Working</option>
                                <option>Business</option>
                            </select>
                        </div>
                    </section>

                    {isEditing && (
                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-orange-500 text-white rounded-full font-medium hover:scale-105 transition"
                            >
                                Save Profile
                            </button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
}
