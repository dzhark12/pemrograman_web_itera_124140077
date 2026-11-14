from abc import ABC, abstractmethod


class LibraryItem(ABC):
    def __init__(self, id_item: str, judul: str):
        self.__id = id_item
        self.judul = judul
        self.__is_dipinjam = False

    @property
    def id(self) -> str:
        # Mengembalikan ID item.
        return self.__id

    @property
    def is_dipinjam(self) -> bool:
        # Mengembalikan status peminjaman item.
        return self.__is_dipinjam

    @abstractmethod
    def get_detail(self) -> str:
        # Mengembalikan detail item sesuai jenisnya.
        pass

    def pinjam(self) -> bool:
        # Mengubah status menjadi dipinjam jika item tersedia.
        if not self.__is_dipinjam:
            self.__is_dipinjam = True
            return True
        return False

    def kembalikan(self) -> bool:
        # Mengubah status menjadi tersedia jika item sedang dipinjam.
        if self.__is_dipinjam:
            self.__is_dipinjam = False
            return True
        return False


class Book(LibraryItem):
    # Item buku yang menyimpan nama penulis.

    def __init__(self, id_item: str, judul: str, penulis: str):
        # Membuat buku dengan ID, judul, dan penulis.
        super().__init__(id_item, judul)
        self._penulis = penulis

    def get_detail(self) -> str:
        # Mengembalikan detail buku dan status ketersediaannya.
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[Buku] ID: {self.id} | Judul: {self.judul} | Penulis: {self._penulis} | Status: {status}"


class Magazine(LibraryItem):
    # Item majalah yang menyimpan nomor edisi.

    def __init__(self, id_item: str, judul: str, nomor_edisi: int):
        # Membuat majalah dengan ID, judul, dan nomor edisi.
        super().__init__(id_item, judul)
        self._nomor_edisi = nomor_edisi

    def get_detail(self) -> str:
        # Mengembalikan detail majalah dan status ketersediaannya.
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[Majalah] ID: {self.id} | Judul: {self.judul} | Edisi: {self._nomor_edisi} | Status: {status}"
