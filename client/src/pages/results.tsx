import { Layout } from '../components/Layout';
import { useEffect, useState } from 'react';

export default function Results() {
  const [words, setWords] = useState<{ word: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/article')
      .then((res) => res.json())
      .then((data) => {
        const countObj = data.count;
        const arr = Object.entries(countObj).map(([word, count]) => ({ word, count: Number(count) }));
        arr.sort((a, b) => b.count - a.count);
        setWords(arr);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="text-center mt-20 text-gray-600 animate-pulse">
          <p className="text-2xl font-medium">정보를 가져오는 중입니다...</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex font-bold">
            <div className="flex-1 px-4 py-2">단어</div>
            <div className="w-32 px-4 py-2">빈도수</div>
          </div>
          {words.map(({ word, count }) => (
            <div key={word} className="flex border">
              <div className="flex-1 px-4 py-2 border-r">{word}</div>
              <div className="w-32 px-4 py-2">{count}</div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}