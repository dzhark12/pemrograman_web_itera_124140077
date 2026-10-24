import PropTypes from 'prop-types'
import { useBooks } from '../../context/BookContext'
import useBookStats from '../../hooks/useBookStats'
import './Stats.css'

const statLabels = [
    ['owned', 'Dimiliki'],
    ['reading', 'Sedang dibaca'],
    ['wishlist', 'Ingin dibeli'],
    ['finished', 'Selesai dibaca'],
]

function Stats() {
    const { books } = useBooks()
    const stats = useBookStats(books)

    return (
        <section className="stats-page">
            <div className="page-heading">
                <p className="section-kicker">ANGKA KOLEKSI</p>
                <h2>Statistik bacaan</h2>
                <p>Ringkasan buku yang kamu catat di perpustakaan pribadi.</p>
            </div>

            <div className="stats-total">
                <span>Total buku</span>
                <strong>{stats.total}</strong>
            </div>

            <div className="stats-grid" aria-label="Jumlah buku menurut status">
                {statLabels.map(([key, label]) => (
                    <article className="stat-card" key={key}>
                        <span>{label}</span>
                        <strong>{stats[key]}</strong>
                        <span className={`stat-card__rule stat-card__rule--${key}`} aria-hidden="true" />
                    </article>
                ))}
            </div>
            <p className="stats-note">
                Jumlah Dimiliki mencakup buku berstatus Dimiliki, Sedang dibaca, dan Selesai dibaca. Buku Ingin dibeli tidak termasuk.
            </p>

            <section className="completion-card" aria-labelledby="completion-title">
                <div className="completion-card__heading">
                    <div>
                        <p className="section-kicker">PROGRES</p>
                        <h3 id="completion-title">Buku selesai dibaca</h3>
                    </div>
                    <strong>{stats.completionPercentage}%</strong>
                </div>
                <progress
                    className="completion-progress"
                    value={stats.completionPercentage}
                    max="100"
                    aria-label={`Persentase buku selesai dibaca: ${stats.completionPercentage}%`}
                />
                <p>Persentase selesai dibagi jumlah seluruh buku yang dimiliki; wishlist tidak dihitung.</p>
            </section>

            {stats.total === 0 && (
                <p className="stats-empty" role="status">Belum ada data. Tambahkan buku dari halaman Koleksi untuk melihat statistik.</p>
            )}
        </section>
    )
}

Stats.propTypes = {}

export default Stats
