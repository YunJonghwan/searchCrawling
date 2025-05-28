import type { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { Layout } from '../components/Layout';

interface HomeProps {
  articles: Article[];
}

export default function Home({ articles }: HomeProps) {
  return (
    <Layout>
      <div className="mt-10 max-w-2xl mx-auto">
        {articles.length === 0 ? (
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
