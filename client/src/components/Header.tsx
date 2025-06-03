import Input from "../components/Input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import type { Article } from "../types/article";

interface HeaderProps {
  setArticles: Dispatch<SetStateAction<Article[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setArticles, setLoading }: HeaderProps) => {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/search?word=${searchWord}`, {
        credentials: 'same-origin',
      });
      const data = await response.json();
      if (Array.isArray(data.results)) {
        const articles = data.results.map((item: any, idx: number) => ({
          id: idx + 1,
          title: item.title,
          summary: item.subtitle,
          imageUrl: item.image,
          url: item.url,
          publishedAt: new Date().toISOString().slice(0, 10),
        }));
        setArticles(articles);
      } else {
        setArticles([]);
      }
      navigate("/search");
    } catch (error) {
      setArticles([]);
      console.error("전송 에러 : ", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 입력 시 기존 검색 데이터 초기화
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setArticles([]);
  };

  return (
    <header className="w-full flex-col p-4 bg-white shadow-md flex justify-between items-center">
      <div className="w-full flex justify-center">
        <Input type="text" placeholder="검색어를 입력하세요"
          className="border border-gray-300 rounded-md px-4 py-2 w-56"
          name="word"
          onChange={handleInputChange}
        />
        <button type="button" className="bg-[#5ea2f7] text-white px-4 py-2 rounded-lg hover:bg-[#7bb7ff]" onClick={handleSearch}>검색</button>
      </div>
      <div className="w-full flex justify-between gap-4 mt-4 max-w-xl mx-auto">
        <button
          className={`flex-1 px-4 py-2 rounded-lg font-semibold ${location.pathname === "/" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
          onClick={() => navigate("/")}
        >
          뉴스
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-lg font-semibold ${location.pathname === "/result" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
          onClick={() => navigate("/result")}
        >
          통계
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-lg font-semibold ${location.pathname === "/search" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
          onClick={() => navigate("/search")}
        >
          검색
        </button>
      </div>
    </header>
  );
};
