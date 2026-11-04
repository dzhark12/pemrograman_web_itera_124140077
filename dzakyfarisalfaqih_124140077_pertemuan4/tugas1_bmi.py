# melakukan input dari pengguna untuk berat badan dan tinggi badan, kemudian menghitung BMI menggunakan rumus BMI
berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m): "))
BMI = berat_badan / (tinggi_badan * tinggi_badan)


# output hasil perhitungan BMI dan kategori berat badan berdasarkan nilai BMI
print("BMI Anda adalah:", f"{BMI:.2f}")

if BMI < 18.5:
    print("Berat badan kurang")
elif BMI >= 18.5 and BMI < 25:
    print("Berat badan normal")
elif BMI >= 25 and BMI < 30:
    print("Berat badan berlebih")
else:
    print("Obesitas")
