# list data mahasiswa
data_mhs = [{"nama": "Dzaky Faris Al Faqih", "nim": "124140077", "nilai_uts": 80, "nilai_uas": 90, "nilai_tugas": 85},
            {"nama": "Feldy", "nim": "124140083", "nilai_uts": 85, "nilai_uas": 88, "nilai_tugas": 89},
            {"nama": "Jhon Kevin H. Tambun", "nim": "124140073", "nilai_uts": 90, "nilai_uas": 85, "nilai_tugas": 95},
            {"nama": "Yabes Situmorang", "nim": "124140067", "nilai_uts": 85, "nilai_uas": 80, "nilai_tugas": 90},
            {"nama": "Erhan Kurniawan", "nim": "124140217", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80}]


# menghitung nilai akhir dan grade untuk setiap mahasiswa, serta mencari nilai tertinggi dan terendah
for mhs in data_mhs:
    nilai_akhir = (mhs["nilai_uts"] * 0.3) + (mhs["nilai_uas"] * 0.4) + (mhs["nilai_tugas"] * 0.3)
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70 and nilai_akhir < 80:
        grade = "B"
    elif nilai_akhir >= 60 and nilai_akhir < 70:
        grade = "C"
    elif nilai_akhir >= 50 and nilai_akhir < 60:
        grade = "D"
    else:
        grade = "E"
    mhs["nilai_akhir"] = nilai_akhir
    mhs["grade"] = grade
    
tertinggi = max(data_mhs, key=lambda x: x["nilai_akhir"])
terendah = min(data_mhs, key=lambda x: x["nilai_akhir"])

# menampilkan hasil perhitungan nilai akhir dan grade untuk setiap mahasiswa, serta nilai tertinggi dan terendah
print("-" * 40)
for mhs in data_mhs:
    print(f"Nama\t\t: {mhs['nama']}\nNIM\t\t: {mhs['nim']}\nNilai Akhir\t: {mhs['nilai_akhir']:.2f}\nGrade\t\t: {mhs['grade']}")
    print("-" * 40)

print(f"Nilai Akhir Tertinggi: {tertinggi['nama']}, {tertinggi['nilai_akhir']:.2f}")
print(f"Nilai Akhir Terendah: {terendah['nama']}, {terendah['nilai_akhir']:.2f}")

