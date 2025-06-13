import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from './pages/NotFound';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/coursecard" element={<CourseCard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
