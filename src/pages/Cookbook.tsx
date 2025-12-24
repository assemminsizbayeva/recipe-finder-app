import { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../services/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

interface Favorite {
    mockId: string;
    id: number;
    title: string;
    image: string;
    notes?: string;
}

export default function Cookbook() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = () => {
        getFavorites().then(res => {
            setFavorites(res.data);
            setLoading(false);
        });
    };

    useEffect(() => loadFavorites(), []);

    const handleDelete = async (mockId: string) => {
        if (confirm('Remove from cookbook?')) {
            await deleteFavorite(mockId);
            loadFavorites();
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Cookbook ({favorites.length})</h1>
            {favorites.length === 0 ? (
                <p>No saved recipes yet. Go search and add some!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map(fav => (
                        <div key={fav.mockId} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link to={`/recipe/${fav.id}`}>
                                <img src={fav.image} alt={fav.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold">{fav.title}</h3>
                                </div>
                            </Link>
                            <div className="p-4 pt-0">
                                <button
                                    onClick={() => handleDelete(fav.mockId)}
                                    className="text-red-600 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}