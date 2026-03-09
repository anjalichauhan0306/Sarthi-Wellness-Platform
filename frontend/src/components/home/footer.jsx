import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Github, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-orange-50 border-t border-orange-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Upper Footer: Branding & Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" 
                                alt="SARTHI Logo" 
                                className="w-10 h-10 object-contain mix-blend-multiply"
                            />
                            <span className="text-2xl font-bold text-orange-600 tracking-tight">SARTHI</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Your digital companion for mental clarity, spiritual wisdom, and holistic wellness. Guiding you towards your inner peace.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link to="/features" className="hover:text-orange-500 transition-colors">Meditation</Link></li>
                            <li><Link to="/gita-wisdom" className="hover:text-orange-500 transition-colors">Gita Shloks</Link></li>
                            <li><Link to="/nutrition" className="hover:text-orange-500 transition-colors">Sattvic Diet</Link></li>
                            <li><Link to="/tracker" className="hover:text-orange-500 transition-colors">Mood Tracker</Link></li>
                        </ul>
                    </div>

                    {/* Support & Privacy */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link to="/about" className="hover:text-orange-500 transition-colors">Our Story</Link></li>
                            <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter/Action */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-6">Stay Connected</h4>
                        <p className="text-xs text-gray-500 mb-4">Get daily wisdom and wellness tips directly.</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="bg-white border border-orange-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                            />
                            <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-all">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="border-orange-200" />

                {/* Bottom Footer: Socials & Copyright */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                        © 2024 SARTHI. Made with <Heart size={12} className="text-red-400 fill-current" /> for a Better Mind.
                    </p>
                    
                    <div className="flex gap-6 text-gray-400">
                        <a href="#" className="hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-orange-500 transition-colors"><Github size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}