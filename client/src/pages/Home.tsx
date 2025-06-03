import { useEffect, useState } from 'react';
import type { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { Layout } from '../components/Layout';


export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

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
