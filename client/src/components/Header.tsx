export const Header = () => {
  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="border border-gray-300 rounded-md px-4 py-2 w-64"
      />
    </header>
  );
};
