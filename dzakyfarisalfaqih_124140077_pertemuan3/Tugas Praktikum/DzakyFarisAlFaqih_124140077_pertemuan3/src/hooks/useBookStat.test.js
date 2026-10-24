import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import useBookStats from './useBookStats'

describe('useBookStats', () => {
    it('menghitung jumlah per status dan persentase selesai', () => {
        const books = [
            { id: '1', title: 'Satu', author: 'A', status: 'finished' },
            { id: '2', title: 'Dua', author: 'B', status: 'owned' },
            { id: '3', title: 'Tiga', author: 'C', status: 'reading' },
            { id: '4', title: 'Empat', author: 'D', status: 'wishlist' },
        ]
        const { result } = renderHook(() => useBookStats(books))

        expect(result.current).toMatchObject({
            total: 4, owned: 3, reading: 1, wishlist: 1, finished: 1,
            completionPercentage: 33,
        })
    })

    it('menghasilkan nol jika belum ada buku yang dimiliki atau selesai', () => {
        const { result } = renderHook(() => useBookStats([]))
        expect(result.current).toEqual({
            total: 0, owned: 0, reading: 0, wishlist: 0, finished: 0,
            completionPercentage: 0,
        })
    })
})
