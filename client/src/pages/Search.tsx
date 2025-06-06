import type { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { Layout } from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import { useState } from 'react';

interface HomeProps {
  articles: Article[];
  loading: boolean;
}

export default function Home({ articles, loading }: HomeProps) {
  const [progress] = useState(loading ? 70 : 100); // 단순 예시: 로딩 중 70%, 완료 시 100%
  return (
    <Layout>
      <div className="mt-10 max-w-2xl mx-auto">
        {loading ? (
          <div className="text-center mt-20 text-gray-600 animate-pulse">
            <ProgressBar progress={progress} />
            <p className="text-2xl font-medium">정보를 가져오는 중입니다...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center mt-20 text-gray-600">
            <p className="text-2xl font-medium">궁금한 뉴스를 검색해보세요</p>
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
