import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar"
import { CourseCard } from "./components/coursemanagement/CourseCard"
import { NotFound } from './pages/NotFound';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Sidebar/>}></Route>
        <Route path="/coursecard" element={<CourseCard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
