class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(f"[{self.merek}] Menempuh perjalanan +{km} km. Total Odo: {self.odometer} km")
        else:
            print("Nilai kilometer tambahan tidak valid")

    def klakson(self) -> str:
        return "Tin tin!"


class Truk(Kendaraan):
    def __init__(self, merek: str, model: str, tahun: int, kapasitas_maksimal_ton: float):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float):
        if berat_ton > 0 and self.muatan_saat_ini + berat_ton <= self.kapasitas_maksimal_ton:
            self.muatan_saat_ini += berat_ton
        else:
            print("Muatan melebihi kapasitas maksimal truk atau berat tidak valid!")

    def deskripsi(self) -> str:
        return f"{super().deskripsi()} [Muatan: {self.muatan_saat_ini} ton / {self.kapasitas_maksimal_ton} ton]"


if __name__ == "__main__":
    truk = Truk("Mitsubishi", "Fuso", 2024, kapasitas_maksimal_ton=10.0)
    truk.muat_barang(4.5)
    print(truk.deskripsi())
