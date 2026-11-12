class Buku:
    def __init__(self, judul: str, penulis: str, harga_asli: int, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float):
        # Persen dibagi 100 untuk mengubah nilai persentase menjadi pecahan.
        harga_diskon = self.harga_asli - (self.harga_asli * persen / 100)
        return harga_diskon

    def print_detail_buku(self):
        print (f"Judul: {self.judul} | Penulis: {self.penulis} | Harga: {self.harga_asli} | Jumlah Halaman: {self.jumlah_halaman}")

    def print_jumlah_halaman(self):
        print(f"Jumlah Halaman: {self.jumlah_halaman}") 
