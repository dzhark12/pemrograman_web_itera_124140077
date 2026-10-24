import PropTypes from 'prop-types'
import './BookList.css'

const statusLabels = {
    owned: 'Dimiliki',
    reading: 'Sedang dibaca',
    wishlist: 'Ingin dibeli',
    finished: 'Selesai dibaca',
}

function BookList({ books, onEdit, onDelete }) {
    if (books.length === 0) {
        return (
            <div className="book-empty" role="status">
                <p className="book-empty__mark" aria-hidden="true">—</p>
                <h3>Belum ada buku yang cocok</h3>
                <p>Coba ubah kata pencarian atau filter, atau catat buku baru di atas.</p>
            </div>
        )
    }

    return (
        <ul className="book-list">
            {books.map((book) => (
                <li className="book-card" key={book.id}>
                    <div className="book-card__body">
                        <div className="book-card__badges">
                            {/* Reading dan finished tetap menampilkan tag kepemilikan. */}
                            {book.status !== 'wishlist' && (
                                <span className="status-badge status-badge--owned">Dimiliki</span>
                            )}
                            {book.status !== 'owned' && (
                                <span className={`status-badge status-badge--${book.status}`}>{statusLabels[book.status]}</span>
                            )}
                        </div>
                        <h3>{book.title}</h3>
                        <p>oleh {book.author}</p>
                    </div>
                    <div className="book-card__actions">
                        <button className="button button--secondary" type="button" onClick={() => onEdit(book)}>Edit</button>
                        <button className="button button--danger" type="button" onClick={() => onDelete(book.id)} aria-label={`Hapus ${book.title}`}>Hapus</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['owned', 'reading', 'wishlist', 'finished']).isRequired,
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default BookList
