# Sistem Manajemen Perpustakaan Sederhana

## Identitas Mahasiswa

- Nama Lengkap: Dzaky Faris Al Faqih
- NIM: 124140077
- Kelas Praktikum: RB

## Deskripsi Program

Program mengelola buku dan majalah dalam katalog perpustakaan. Program dapat menambahkan item, menampilkan item yang tersedia, mencari item berdasarkan ID atau judul, serta menunjukkan perubahan status ketika buku dipinjam.

Penerapan konsep OOP:

- **Class:** `LibraryItem`, `Book`, `Magazine`, dan `Library` menjadi cetak biru objek program.
- **Inheritance:** `Book` dan `Magazine` mewarisi `LibraryItem` dan masing-masing mengimplementasikan `get_detail()`.
- **Encapsulation:** ID dan status peminjaman disimpan sebagai atribut private. Koleksi perpustakaan juga disimpan dalam `__koleksi`.
- **Polymorphism:** `Library` memanggil `get_detail()` pada berbagai jenis item dengan cara yang sama.
- **Property:** property `id` dan `is_dipinjam` menyediakan akses terkontrol untuk membaca data private.

## Menjalankan Program

Buka terminal di folder `tugas_perpustakaan`, lalu jalankan:

```bash
python main.py
```

## Screenshot Output

Gambar berikut menampilkan output eksekusi program, termasuk penambahan item, katalog, pencarian judul dan ID, serta perubahan status ketersediaan.

![Output program perpustakaan](img\screenshot_output.png)
