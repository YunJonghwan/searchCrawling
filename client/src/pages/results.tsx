import { Layout } from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import { useEffect, useRef, useState } from 'react';

interface Word {
  word: string;
  count: number;
}

interface ResultsProps {
  words: Word[];
  loading: boolean;
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Results({ words, setWords, setLoading }: ResultsProps) {
  const didFetch = useRef(false);
  const [status, setStatus] = useState<'done' | 'processing' | 'not_started'>(() => {
    return sessionStorage.getItem('articleStatus') as 'done' | 'processing' | 'not_started' || 'not_started';
  });

  useEffect(() => {
    if (didFetch.current || words.length > 0) return;
    didFetch.current = true;

    const fetchWords = async () => {
      setLoading(true);
      try {
        setStatus('processing');
        const response = await fetch('http://localhost:5000/article');
        const data = await response.json();
        if (data.status === 'done') {
          const countObj = data.count;
          const arr = Object.entries(countObj).map(([word, count]) => ({ word, count: Number(count) }));
          arr.sort((a, b) => b.count - a.count);
          setWords(arr);
        } else {
          setWords([]);
        }
        setStatus(data.status || 'not_started');
        sessionStorage.setItem('articleStatus', data.status || 'not_started');
      } catch (e) {
        setWords([]);
        setStatus('not_started');
        sessionStorage.setItem('articleStatus', 'not_started');
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchWords();
  }, []);

  return (
    <Layout>
      {status === 'processing' ? (
        <div className="text-center mt-20 text-blue-500 animate-pulse">
          <ProgressBar progress={70} />
          <p className="text-2xl font-medium">기사 분석이 진행 중입니다...</p>
        </div>
      ) : status === 'not_started' ? (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-2xl font-medium">
            아직 분석이 시작되지 않았습니다.
            <br />
            먼저 뉴스 크롤링을 진행해 주세요.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex font-bold">
            <div className="w-16 px-4 py-2">순위</div>
            <div className="flex-1 px-4 py-2">단어</div>
            <div className="w-32 px-4 py-2">빈도수</div>
          </div>
          <div className="max-h-[400px] overflow-y-auto border rounded-md">
            {words.map(({ word, count }, idx) => (
              <div key={word} className="flex border-b last:border-b-0">
                <div className="w-16 px-4 py-2 border-r text-center">{idx + 1}</div>
                <div className="flex-1 px-4 py-2 border-r">{word}</div>
                <div className="w-32 px-4 py-2">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}