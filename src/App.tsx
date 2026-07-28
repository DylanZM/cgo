import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Playground from './pages/Playground'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Playground />} />
    </Routes>
  )
}
