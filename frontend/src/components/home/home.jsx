import { Link } from 'react-router-dom';
import { Leaf, Moon, Sun, BookOpen, Activity } from 'lucide-react'; // Install lucide-react for icons
import Footer from './footer';
import progress from '../../assets/progress.png'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#fffdfa] text-gray-800 font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4 tracking-wide uppercase">
                        Your Spiritual Companion
                    </span>
                    <h1 className="text-6xl font-extrabold leading-[1.1] text-slate-900">
                        Align Your <span className="text-orange-500">Mind</span><br />
                        Nourish Your <span className="text-orange-500">Body</span><br />
                        Awaken Your <span className="text-orange-500">Soul</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
                        <span className='text-orange-600 font-bold'>SARTHI</span> blends ancient wisdom with modern science. Get personalized Gita shloks, nutrition, and meditation based on your mood.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link to="/features" className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                            Start Your Journey
                        </Link>
                        <Link to="/about" className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
                            How it Works
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="rounded-full flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-100 h-100 object-contain mix-blend-multiply animate-spin-slow" />
                    </div>
                </div>
            </section>

            {/* 2. DAILY SHLOK PREVIEW (The "Hook") */}
            <section className="max-w-5xl mx-auto px-6 -mt-10 mb-20">
                <div className="bg-linear-to-r from-orange-500 to-amber-600 rounded-4xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-white/20 p-4 rounded-2xl">
                        <BookOpen size={40} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">Today's Gita Wisdom</h3>
                        <p className="text-xl italic mt-2 font-medium">"Karmanye vadhikaraste ma phaleshu kadachana..."</p>
                        <p className="text-sm mt-2 opacity-90">— Focus on your actions, not the results.</p>
                    </div>
                    <button className="ml-auto bg-white text-orange-600 px-6 py-2 rounded-xl font-bold whitespace-nowrap">Read Full Story</button>
                </div>
            </section>

            {/* 3. CORE FEATURES (Bento Grid Style) */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">Holistic Wellness for You</h2>
                    <p className="text-slate-500 mt-2">Personalized guidance based on your emotional state</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <Moon size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Mindfulness</h3>
                        <p className="text-slate-600">Guided meditations and breathing exercises to calm your anxiety and stress.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-all">
                            <Leaf size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sattvic Nutrition</h3>
                        <p className="text-slate-600">Dietary plans that nourish your body and keep your mind balanced and focused.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <Sun size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Yoga & Energy</h3>
                        <p className="text-slate-600">Daily asanas tailored to your energy levels to improve physical flexibility.</p>
                    </div>
                </div>
            </section>

            {/* 4. PROGRESS TRACKER TEASER */}
            <section className="bg-slate-900 py-20 mt-20 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Track Your Inner Growth</h2>
                        <ul className="space-y-4">
                            {[
                                "Daily Mood Journaling",
                                "Meditation Consistency Streak",
                                "Spiritual Knowledge Progress",
                                "Personalized Mental Health Reports"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="bg-orange-500 rounded-full p-1"><Activity size={16} /></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white/5 p-4 rounded-[2.5rem] border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
                        <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-800/50">
                            <img
                                src={progress}
                                alt="Progress Dashboard"
                                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}