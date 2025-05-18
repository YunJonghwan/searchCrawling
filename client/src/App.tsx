import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// pages 폴더의 예시 컴포넌트 import (실제 파일명에 맞게 수정)
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 추가 라우트는 여기에 작성 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
