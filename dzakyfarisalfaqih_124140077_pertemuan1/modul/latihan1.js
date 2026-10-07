const nama = "Dzaky Faris Alfaqih";
let umur = 21;
let kotaAsal = "Lampung Timur";

console.log("Data Diri");
console.log(`Nama: ${nama}`);
console.log(`Umur: ${umur} tahun`);
console.log(`Kota asal: ${kotaAsal}`);

const nilaiKelulusan = 85;
console.log("\nKelulusan");
if (nilaiKelulusan >= 70) {
    console.log(`Nilai ${nilaiKelulusan}: Lulus`);
} else {
    console.log(`Nilai ${nilaiKelulusan}: Tidak lulus`);
}

const umurUntukKategori = 21;
let kategoriUmur;
if (umurUntukKategori < 12) {
    kategoriUmur = "anak";
} else if (umurUntukKategori <= 17) {
    kategoriUmur = "remaja";
} else if (umurUntukKategori <= 59) {
    kategoriUmur = "dewasa";
} else {
    kategoriUmur = "lansia";
}
console.log("\nKategori Umur");
console.log(`Umur ${umurUntukKategori} tahun termasuk ${kategoriUmur}.`);

const angkaHari = 3;
let namaHari;
switch (angkaHari) {
    case 1:
        namaHari = "Monday";
        break;
    case 2:
        namaHari = "Tuesday";
        break;
    case 3:
        namaHari = "Wednesday";
        break;
    case 4:
        namaHari = "Thursday";
        break;
    case 5:
        namaHari = "Friday";
        break;
    case 6:
        namaHari = "Saturday";
        break;
    case 7:
        namaHari = "Sunday";
        break;
    default:
        namaHari = "Angka harus antara 1 dan 7.";
}
console.log("\nNama Hari");
console.log(namaHari);

// Rentang: A (90+), B (80-89), C (70-79), D (60-69), E (<60)
const nilaiGrade = 91;
const grade =
    nilaiGrade >= 90 ? "A" :
        nilaiGrade >= 80 ? "B" :
            nilaiGrade >= 70 ? "C" :
                nilaiGrade >= 60 ? "D" : "E";
console.log("\nGrade");
console.log(`Nilai ${nilaiGrade}: Grade ${grade}`);
