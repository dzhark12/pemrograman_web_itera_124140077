from abc import ABC, abstractmethod


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file: str):
        pass


class LocalDiskStorage(FileStorage):
    def __init__(self):
        self.file = {}

    def upload_file(self, nama_file: str, data_bytes: bytes):
        self.file[nama_file] = data_bytes
        print(f"File {nama_file} berhasil disimpan di folder lokal")

    def download_file(self, nama_file: str):
        if nama_file in self.file:
            print(f"File {nama_file} berhasil diunduh dari folder lokal")
            return self.file[nama_file]
        else:
            print(f"File {nama_file} tidak ditemukan di folder lokal")
            return None


class CloudStorage(FileStorage):
    def __init__(self):
        self.file = {}

    def upload_file(self, nama_file: str, data_bytes: bytes):
        self.file[nama_file] = data_bytes
        print(f"File {nama_file} berhasil disimpan di server cloud")

    def download_file(self, nama_file: str):
        if nama_file in self.file:
            print(f"File {nama_file} berhasil diunduh dari server cloud")
            return self.file[nama_file]
        else:
            print(f"File {nama_file} tidak ditemukan di server cloud")
            return None


if __name__ == "__main__":
    penyimpanan_lokal = LocalDiskStorage()
    penyimpanan_cloud = CloudStorage()
    data = b"Contoh isi file"

    penyimpanan_lokal.upload_file("catatan.txt", data)
    print("Isi file lokal:", penyimpanan_lokal.download_file("catatan.txt"))

    penyimpanan_cloud.upload_file("catatan.txt", data)
    print("Isi file cloud:", penyimpanan_cloud.download_file("catatan.txt"))
