import { useEffect, useState } from 'react';
import { searchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipe } from '../types/recipe';

export default function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchRecipes('').then(data => {
            setRecipes(data.results || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Popular Recipes</h1>
            {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </div>
            )}
        </div>
    );
}