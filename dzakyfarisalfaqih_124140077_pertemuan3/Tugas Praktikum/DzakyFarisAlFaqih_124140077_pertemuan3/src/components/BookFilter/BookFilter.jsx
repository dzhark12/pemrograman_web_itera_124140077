import PropTypes from 'prop-types'
import './BookFilter.css'

function BookFilter({ search, onSearchChange, status, onStatusChange }) {
    return (
        <section className="book-filter" aria-label="Cari dan filter buku">
            <div className="field book-filter__search">
                <label htmlFor="book-search">Cari judul atau penulis</label>
                <input
                    id="book-search"
                    type="search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Contoh: Leila atau Laut Bercerita"
                />
            </div>
            <div className="field book-filter__status">
                <label htmlFor="status-filter">Filter status</label>
                <select id="status-filter" value={status} onChange={(event) => onStatusChange(event.target.value)}>
                    <option value="all">Semua status</option>
                    <option value="owned">Dimiliki</option>
                    <option value="reading">Sedang dibaca</option>
                    <option value="wishlist">Ingin dibeli</option>
                    <option value="finished">Selesai dibaca</option>
                </select>
            </div>
        </section>
    )
}

BookFilter.propTypes = {
    search: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    status: PropTypes.oneOf(['all', 'owned', 'reading', 'wishlist', 'finished']).isRequired,
    onStatusChange: PropTypes.func.isRequired,
}

export default BookFilter
