import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const BookContext = createContext(null)

export function BookProvider({ children }) {
    const [storedBooks, setBooks] = useLocalStorage('personal-books', [])
    const books = Array.isArray(storedBooks) ? storedBooks : []

    function addBook(book) {
        setBooks((current) => [...(Array.isArray(current) ? current : []), book])
    }

    function updateBook(id, changes) {
        setBooks((current) =>
            (Array.isArray(current) ? current : []).map((book) =>
                book.id === id ? { ...book, ...changes } : book,
            ),
        )
    }

    function deleteBook(id) {
        setBooks((current) =>
            (Array.isArray(current) ? current : []).filter((book) => book.id !== id),
        )
    }

    return (
        <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    )
}

BookProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function useBooks() {
    const context = useContext(BookContext)
    if (!context) {
        throw new Error('useBooks harus digunakan di dalam BookProvider.')
    }
    return context
}
