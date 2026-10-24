// @vitest-environment jsdom
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import TaskItem from './TaskItem';

describe('Komponen TaskItem', () => {
    const dummyTask = {
        id: 1,
        title: 'Belajar React Testing',
        completed: false
    };

    const mockDelete = vi.fn();
    const mockToggle = vi.fn();

    afterEach(() => cleanup());

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('merender judul tugas dengan benar', () => {
        render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
        expect(screen.getByText('Belajar React Testing').textContent).toBe('Belajar React Testing');
    });

    test('memanggil fungsi onToggleComplete saat checkbox diklik', () => {
        render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockToggle).toHaveBeenCalledWith(1);
    });

    test('memanggil fungsi onDelete saat tombol hapus diklik', () => {
        render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
        const deleteBtn = screen.getByText('Hapus');
        fireEvent.click(deleteBtn);
        expect(mockDelete).toHaveBeenCalledWith(1);
    });
});
