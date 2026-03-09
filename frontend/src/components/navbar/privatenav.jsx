// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { serverURL } from '../../App';
// import { setUserData } from '../../redux/userSlice';

// export function PrivateNavbar() {
//     const linkStyle = ({ isActive }) =>
//         `px-3 py-2 rounded-lg transition ${isActive ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`

//     const navigate = useNavigate()
//     const { userData } = useSelector(state => state.user);
//     const dispatch = useDispatch()

//     const logout = async () => {
//         try {
//             const result = await axios.post(serverURL + "/api/user/logout", { withCredentials: true })
//             dispatch(setUserData(null));
//             navigate("/");
//             console.log(result.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     return (
//         <nav className="w-full bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//                 {/* Logo */}
//                 <Link to="/" className="flex items-center gap-3">
//                     <div className=" w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">

//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-full h-full object-contain" />
//                     </div>
//                     <span className="text-xl font-bold text-orange-500 tracking-wide">SARTHI</span>
//                 </Link>

//                 {/* Center Links */}
//                 <div className="hidden md:flex items-center gap-2">
//                     <NavLink to="/dashboard" className={linkStyle}>Home</NavLink>
//                     <NavLink to="/mind" className={linkStyle}>Mind</NavLink>
//                     <NavLink to="/body" className={linkStyle}>Body</NavLink>
//                     <NavLink to="/soul" className={linkStyle}>Soul</NavLink>
//                 </div>

//                 {/* Logout */}
//                 {/* Profile Dropdown logic */}
//                 <div className="relative group">
//                     <button className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden">
//                         <img src={userData?.profilePic} alt="P" />
//                     </button>

//                     {/* Hover ya Click par ye dikhao */}
//                     <div className="absolute right-0 w-48 bg-white shadow-xl rounded-lg border py-2">
//                         <Link to="/progress" className="block px-4 py-2 hover:bg-orange-50">My Progress 📈</Link>
//                         <Link to="/profile" className="block px-4 py-2 hover:bg-orange-50">Profile Settings ⚙️</Link>
//                         <button onClick={logout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50">Logout</button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

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

    // Naam ka pehla letter nikalne ke liye
    const initial = userData?.name ? userData.name.charAt(0).toUpperCase() : 'U';

    const linkStyle = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition ${isActive ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`

    // Baahar click karne par dropdown band karne ka logic
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
                
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-10 h-10 rounded-full object-contain" />
                    <span className="text-xl font-bold text-orange-500 tracking-wide">SARTHI</span>
                </Link>

                {/* Center Links (Clean: Only 4) */}
                <div className="hidden md:flex items-center gap-2">
                    <NavLink to="/" className={linkStyle}>Home</NavLink>
                    <NavLink to="/mind" className={linkStyle}>Mind</NavLink>
                    <NavLink to="/body" className={linkStyle}>Body</NavLink>
                    <NavLink to="/soul" className={linkStyle}>Soul</NavLink>
                </div>

                {/* Profile Section */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center border-2 border-orange-200 hover:bg-orange-600 transition-all active:scale-90"
                    >
                        {initial}
                    </button>

                    {/* Dropdown Menu - Sirf isOpen true hone par dikhega */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-xl border border-orange-50 py-2 z-[100] animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                <p className="text-[10px] text-orange-400 font-bold uppercase">Welcome</p>
                                <p className="text-sm font-semibold text-gray-700 truncate">{userData?.name}</p>
                            </div>
                            
                            <Link to="/activity" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                                My Progress 📈
                            </Link>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                                Profile Settings ⚙️
                            </Link>
                            
                            <div className="border-t border-gray-50 mt-1">
                                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}