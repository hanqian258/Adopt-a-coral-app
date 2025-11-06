import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CoralDetail from './pages/CoralDetail'
import CoralUpdates from './pages/CoralUpdates'
import Donation from './pages/Donation'
import Learn from './pages/Learn'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coral/:id" element={<CoralDetail />} />
          <Route path="/coral/:id/updates" element={<CoralUpdates />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

