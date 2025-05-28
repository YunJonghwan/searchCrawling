import Input from "../components/Input";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Article } from "../types/article";

interface HeaderProps {
  setArticles: Dispatch<SetStateAction<Article[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setArticles, setLoading }: HeaderProps) => {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/search?word=${searchWord}`, {
        credentials: 'same-origin',
      });
      const data = await response.json();
      // 서버에서 받은 데이터 구조에 맞게 변환
      if (Array.isArray(data.results)) {
        // 서버 DTO에 맞게 변환 (id, title, summary, imageUrl, publishedAt)
        const articles = data.results.map((item: any, idx: number) => ({
          id: idx + 1,
          title: item.title,
          summary: item.subtitle,
          imageUrl: item.image,
          publishedAt: new Date().toISOString().slice(0, 10),
        }));
        setArticles(articles);
      }
    } catch (error) {
      console.error("전송 에러 : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <div className="w-full flex justify-center">
        <Input type="text" placeholder="검색어를 입력하세요" 
          className="border border-gray-300 rounded-md px-4 py-2 w-56" 
          name="word"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button type="button" className="bg-[#5ea2f7] text-white px-4 py-2 rounded-lg hover:bg-[#7bb7ff]" onClick={handleSearch}>검색</button>
      </div>
    </header>
  );
};
