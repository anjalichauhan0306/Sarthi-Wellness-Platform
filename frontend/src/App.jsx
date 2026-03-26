import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/users/login";
import Register from "./components/users/register";
import { PublicNavbar } from "./components/navbar/publicnav";
import { PrivateNavbar } from "./components/navbar/privatenav";
import HomePage from "./components/home/home";
import ChatWidget from "./components/chatbot/chat";
import AboutPage from "./components/home/about";
import FeaturesPage from "./components/home/features";
import SoulPage from "./components/soul/soul";
import BodySection from "./components/body/body";
import MindSection from "./components/mind/mind";
import UserProfileForm from "./components/dashboard/profile";
import GetCurrentUser from "./customHook/getCurrentUser";
import { useSelector } from "react-redux";
import Activity from "./components/activity/activity";
import GetUserActivity from "./customHook/getUserActivity";
import AdminPanel from "./components/admin/adminPanel";

export const serverURL = "http://localhost:5000";

export default function App() {
  GetCurrentUser();
  GetUserActivity();
  const { userData, authLoading } = useSelector((state) => state.user);
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      {!isAdminPage && (userData ? <PrivateNavbar /> : <PublicNavbar />)}
      {!isAdminPage && <ChatWidget />}

      <Routes>
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!userData ? <Register /> : <Navigate to="/" />}
        />

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        <Route path="/soul" element={<SoulPage />} />
        <Route path="/body" element={<BodySection />} />
        <Route path="/mind" element={<MindSection />} />

        <Route
          path="/dashboard"
          element={userData ? <UserProfileForm /> : <Navigate to="/login" />}
        />

        <Route
          path="/activity"
          element={<Activity/>}
        />

        <Route
          path="/admin"
          element={
            authLoading
              ? <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
              : userData?.isAdmin
              ? <AdminPanel />
              : <Navigate to="/" />
          }
        />
       
      </Routes>
    </>
  );
}