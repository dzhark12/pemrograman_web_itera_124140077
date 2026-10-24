import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Vitest tidak memakai globals; cleanup mencegah DOM antar-test menumpuk.
afterEach(() => cleanup())
