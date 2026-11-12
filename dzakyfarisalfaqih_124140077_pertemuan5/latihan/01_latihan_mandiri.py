class Produk:
    def __init__(self, nama: str, harga: int, stok: int):
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def cetak_detail(self):
        print(f"Nama Barang: {self.nama}| Harga: {self.harga} | Stok: {self.stok}")

    def update_harga(self, harga_baru:int):
        if harga_baru >= 0:
            self.harga = harga_baru
        else:
            print("Harga tidak boleh negatif")

class Pembeli:
    def __init__(self, nama:str, alamat:str, uang:int):
        self.nama = nama
        self.alamat = alamat
        self.uang = uang

    def beli_barang(self, uang: int, harga_barang: int):
        if uang >= harga_barang:
            self.uang = self.uang - harga_barang
        else:
            print("Uang tidak cukup")

    def update_uang(self, uang_baru):
        if uang_baru >= 0:
            self.uang = uang_baru

class Keranjang:
    def __init__(self, nama_pemilik:str, jumlah_item:int, total_harga:int):
        self.nama_pemilik = nama_pemilik
        self.jumlah_item = jumlah_item
        self.total_harga = total_harga

    def tambah_barang(self, banyak_barang:int, total_harga_tambahan:int):
        if banyak_barang >= 0:
            self.jumlah_item = self.jumlah_item + banyak_barang
            if total_harga_tambahan >= 0:
                self.total_harga = self.total_harga + total_harga_tambahan

    def kurangi_barang(self, banyak_barang:int, total_harga_berkurang:int):
        if self.jumlah_item > 0:
            self.jumlah_item = self.jumlah_item - banyak_barang
            self.total_harga = self.total_harga - total_harga_berkurang
