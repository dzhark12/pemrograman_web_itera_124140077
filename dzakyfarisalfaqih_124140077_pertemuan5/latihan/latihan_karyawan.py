GAJI_MINIMAL = 2000000 


class Karyawan:
    def __init__(self, nama: str, jabatan: str, gaji_pokok: int):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = GAJI_MINIMAL
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self) -> int:
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, gaji_baru: int):
        if gaji_baru < GAJI_MINIMAL:
            raise ValueError(f"Gaji pokok tidak boleh di bawah Rp {GAJI_MINIMAL:,}")
        self.__gaji_pokok = gaji_baru

    def hitung_gaji_bersih(self, pajak_persen: float):
        gaji_bersih = self.gaji_pokok - (self.gaji_pokok * pajak_persen / 100)
        return gaji_bersih


if __name__ == "__main__":
    karyawan = Karyawan("Dzaky", "Staff", 5000000)

    print("Nama Karyawan:", karyawan.nama)
    print("Jabatan:", karyawan.jabatan)
    print("Gaji Pokok: Rp", karyawan.gaji_pokok)
    print("Gaji Bersih: Rp", karyawan.hitung_gaji_bersih(5))

    try:
        karyawan.gaji_pokok = 1500000
    except ValueError as err:
        print(f"Validasi Tertangkap: {err}")
