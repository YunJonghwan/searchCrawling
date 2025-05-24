import Input from "../components/Input";
import { useState } from "react";

export const Header = () => {

  const [searchWord, setSearchWord] = useState("");

  const handleSearch = async () => {
    console.log(searchWord);
    try {
      fetch(`http://localhost:5000/search/word=${searchWord}`);
    } catch (error) {
      console.error("전송 에러 : ", error);
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
