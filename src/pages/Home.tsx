import { useEffect, useState } from 'react';
import { searchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        searchRecipes('') // empty query = popular/trending
            .then(data => {
                setRecipes(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load recipes. Check API key or internet.');
                setLoading(false);
            });
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Popular Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes found. Try the Search page!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}