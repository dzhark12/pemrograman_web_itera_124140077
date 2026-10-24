import { NavLink, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Lewati ke konten</a>
      <Header
        title="Perpustakaan Pribadi"
        description="Simpan jejak bacaanmu, satu buku setiap kali."
      />
      <nav className="main-nav" aria-label="Navigasi utama">
        <div className="main-nav__inner">
          <NavLink to="/" end>Koleksi</NavLink>
          <NavLink to="/stats">Statistik</NavLink>
        </div>
      </nav>
      <main id="main-content" className="app-main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="app-footer">Dibuat untuk merawat cerita yang ingin kamu ingat.</footer>
    </div>
  )
}

App.propTypes = {}

export default App
