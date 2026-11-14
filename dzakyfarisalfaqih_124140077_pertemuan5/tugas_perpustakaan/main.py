from library import Library
from library_item import Book, Magazine


if __name__ == "__main__":
    perpustakaan = Library()

    buku_1 = Book("B001", "Laskar Pelangi", "Andrea Hirata")
    buku_2 = Book("B002", "Bumi Manusia", "Pramoedya Ananta Toer")
    majalah_1 = Magazine("M001", "National Geographic", 128)

    print("# Menambahkan Item")
    perpustakaan.tambah_item(buku_1)
    perpustakaan.tambah_item(buku_2)
    perpustakaan.tambah_item(majalah_1)

    print("\n# Menampilkan Katalog")
    perpustakaan.tampilkan_katalog()

    print("\n# Mencari Berdasarkan Judul")
    hasil_judul = perpustakaan.cari_item("bumi")
    for item in hasil_judul:
        print(item.get_detail())

    print("\n# Mencari Berdasarkan ID")
    hasil_id = perpustakaan.cari_item("M001")
    for item in hasil_id:
        print(item.get_detail())

    print("\n# Demonstrasi Status Ketersediaan")
    buku_1.pinjam()
    perpustakaan.tampilkan_katalog()
