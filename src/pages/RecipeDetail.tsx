import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, addFavorite, getFavorites } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipe } from '../types/recipe';

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            getRecipeById(Number(id)).then(setRecipe).finally(() => setLoading(false));

            // Check if already in favorites
            getFavorites().then(res => {
                const exists = res.data.some((f: any) => f.id === Number(id));
                setIsFavorite(exists);
            });
        }
    }, [id]);

    const handleAddFavorite = async () => {
        if (!recipe) return;
        const simplified = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            servings: recipe.servings,
            notes: '',
        };
        await addFavorite(simplified);
        setIsFavorite(true);
        alert('Added to your cookbook!');
    };

    if (loading) return <LoadingSpinner />;

    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back</Link>
            <div className="grid md:grid-cols-2 gap-8">
                <img src={recipe.image} alt={recipe.title} className="rounded-lg shadow-lg" />
                <div>
                    <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                    <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary || '' }} />
                    <div className="flex gap-6 mb-6">
                        <span>⏱ {recipe.readyInMinutes} minutes</span>
                        <span>👥 {recipe.servings} servings</span>
                    </div>
                    {!isFavorite && (
                        <button onClick={handleAddFavorite} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Add to My Cookbook
                        </button>
                    )}
                    {isFavorite && <p className="text-green-600 font-semibold">✓ Already in your cookbook</p>}
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                <ul className="list-disc pl-6">
                    {recipe.extendedIngredients?.map((ing, i) => (
                        <li key={i}>{ing.original}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available.' }} />
            </div>
        </div>
    );
}