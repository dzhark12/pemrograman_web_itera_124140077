target = 5
hitung = int(input("Masukkan angka target (1-10): "))
while True:
    print(f"Memeriksa nilai: {hitung}...")
    if hitung == target:
        print("Selamat, tebakan benar!")
        break
    elif hitung < target:
        print("Terlalu kecil!")
    else:
        print("Terlalu besar!")
    hitung = int(input("Masukkan angka target (1-10): "))