import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const savedValue = window.localStorage.getItem(key)
            return savedValue === null ? initialValue : JSON.parse(savedValue)
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // State tetap dapat dipakai selama sesi ini jika browser menolak storage.
        }
    }, [key, value])

    return [value, setValue]
}
