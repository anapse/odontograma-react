import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Odontograma from './pages/Odontograma'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Odontograma />} />
      <Route path="/odontograma" element={<Odontograma />} />
      <Route path="/home" element={<Home />} />
      {/* Ruta catch-all para GitHub Pages */}
      <Route path="*" element={<Odontograma />} />
    </Routes>
  )
}
