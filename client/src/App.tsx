import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages 폴더의 예시 컴포넌트 import (실제 파일명에 맞게 수정)
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
