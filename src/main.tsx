import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import Cookbook from './pages/Cookbook';
import './index.css';

function Layout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                    <Route path="/cookbook" element={<Cookbook />} />
                </Routes>
            </main>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);