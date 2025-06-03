import { useEffect, useState } from 'react';
import type { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { Layout } from '../components/Layout';

interface HomeProps {
  articles: Article[];
  loading: boolean;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({ articles, loading, setArticles, setLoading }: HomeProps) {
  useEffect(() => {
    if (articles.length > 0) return; // 이미 데이터가 있으면 fetch하지 않음
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        if (Array.isArray(data.results)) {
          const articles = data.results.map((item: any, idx: number) => ({
            id: idx + 1,
            title: item.title,
            summary: item.summary,
            imageUrl: item.image,
            url: item.url,
            publishedAt: new Date().toISOString().slice(0, 10),
          }));
          setArticles(articles);
        }
      } catch (e) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [articles, setArticles, setLoading]);

  return (
    <Layout>
      <div className="mt-10 max-w-2xl mx-auto">
        {loading ? (
          <div className="text-center mt-20 text-gray-600 animate-pulse">
            <p className="text-2xl font-medium">정보를 가져오는 중입니다...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
