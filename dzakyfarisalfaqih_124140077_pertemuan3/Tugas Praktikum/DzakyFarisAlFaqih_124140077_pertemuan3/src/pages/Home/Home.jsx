import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useBooks } from '../../context/BookContext'
import BookForm from '../../components/BookForm/BookForm'
import BookFilter from '../../components/BookFilter/BookFilter'
import BookList from '../../components/BookList/BookList'
import './Home.css'

function Home() {
    const { books, addBook, updateBook, deleteBook } = useBooks()
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [editingBook, setEditingBook] = useState(null)

    const filteredBooks = useMemo(() => {
        const query = search.trim().toLocaleLowerCase('id')
        return books.filter((book) => {
            // Filter Dimiliki mencakup buku owned, reading, dan finished.
            const matchesStatus =
                status === 'all' ||
                (status === 'owned'
                    ? book.status !== 'wishlist'
                    : book.status === status)
            const matchesSearch =
                book.title.toLocaleLowerCase('id').includes(query) ||
                book.author.toLocaleLowerCase('id').includes(query)
            return matchesStatus && matchesSearch
        })
    }, [books, search, status])

    function handleSubmit(bookData) {
        if (editingBook) {
            updateBook(editingBook.id, bookData)
            setEditingBook(null)
            return
        }
        const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
        addBook({ id, ...bookData })
    }

    function handleDelete(id) {
        const confirmed = window.confirm('Yakin ingin menghapus buku ini?')
        if (confirmed) deleteBook(id)
    }

    return (
        <div className="home-page">
            <div className="page-heading">
                <p className="section-kicker">RAK BUKUMU</p>
                <h2>Koleksi buku</h2>
                <p>Catat bacaanmu, lalu temukan kembali lewat pencarian atau status.</p>
            </div>

            <BookForm
                initialBook={editingBook}
                onSubmit={handleSubmit}
                onCancel={() => setEditingBook(null)}
            />

            <section className="collection-section" aria-labelledby="collection-title">
                <div className="collection-section__heading">
                    <div>
                        <p className="section-kicker">DAFTAR</p>
                        <h2 id="collection-title">Buku tersimpan <span>({filteredBooks.length})</span></h2>
                    </div>
                </div>
                <BookFilter
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />
                <BookList
                    books={filteredBooks}
                    onEdit={setEditingBook}
                    onDelete={handleDelete}
                />
            </section>
        </div>
    )
}

Home.propTypes = {}

export default Home
