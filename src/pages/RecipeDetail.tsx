import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, addFavorite, getFavorites } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        // Load full recipe details
        getRecipeById(Number(id))
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load recipe details.');
                setLoading(false);
            });

        // Check if already in favorites
        getFavorites()
            .then(res => {
                const exists = res.data.some((f: any) => f.recipeId === Number(id));
                setIsFavorite(exists);
            })
            .catch(() => {}); // silent
    }, [id]);

    const handleAddFavorite = async () => {
        if (!recipe) return;

        const favoriteData = {
            recipeId: recipe.id, // use recipeId instead of id to avoid conflict
            title: recipe.title || 'Untitled Recipe',
            image: recipe.image || 'https://via.placeholder.com/400x300?text=No+Image',
            readyInMinutes: recipe.readyInMinutes || 0,
            servings: recipe.servings || 1,
            notes: '',
        };

        try {
            await addFavorite(favoriteData);
            setIsFavorite(true);
            alert('✅ Added to My Cookbook!');
        } catch (err) {
            alert('Failed to add. Check console.');
            console.error(err);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
    if (!recipe) return <p className="text-center py-10">Recipe not found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
                ← Back to recipes
            </Link>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full rounded-lg shadow-lg object-cover max-h-96"
                />
                <div>
                    <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                    <div className="flex gap-6 text-lg mb-6">
                        <span>⏱ {recipe.readyInMinutes} min</span>
                        <span>👥 {recipe.servings} servings</span>
                    </div>
                    {!isFavorite ? (
                        <button
                            onClick={handleAddFavorite}
                            className="px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700"
                        >
                            + Add to My Cookbook
                        </button>
                    ) : (
                        <p className="text-green-600 text-xl font-semibold">✓ Already in My Cookbook</p>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {recipe.extendedIngredients?.map((ing: any, i: number) => (
                            <li key={i} className="text-lg">{ing.original}</li>
                        )) || <li>No ingredients listed.</li>}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: recipe.instructions || '<p>No instructions available.</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}