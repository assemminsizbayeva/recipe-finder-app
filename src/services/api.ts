import axios from 'axios';
import { MOCKAPI_BASE_URL, SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY } from '../config';

const spoonacular = axios.create({
    baseURL: SPOONACULAR_BASE_URL,
});

const mockapi = axios.create({
    baseURL: MOCKAPI_BASE_URL,
});

// Spoonacular recipes search (list)
export const searchRecipes = async (query: string = '', offset: number = 0) => {
    const response = await spoonacular.get('/recipes/complexSearch', {
        params: {
            query,
            offset,
            number: 12,
            addRecipeInformation: true,
            fillIngredients: true,
            apiKey: SPOONACULAR_API_KEY,
        },
    });
    return response.data;
};

// Get single recipe details
export const getRecipeById = async (id: number) => {
    const response = await spoonacular.get(`/recipes/${id}/information`, {
        params: { apiKey: SPOONACULAR_API_KEY },
    });
    return response.data;
};

// Favorites CRUD (MockAPI)
export const getFavorites = () => mockapi.get('/favorites');
export const addFavorite = (recipe: any) => mockapi.post('/favorites', recipe);
export const updateFavorite = (id: string, data: any) => mockapi.put(`/favorites/${id}`, data);
export const deleteFavorite = (id: string) => mockapi.delete(`/favorites/${id}`);