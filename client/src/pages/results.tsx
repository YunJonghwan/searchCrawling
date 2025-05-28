import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/ArticleCard';
import type { Article } from '../types/article';

const dummyArticles: Article[] = [
  {
    id: 1,
    title: '예시 기사 제목 1',
    summary: '이것은 요약 텍스트입니다. 간략한 설명을 보여줍니다.',
    imageUrl: 'https://via.placeholder.com/150',
    publishedAt: '2025-05-18',
    url:"임시시"
  },
  {
    id: 2,
    title: '예시 기사 제목 2',
    summary: '다른 기사 내용 요약이 여기에 표시됩니다.',
    imageUrl: 'https://via.placeholder.com/150',
    publishedAt: '2025-05-17',
    url:"임시"
  },
];

export default function Results() {
  return (
    <Layout>
      <div className="grid gap-4">
        {dummyArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Layout>
  );
}