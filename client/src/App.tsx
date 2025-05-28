import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/results'
import type { Article } from './types/article';
import { Header } from './components/Header';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Header setArticles={setArticles} setLoading={setLoading} />
      <Routes>
        <Route path="/" element={<Home articles={articles} loading={loading} />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
