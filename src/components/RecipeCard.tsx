import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface Props {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
    return (
        <Link to={`/recipe/${recipe.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {recipe.readyInMinutes} min
            </span>
                        <span className="flex items-center gap-1">
              <Users size={16} /> {recipe.servings} servings
            </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}