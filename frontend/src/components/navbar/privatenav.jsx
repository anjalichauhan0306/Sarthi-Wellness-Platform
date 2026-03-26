import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { serverURL } from '../../App';
import { setUserData } from '../../redux/userSlice';

export function PrivateNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    const initial = userData?.username ? userData.username.charAt(0).toUpperCase() : 'U';

    const linkStyle = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition ${isActive ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`

    useEffect(() => {
        const closeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    const logout = async () => {
        try {
            await axios.post(serverURL + "/api/user/logout", { withCredentials: true });
            dispatch(setUserData(null));
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="w-full bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/dashboard" className="flex items-center gap-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-10 h-10 rounded-full object-contain" />
                    <span className="text-xl font-bold text-orange-500 tracking-wide">SARTHI</span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    <NavLink to="/" className={linkStyle}>Home</NavLink>
                    <NavLink to="/mind" className={linkStyle}>Mind</NavLink>
                    <NavLink to="/body" className={linkStyle}>Body</NavLink>
                    <NavLink to="/soul" className={linkStyle}>Soul</NavLink>
                </div>

                <div className="flex items-center gap-4" ref={dropdownRef}>

                    {/* Professional Streak Badge */}
                    {userData?.streak > 0 && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full shadow-sm">
                            <span className="text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M12 21.35s-7-3.3-7-10c0-4.7 3.5-7.7 7-9.35 3.5 1.65 7 4.65 7 9.35 0 6.7-7 10-7 10z" />
                                </svg>
                            </span>
                            <span className="text-[11px] font-black text-orange-700 uppercase tracking-wider">
                                {userData.streak} Day {userData.streak === 1 ? 'Streak' : 'Streaks'}
                            </span>
                        </div>
                    )}

                    {/* Profile Avatar & Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg transition-all active:scale-95 overflow-hidden"
                        >
                            {initial}
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-3">
                                <div className="px-4 py-3 border-b border-gray-50 bg-orange-50/30">
                                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Signed in as</p>
                                    <p className="text-sm font-bold text-gray-800 truncate">{userData?.username}</p>
                                    <div className="md:hidden mt-2 flex items-center gap-1 text-orange-600 font-bold text-xs">
                                        🔥 {userData.streak} Days Streak
                                    </div>
                                </div>

                                <Link to="/activity" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                    My Progress 📈
                                </Link>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                    Profile Settings ⚙️
                                </Link>

                                {userData?.isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        Admin Panel 🛠️
                                    </Link>
                                )}

                                <div className="border-t border-gray-100 mt-1 pt-1">
                                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-semibold">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}