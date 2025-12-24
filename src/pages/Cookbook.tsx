import { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../services/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Cookbook() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = () => {
        getFavorites()
            .then(res => {
                setFavorites(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleDelete = async (mockId: string) => {
        if (!confirm('Remove this recipe from your cookbook?')) return;
        try {
            await deleteFavorite(mockId);
            loadFavorites(); // reload list
            alert('Removed!');
        } catch (err) {
            alert('Failed to remove. Try again or check internet.');
            console.error('Delete error:', err);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Cookbook ({favorites.length})</h1>

            {favorites.length === 0 ? (
                <p className="text-lg">
                    Your cookbook is empty. Go to Home or Search, find a recipe, and add it!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((fav: any) => (
                        <div key={fav.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link to={`/recipe/${fav.recipeId}`}>
                                <img
                                    src={fav.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt={fav.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{fav.title}</h3>
                                </div>
                            </Link>
                            <div className="p-4 pt-0">
                                <button
                                    onClick={() => handleDelete(fav.id)} // MockAPI's own ID
                                    className="text-red-600 hover:underline"
                                >
                                    Remove from cookbook
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}