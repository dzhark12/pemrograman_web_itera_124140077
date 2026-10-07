# Kasir Mini POS

Aplikasi Kasir Mini POS adalah aplikasi berbasis web kasir dan keranjang belanja sederhana untuk kasir kantin dan toko kampus.

## Identitas

- Nama lengkap: Dzaky Faris Al Faqih
- NIM: 124140077
- Kelas praktikum: RB
- Deadline pengumpulan: Rabu, 07 Oktober 2026, pukul 23:59 WIB

## Deskripsi aplikasi
Aplikasi ini digunkan untuk melakukan simulasi kasir toko. Kasir bisa memasukkan nama barang, harga satuan, dan jumlah barang lalu melihat daftar barang di keranjang dan subtotal harganya. Aplikasi menghitung total belanja, diskon, total akhir, dan kembalian berdasarkan jumlah pembayaran.

## Cara menjalankan

```bash
git clone https://github.com/dzhark12/pemrograman_web_itera_124140077.git
cd dzakyfarisalfaqih_124140077_dzakyfarisalfaqih_124140077_pertemuan1
./index.html
```
Atau bisa dengan menggunakan Extension Live Server di Visual Studio Code.

## Fitur

- Validasi nama barang minimal 3 karakter.
- Validasi harga menerima harga minimal Rp500.
- Validasi qty berupa bilangan bulat minimal 1.
- Menambahkan barang ke keranjang.
- Menampilkan nama, harga, qty, dan subtotal barang di tabel keranjang.
- Menghapus barang dari keranjang.
- Menghitung total belanja dan diskon otomatis 10% mulai Rp50.000.
- Memeriksa pembayaran dan menampilkan kembalian atau pesan pembayaran belum cukup.
- Menyimpan keranjang ke localStorage dan memulihkannya setelah halaman dimuat ulang.
- Mengosongkan keranjang saat transaksi baru dimulai.

## Tangkapan layar

### 1. Form input utama

![Form input utama](img/01-form-utama.png)

### 2. Validasi error

![Pesan validasi error](img/02-validasi-error.png)

### 3. Hasil hitungan dan tabel


![Hasil hitungan dan tabel keranjang](img/03-hasil-transaksi.png)


## Penjelasan teknis singkat

### Validasi input

Nama barang dibuang spasi di awal dan di akhir menggunakan fungsi `trim()` lalu diperiksa seberapa panjangnya. Harga dan jumlah diambil dari input sebagai teks lalu dikonversi sebagai angka. Jumlah harus berupa bilangan bulat. Jika input tidak valid maka pesan kesalahan akan ditampilkan di nawah kolom

### Perhitungan transaksi
Subtotal tiap barang dihitung dari harga dikali jumlah. Total belanja adalah jumlah dari seluruh subtotal. Jika total belanja mencapai Rp50.000, belanjaan akan mendapatkan diskon sebesar 10%. Total akhir adalah total belanja setelah diskon. Jika pembayaran cukup, aplikasi menghitung kembalian dari pembayaran dikurang total akhir

### localStorage
Array keranjang disimpan sebagai teks JSON menggunakan `Json.stringify()`. Saat halaman dibuka, data dibaca kembali menggunakan `JSON.parse()`. Tombol transaksi baru menghapus keranjang dan data tersimpan