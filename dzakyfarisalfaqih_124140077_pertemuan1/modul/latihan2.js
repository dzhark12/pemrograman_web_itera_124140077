const angkaPilihan = 7;
console.log(`Tabel Perkalian ${angkaPilihan}`);
for (let i = 1; i <= 10; i++) {
    console.log(`${angkaPilihan} x ${i} = ${angkaPilihan * i}`);
}

function faktorial(angka) {
    if (!Number.isInteger(angka) || angka < 0) {
        return "Masukkan bilangan bulat nonnegatif.";
    }

    let hasil = 1;
    for (let i = 2; i <= angka; i++) {
        hasil *= i;
    }
    return hasil;
}

console.log("\nFaktorial");
console.log(`5! = ${faktorial(5)}`);

function cekPrima(angka) {
    if (!Number.isInteger(angka) || angka < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(angka); i++) {
        if (angka % i === 0) {
            return false;
        }
    }
    return true;
}

console.log("\nBilangan Prima");
console.log(`Apakah 17 prima? ${cekPrima(17) ? "Ya" : "Tidak"}`);

function hitungBMI(beratKg, tinggiMeter) {
    if (!Number.isFinite(beratKg) || !Number.isFinite(tinggiMeter) || beratKg <= 0 || tinggiMeter <= 0) {
        return null;
    }
    return beratKg / (tinggiMeter * tinggiMeter);
}

if (typeof document !== "undefined") {
    const formBMI = document.getElementById("form-bmi");

    if (formBMI) {
        formBMI.addEventListener("submit", function (event) {
            event.preventDefault();

            const berat = Number(document.getElementById("berat-bmi").value);
            const tinggi = Number(document.getElementById("tinggi-bmi").value);
            const elemenHasil = document.getElementById("hasil-bmi");
            const bmi = hitungBMI(berat, tinggi);

            if (bmi === null) {
                elemenHasil.textContent = "Masukkan berat dan tinggi yang valid.";
                return;
            }

            elemenHasil.textContent = `BMI Anda: ${bmi.toFixed(2)}`;
        });
    }
}

console.log("\nFizzBuzz");
for (let angka = 1; angka <= 100; angka++) {
    if (angka % 3 === 0 && angka % 5 === 0) {
        console.log("FizzBuzz");
    } else if (angka % 3 === 0) {
        console.log("Fizz");
    } else if (angka % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(angka);
    }
}
