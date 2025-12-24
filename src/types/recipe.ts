export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    summary?: string;
    instructions?: string;
    extendedIngredients?: Array<{
        original: string;
    }>;
}

export interface Favorite {
    mockId: string;
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    notes?: string;
}