import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Odontograma from './pages/Odontograma'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/odontograma" element={<Odontograma />} />
    </Routes>
  )
}
