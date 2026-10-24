import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { BookProvider } from '../../context/BookContext'
import Home from './Home'

function renderHome() {
    return render(<BookProvider><Home /></BookProvider>)
}

describe('Home', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('menambah buku lalu langsung menampilkannya di daftar', () => {
        renderHome()
        fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Laut Bercerita' } })
        fireEvent.change(screen.getByLabelText(/^Penulis/i), { target: { value: 'Leila S. Chudori' } })
        fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }))

        expect(screen.getByRole('heading', { name: 'Laut Bercerita' })).toBeInTheDocument()
        expect(screen.getByLabelText(/judul buku/i)).toHaveValue('')
    })

    it('mencari berdasarkan penulis dan memfilter berdasarkan status', () => {
        window.localStorage.setItem('personal-books', JSON.stringify([
            { id: '1', title: 'Laut Bercerita', author: 'Leila Chudori', status: 'owned' },
            { id: '2', title: 'Bumi Manusia', author: 'Pramoedya', status: 'reading' },
            { id: '3', title: 'Wishlist', author: 'Penulis Lain', status: 'wishlist' },
        ]))
        renderHome()

        fireEvent.change(screen.getByLabelText('Cari judul atau penulis'), { target: { value: 'PRAMOEDYA' } })
        expect(screen.getByRole('heading', { name: 'Bumi Manusia' })).toBeInTheDocument()
        const readingBook = screen.getByRole('heading', { name: 'Bumi Manusia' }).closest('.book-card__body')
        expect(within(readingBook).getByText('Dimiliki')).toBeInTheDocument()
        expect(within(readingBook).getByText('Sedang dibaca')).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Laut Bercerita' })).not.toBeInTheDocument()

        fireEvent.change(screen.getByLabelText('Cari judul atau penulis'), { target: { value: '' } })
        fireEvent.change(screen.getByLabelText('Filter status'), { target: { value: 'owned' } })
        expect(screen.getByRole('heading', { name: 'Laut Bercerita' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Bumi Manusia' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Wishlist' })).not.toBeInTheDocument()
    })
})
