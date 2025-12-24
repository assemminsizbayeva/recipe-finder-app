export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    summary?: string;
    instructions?: string;
    extendedIngredients?: Array<{ original: string }>;
}

export interface Favorite extends Recipe {
    mockId: string; // MockAPI gives its own ID
    notes?: string;
}