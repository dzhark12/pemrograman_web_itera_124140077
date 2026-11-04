# menghitung luas dan keliling berbagai bentuk geometri

# fungsi untuk menghitung luas dan keliling lingkaran dengan menggunakan jari-jari, dan nilai pi = 3.14
def luas_lingkaran(jari_jari):
    return 3.14 * jari_jari ** 2

# fungsi untuk menghitung keliling lingkaran dengan menggunakan jari-jari, dan nilai pi = 3.14
def keliling_lingkaran(jari_jari):
    return 2 * 3.14 * jari_jari

# fungsi untuk menghitung luas dan keliling persegi dengan menggunakan panjang sisi
def luas_persegi(sisi):
    return sisi ** 2

# fungsi untuk menghitung keliling persegi dengan menggunakan panjang sisi
def keliling_persegi(sisi):
    return 4 * sisi

# fungsi untuk menghitung luas dan keliling segitiga dengan menggunakan alas, tinggi, dan panjang sisi
def luas_segitiga(alas, tinggi):
    return 0.5 * alas * tinggi

# fungsi untuk menghitung keliling segitiga dengan menggunakan panjang sisi
def keliling_segitiga(sisi1, sisi2, sisi3):
    return sisi1 + sisi2 + sisi3

# fungsi untuk menghitung luas dan keliling persegi panjang dengan menggunakan panjang dan lebar
def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

# fungsi untuk menghitung keliling persegi panjang dengan menggunakan panjang dan lebar
def keliling_persegi_panjang(panjang, lebar):
    return 2 * (panjang + lebar)

# fungsi untuk menghitung luas dan keliling trapesium dengan menggunakan panjang sisi dan tinggi
def luas_trapesium(sisi1, sisi2, tinggi):
    return 0.5 * (sisi1 + sisi2) * tinggi

# fungsi untuk menghitung keliling trapesium dengan menggunakan panjang sisi
def keliling_trapesium(sisi1, sisi2, sisi3, sisi4):
    return sisi1 + sisi2 + sisi3 + sisi4

# fungsi untuk menghitung luas dan keliling jajar genjang dengan menggunakan alas, tinggi, dan panjang sisi
def luas_jajar_genjang(alas, tinggi):
    return alas * tinggi

# fungsi untuk menghitung keliling jajar genjang dengan menggunakan panjang sisi
def keliling_jajar_genjang(sisi1, sisi2):
    return 2 * (sisi1 + sisi2)

# fungsi untuk menghitung luas dan keliling belah ketupat dengan menggunakan diagonal dan panjang sisi
def luas_belah_ketupat(diagonal1, diagonal2):
    return 0.5 * diagonal1 * diagonal2

# fungsi untuk menghitung keliling belah ketupat dengan menggunakan panjang sisi
def keliling_belah_ketupat(sisi):
    return 4 * sisi

# fungsi untuk menghitung luas dan keliling layang-layang dengan menggunakan diagonal dan panjang sisi
def luas_layang_layang(diagonal1, diagonal2):
    return 0.5 * diagonal1 * diagonal2

# fungsi untuk menghitung keliling layang-layang dengan menggunakan panjang sisi
def keliling_layang_layang(sisi1, sisi2):
    return 2 * (sisi1 + sisi2)
