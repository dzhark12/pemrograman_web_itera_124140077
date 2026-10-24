import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './BookForm.css'

const emptyForm = { title: '', author: '', status: 'owned' }

function BookForm({ initialBook = null, onSubmit, onCancel }) {
    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const titleRef = useRef(null)
    const authorRef = useRef(null)
    const editing = Boolean(initialBook)

    useEffect(() => {
        setForm(
            initialBook
                ? {
                    title: initialBook.title,
                    author: initialBook.author,
                    status: initialBook.status,
                }
                : emptyForm,
        )
        setErrors({})
    }, [initialBook])

    function handleChange(event) {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
        setErrors((current) => ({ ...current, [name]: '' }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        // Trim supaya input berisi spasi saja tidak lolos sebagai isian.
        const title = form.title.trim()
        const author = form.author.trim()
        const nextErrors = {
            title: title ? '' : 'Judul buku wajib diisi.',
            author: author ? '' : 'Nama penulis wajib diisi.',
        }
        setErrors(nextErrors)

        if (!title || !author) {
            if (!title) titleRef.current?.focus()
            else authorRef.current?.focus()
            return
        }

        onSubmit({ title, author, status: form.status })
        if (!editing) setForm(emptyForm)
    }

    return (
        <form className="book-form" onSubmit={handleSubmit} noValidate>
            <div className="book-form__heading">
                <div>
                    <p className="section-kicker">KOLEKSI</p>
                    <h2>{editing ? 'Ubah catatan buku' : 'Catat buku baru'}</h2>
                </div>
                <span className="book-form__mark" aria-hidden="true">01</span>
            </div>

            <div className="book-form__fields">
                <div className="field">
                    <label htmlFor="book-title">Judul buku <span>(wajib)</span></label>
                    <input
                        ref={titleRef}
                        id="book-title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.title)}
                        aria-describedby={errors.title ? 'book-title-error' : undefined}
                        autoComplete="off"
                    />
                    {errors.title && <p className="field__error" id="book-title-error" role="alert">{errors.title}</p>}
                </div>

                <div className="field">
                    <label htmlFor="book-author">Penulis <span>(wajib)</span></label>
                    <input
                        ref={authorRef}
                        id="book-author"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.author)}
                        aria-describedby={errors.author ? 'book-author-error' : undefined}
                        autoComplete="off"
                    />
                    {errors.author && <p className="field__error" id="book-author-error" role="alert">{errors.author}</p>}
                </div>

                <div className="field field--status">
                    <label htmlFor="book-status">Status buku</label>
                    <select id="book-status" name="status" value={form.status} onChange={handleChange}>
                        <option value="owned">Dimiliki</option>
                        <option value="reading">Sedang dibaca</option>
                        <option value="wishlist">Ingin dibeli</option>
                        <option value="finished">Selesai dibaca</option>
                    </select>
                </div>
            </div>

            <div className="book-form__actions">
                <button className="button button--primary" type="submit">
                    {editing ? 'Simpan Perubahan' : 'Tambah Buku'}
                </button>
                {editing && <button className="button button--secondary" type="button" onClick={onCancel}>Batal</button>}
            </div>
        </form>
    )
}

BookForm.propTypes = {
    initialBook: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['owned', 'reading', 'wishlist', 'finished']).isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default BookForm
