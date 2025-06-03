import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/results'
import type { Article } from './types/article';
import { Header } from './components/Header';
import Search from './pages/Search';

function App() {
  // 뉴스탭 데이터와 검색탭 데이터 분리
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [searchArticles, setSearchArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Header setArticles={setSearchArticles} setLoading={setLoading} />
      <Routes>
        <Route path="/" element={<Home articles={newsArticles} loading={loading} setArticles={setNewsArticles} setLoading={setLoading}/>} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Search" element={<Search articles={searchArticles} loading={loading} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
