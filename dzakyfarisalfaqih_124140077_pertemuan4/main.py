import math_operations
from math_operations import luas_persegi
from math_operations import keliling_persegi
from math_operations import luas_lingkaran
from math_operations import keliling_lingkaran

# print luas dan keliling lingkaran menggunakan print dan fungsi luas_lingkaran dan keliling_lingkaran dari math_operations.py
print("Luas Lingkaran dengan jari-jari 5:", luas_lingkaran(5))
print("Keliling Lingkaran dengan jari-jari 5:", keliling_lingkaran(5), "\n")

# print luas dan keliling persegi menggunakan print dan fungsi luas_persegi dan keliling_persegi dari math_operations.py
print("Luas Persegi dengan sisi 4:", luas_persegi(4))
print("Keliling Persegi dengan sisi 4:", keliling_persegi(4), "\n")

# print luas dan keliling segitiga menggunakan print dan fungsi luas_segitiga dan keliling_segitiga dari math_operations.py
print("Luas Segitiga dengan alas 6 dan tinggi 8:", math_operations.luas_segitiga(6, 8))
print("Keliling Segitiga dengan sisi 3, 4, dan 5:", math_operations.keliling_segitiga(3, 4, 5), "\n")

# print luas dan keliling persegi panjang menggunakan print dan fungsi luas_persegi_panjang dan keliling_persegi_panjang dari math_operations.py
print("Luas Persegi Panjang dengan panjang 5 dan lebar 3:", math_operations.luas_persegi_panjang(5, 3))
print("Keliling Persegi Panjang dengan panjang 5 dan lebar 3:", math_operations.keliling_persegi_panjang(5, 3), "\n")

# print luas dan keliling trapesium menggunakan print dan fungsi luas_trapesium dan keliling_trapesium dari math_operations.py
print("Luas Trapesium dengan sisi 4, sisi 6, dan tinggi 5:", math_operations.luas_trapesium(4, 6, 5))
print("Keliling Trapesium dengan sisi 4, sisi 6, sisi 5, dan sisi 7:", math_operations.keliling_trapesium(4, 6, 5, 7), "\n")

# print luas dan keliling jajar genjang menggunakan print dan fungsi luas_jajar_genjang dan keliling_jajar_genjang dari math_operations.py
print("Luas Jajar Genjang dengan alas 8 dan tinggi 4:", math_operations.luas_jajar_genjang(8, 4))
print("Keliling Jajar Genjang dengan sisi 5 dan sisi 7:", math_operations.keliling_jajar_genjang(5, 7), "\n")

# print luas dan keliling belah ketupat menggunakan print dan fungsi luas_belah_ketupat dan keliling_belah_ketupat dari math_operations.py
print("Luas Belah Ketupat dengan diagonal 6 dan diagonal 8:", math_operations.luas_belah_ketupat(6, 8))
print("Keliling Belah Ketupat dengan sisi 5:", math_operations.keliling_belah_ketupat(5), "\n")

# print luas dan keliling layang-layang menggunakan print dan fungsi luas_layang_layang dan keliling_layang_layang dari math_operations.py
print("Luas Layang-Layang dengan diagonal 7 dan diagonal 9:", math_operations.luas_layang_layang(7, 9))
print("Keliling Layang-Layang dengan sisi 4 dan sisi 6:", math_operations.keliling_layang_layang(4, 6), "\n")
