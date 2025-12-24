import { useState } from 'react';
import { searchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipe } from '../types/recipe';

export default function Search() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        searchRecipes(query).then(data => {
            setRecipes(data.results || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>
            <form onSubmit={handleSearch} className="mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="e.g., pasta, chicken, chocolate..."
                    className="w-full max-w-md p-3 border rounded-lg text-lg"
                />
                <button type="submit" className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Search
                </button>
            </form>

            {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.length === 0 ? <p>No recipes found.</p> : recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </div>
            )}
        </div>
    );
}