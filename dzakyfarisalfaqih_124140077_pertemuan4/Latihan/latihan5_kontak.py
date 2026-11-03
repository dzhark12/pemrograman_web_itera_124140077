kontak = {}
while True:
    print("1. Tambah Kontak")
    print("2. Cari Nomor")
    print("3. Tampilkan Semua Kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu (1/2/3/4): ")
    if pilihan == "1":
        nama = input("Masukkan nama: ")
        nomor = input("Masukkan nomor telepon: ")
        kontak[nama] = nomor
        print(f"Kontak {nama} berhasil ditambahkan.")
    elif pilihan == "2":
        nama = input("Masukkan nama yang dicari: ")
        if nama in kontak:
            print(f"Nomor telepon {nama}: {kontak[nama]}")
        else:
            print(f"Kontak {nama} tidak ditemukan.")
    elif pilihan == "3":
        if kontak:
            print("Daftar Kontak:")
            for nama, nomor in kontak.items():
                print(f"{nama}: {nomor}")
        else:
            print("Tidak ada kontak yang tersimpan.")
    elif pilihan == "4":
        break