import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Flashcards from './pages/Flashcards'
import Sheets from './pages/Sheets'
import Quizzes from './pages/Quizzes'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cartes" element={<Flashcards />} />
        <Route path="fiches" element={<Sheets />} />
        <Route path="qcm" element={<Quizzes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
