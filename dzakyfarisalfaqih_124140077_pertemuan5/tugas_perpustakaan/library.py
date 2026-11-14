from library_item import LibraryItem


class Library:
    def __init__(self):
        self.__koleksi = []

    def tambah_item(self, item: LibraryItem):
        # Menambahkan item dan menolak tipe atau ID yang tidak valid.
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan turunan LibraryItem")
        if any(item_lama.id == item.id for item_lama in self.__koleksi):
            raise ValueError(f"ID item {item.id} sudah digunakan")
        self.__koleksi.append(item)
        print(f"Item dengan ID {item.id} berhasil ditambahkan")

    def tampilkan_katalog(self):
        # Menampilkan semua item yang saat ini tersedia.
        print("--- Katalog Item Tersedia ---")
        item_tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not item_tersedia:
            print("Tidak ada item yang tersedia")
            return
        for item in item_tersedia:
            print(item.get_detail())

    def cari_item(self, kata_kunci: str) -> list:
        # Mencari item berdasarkan ID tepat atau sebagian judul.
        kata_kunci = kata_kunci.casefold()
        return [
            item for item in self.__koleksi
            if item.id.casefold() == kata_kunci or kata_kunci in item.judul.casefold()
        ]
