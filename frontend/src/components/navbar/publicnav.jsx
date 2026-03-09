import { Link } from 'react-router-dom'
export function PublicNavbar() {
    return (
        <nav className="w-full bg-white sticky top-0 z-50 shadow-sm border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className=" w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold text-orange-500 tracking-wide">SARTHI</span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex gap-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-orange-500 transition">About</Link>
                    <Link to="/features" className="hover:text-orange-500 transition">Features</Link>
                </div>

                {/* Login Button */}
                <Link to="/login">
                    <button className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    )
}