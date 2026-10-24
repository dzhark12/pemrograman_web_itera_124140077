import { useMemo } from 'react'

export default function useBookStats(books) {
    return useMemo(() => {
        const counts = books.reduce(
            (result, book) => {
                if (result[book.status] !== undefined) result[book.status] += 1
                return result
            },
            { owned: 0, reading: 0, wishlist: 0, finished: 0 },
        )

        // Buku yang sedang atau selesai dibaca tetap termasuk koleksi dimiliki.
        const ownedCount = counts.owned + counts.reading + counts.finished
        const completionPercentage = ownedCount
            ? Math.round((counts.finished / ownedCount) * 100)
            : 0

        return {
            total: books.length,
            owned: ownedCount,
            reading: counts.reading,
            wishlist: counts.wishlist,
            finished: counts.finished,
            completionPercentage,
        }
    }, [books])
}

