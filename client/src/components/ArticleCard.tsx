import type { Article } from '../types/article';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-row gap-4 items-center">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold mb-1">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.summary}</p>
        <span className="text-xs text-gray-400">{article.publishedAt}</span>
      </div>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-28 h-28 object-cover rounded-md ml-4 flex-shrink-0 border border-gray-200 bg-gray-50"
      />
    </div>
  );
};
