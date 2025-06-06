import { Layout } from '../components/Layout';
import { useEffect, useRef, useState } from 'react';
import type { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import ProgressBar from '../components/ProgressBar';

interface HomeProps {
  articles: Article[];
  loading: boolean;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({ articles, loading, setArticles, setLoading }: HomeProps) {
  const didFetch = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (didFetch.current || articles.length > 0) return;
    didFetch.current = true;

    const fetchNews = async () => {
      setLoading(true);
      setProgress(0);
      try {
        setProgress(10);
        const response = await fetch('http://localhost:5000/news');
        setProgress(60);
        const data = await response.json();
        setProgress(80);
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
        setProgress(100);
      } catch (e) {
        setArticles([]);
        setProgress(100);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchNews();
  }, []);

  return (
    <Layout>
      <div className="mt-10 max-w-2xl mx-auto">
        {loading ? (
          <div className="text-center mt-20 text-gray-600 animate-pulse">
            <ProgressBar progress={progress} />
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
