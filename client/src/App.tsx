import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/results'
import type { Article } from './types/article';
import { Header } from './components/Header';
import Search from './pages/Search';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Header setArticles={setArticles} setLoading={setLoading} />
      <Routes>
        <Route path="/" element={<Home articles={articles} loading={loading} setArticles={setArticles} setLoading={setLoading}/>}/>
        <Route path="/Result" element={<Result />} />
        <Route path="/Search" element={<Search articles={articles} loading={loading} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
