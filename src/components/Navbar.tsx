import { Link } from 'react-router-dom';
import { Home, Search, BookOpen } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                    <BookOpen size={28} /> Recipe Finder
                </Link>
                <div className="flex gap-6">
                    <Link to="/" className="flex items-center gap-1 hover:underline">
                        <Home size={20} /> Home
                    </Link>
                    <Link to="/search" className="flex items-center gap-1 hover:underline">
                        <Search size={20} /> Search
                    </Link>
                    <Link to="/cookbook" className="flex items-center gap-1 hover:underline">
                        <BookOpen size={20} /> My Cookbook
                    </Link>
                </div>
            </div>
        </nav>
    );
}