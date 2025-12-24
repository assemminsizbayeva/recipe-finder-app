# Recipe Finder & Personal Cookbook 🍳

A fully responsive single-page React application that lets users discover recipes using real-time data, view detailed information, and manage a personal cookbook with full CRUD operations.

## Live Demo
🔗 **https://recipe-finder-app-pied-three.vercel.app/**

## Features
- **Home Page**: Displays popular/trending recipes fetched from Spoonacular API
- **Search**: Keyword-based recipe search with real results and images
- **Recipe Details**: Full view with image, prep time, servings, ingredients list, and step-by-step instructions
- **Personal Cookbook**: 
  - Add recipes to favorites (POST)
  - View saved recipes with images
  - Remove recipes (DELETE)
  - Prevents duplicates
  - Clicking saved recipe opens correct details and shows "Already added"
- Loading spinners and user-friendly error messages
- Fully responsive design (mobile, tablet, desktop)
- Clean navigation bar with active state highlighting

## APIs Used
- **Spoonacular Food API** – Live recipe data (search, details, images, instructions)  
  Documentation: https://spoonacular.com/food-api
  - Note: Free tier has ~50-150 points/day limit (resets daily). During heavy testing, quota may be temporarily exhausted — app shows friendly error.
- **MockAPI.io** – Persistent mock backend for favorites CRUD (no real backend needed)  
  Link: https://mockapi.io

## Tech Stack
- React + TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling & responsiveness)
- Axios (API requests)
- React Router (multi-page navigation)
- Lucide React (icons)

## Project Structure
src/
├── components/     # Reusable UI (Navbar, RecipeCard, LoadingSpinner)
├── pages/          # Home, Search, RecipeDetail, Cookbook
├── services/       # api.ts – all API logic separated
├── types/          # TypeScript interfaces
├── config.ts       # API base URLs and key (no hard-coding)
└── main.tsx        # Routing setup

## How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/assemminsizbayeva/recipe-finder-app.git
2. Install dependencies:Bashnpm install
(Optional) Add your own Spoonacular API key in src/config.ts for more daily calls
3. Start dev server:Bashnpm run dev
Open http://localhost:5173

##Known Limitations

Spoonacular free tier daily quota (resets every 24 hours)
No user authentication — cookbook is global via MockAPI (sufficient for capstone demo)

Capstone Requirements Met

Consumes existing REST APIs (GET list/details + full CRUD on favorites)
Loading & error states implemented
Responsive layout with Flexbox/Grid
Clean code architecture, modern ES6+, separation of concerns
Git used with meaningful commits
Deployed live on Vercel

Created for Front-End Capstone Project
Thank you for reviewing! 🙌
