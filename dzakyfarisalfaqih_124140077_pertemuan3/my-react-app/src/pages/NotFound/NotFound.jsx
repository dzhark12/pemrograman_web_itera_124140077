import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-code">404</p>
      <h1>Halaman tidak ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </main>
  );
}

export default NotFound;
