import Input from "../components/Input";

export const Header = () => {
  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <div className="w-full flex justify-center">
        <Input type="text" placeholder="검색어를 입력하세요" className="border border-gray-300 rounded-md px-4 py-2 w-56"/>
        <button type="button" className="bg-[#5ea2f7] text-white px-4 py-2 rounded-lg hover:bg-[#7bb7ff]">검색</button>
      </div>
    </header>
  );
};
