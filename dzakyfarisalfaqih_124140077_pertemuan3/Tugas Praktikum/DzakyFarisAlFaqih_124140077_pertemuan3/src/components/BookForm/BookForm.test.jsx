import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import BookForm from './BookForm'

describe('BookForm', () => {
    it('menampilkan error jika judul kosong', () => {
        render(<BookForm initialBook={null} onSubmit={vi.fn()} onCancel={vi.fn()} />)
        fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: 'Leila' } })
        fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }))
        expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument()
    })

    it('menampilkan error jika penulis kosong', () => {
        render(<BookForm initialBook={null} onSubmit={vi.fn()} onCancel={vi.fn()} />)
        fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Laut Bercerita' } })
        fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }))
        expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument()
    })

    it('mengirim data yang sudah dipangkas spasinya', () => {
        const onSubmit = vi.fn()
        render(<BookForm initialBook={null} onSubmit={onSubmit} onCancel={vi.fn()} />)
        fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: '  Laut Bercerita  ' } })
        fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: ' Leila S. Chudori ' } })
        fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }))
        expect(onSubmit).toHaveBeenCalledWith({
            title: 'Laut Bercerita', author: 'Leila S. Chudori', status: 'owned',
        })
        expect(screen.getByLabelText(/judul buku/i)).toHaveValue('')
    })
})
