import { useState } from 'react';
import { searchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Search() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError('');
        searchRecipes(query)
            .then(data => {
                setRecipes(data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Search failed. Try again.');
                setLoading(false);
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>
            <form onSubmit={handleSearch} className="mb-8 flex gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="e.g., pasta, chicken, chocolate..."
                    className="flex-1 max-w-md p-3 border rounded-lg text-lg"
                />
                <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Search
                </button>
            </form>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.length === 0 ? <p>No recipes found. Try different keywords!</p> : recipes.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}