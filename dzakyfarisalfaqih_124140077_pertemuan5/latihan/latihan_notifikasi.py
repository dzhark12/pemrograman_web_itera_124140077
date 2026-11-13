class NotifikasiEmail:
    def __init__(self, penerima: str):
        self.penerima = penerima

    def kirim(self, pesan: str, penerima: str):
        print(f"[Email] Mengirim ke {penerima}: {pesan}")


class NotifikasiSMS:
    def __init__(self, penerima: str):
        self.penerima = penerima

    def kirim(self, pesan: str, penerima: str):
        print(f"[SMS] Mengirim ke {penerima}: {pesan}")


class NotifikasiWhatsApp:
    def __init__(self, penerima: str):
        self.penerima = penerima

    def kirim(self, pesan: str, penerima: str):
        print(f"[WhatsApp] Mengirim ke {penerima}: {pesan}")


def broadcast_pengumuman(daftar_channel: list, pesan: str):
    for channel in daftar_channel:
        channel.kirim(pesan, channel.penerima)


if __name__ == "__main__":
    email = NotifikasiEmail("dzaky@example.com")
    sms = NotifikasiSMS("088286086844")
    whatsapp = NotifikasiWhatsApp("0882860868440")

    daftar_channel = [email, sms, whatsapp]
    broadcast_pengumuman(daftar_channel, "PENGUMUMAN DARURAT: Harap segera menuju titik kumpul.")
