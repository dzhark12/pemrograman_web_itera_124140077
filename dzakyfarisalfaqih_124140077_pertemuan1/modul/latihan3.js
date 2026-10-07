let daftarMahasiswa = [
    { nama: "Dzaky Faris Al Faqih", nim: "124140077", jurusan: "Teknik Informatika", nilai: 88 },
    { nama: "Feldy", nim: "12414083", jurusan: "Teknik Informatika", nilai: 92 },
    { nama: "Jhon Kevin Hamonangan Tambun", nim: "124140073", jurusan: "Teknik Informatika", nilai: 89 },
    { nama: "Aditya Kristian Novalino", nim: "124140079", jurusan: "Teknik Informatika", nilai: 90 },
    { nama: "Christopher Leon Saputra", nim: "124140097", jurusan: "Teknik Informatika", nilai: 91 },
];

function cariNilaiTertinggi(mahasiswa) {
    if (mahasiswa.length === 0) return null;
    return mahasiswa.reduce((tertinggi, saatIni) =>
        saatIni.nilai > tertinggi.nilai ? saatIni : tertinggi
    );
}

function cariDiAtasRataRata(mahasiswa) {
    if (mahasiswa.length === 0) return [];
    const rataRata = mahasiswa.reduce((total, item) => total + item.nilai, 0) / mahasiswa.length;
    return mahasiswa.filter((item) => item.nilai > rataRata);
}

function urutkanBerdasarkanNama(mahasiswa, arah = "asc") {
    const faktor = arah === "desc" ? -1 : 1;
    return [...mahasiswa].sort((a, b) => faktor * a.nama.localeCompare(b.nama, "id"));
}

console.log("Mahasiswa dengan nilai tertinggi:", cariNilaiTertinggi(daftarMahasiswa));
console.log("Mahasiswa di atas rata-rata:", cariDiAtasRataRata(daftarMahasiswa));
console.log("Urut nama (ascending):", urutkanBerdasarkanNama(daftarMahasiswa, "asc"));
console.log("Urut nama (descending):", urutkanBerdasarkanNama(daftarMahasiswa, "desc"));

function escapeHTML(teks) {
    return String(teks).replace(/[&<>"']/g, (karakter) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[karakter]);
}

function tampilkanMahasiswa() {
    if (typeof document === "undefined") return;

    const badanTabel = document.getElementById("tabel-mahasiswa");
    if (badanTabel) {
        const arah = document.getElementById("urutan-nama")?.value || "asc";
        badanTabel.innerHTML = urutkanBerdasarkanNama(daftarMahasiswa, arah)
            .map((m) => `
        <tr>
        <td>${escapeHTML(m.nama)}</td>
        <td>${escapeHTML(m.nim)}</td>
        <td>${escapeHTML(m.jurusan)}</td>
        <td>${m.nilai}</td>
        <td>
            <button type="button" data-aksi="edit" data-nim="${escapeHTML(m.nim)}">Edit</button>
            <button type="button" data-aksi="hapus" data-nim="${escapeHTML(m.nim)}">Hapus</button>
        </td>
        </tr>`)
            .join("");
    }

    const mahasiswaTertinggi = cariNilaiTertinggi(daftarMahasiswa);
    const elemenTertinggi = document.getElementById("nilai-tertinggi");
    if (elemenTertinggi) {
        elemenTertinggi.textContent = mahasiswaTertinggi
            ? `${mahasiswaTertinggi.nama} (${mahasiswaTertinggi.nilai})`
            : "Belum ada data mahasiswa.";
    }

    const elemenDiAtasRataRata = document.getElementById("mahasiswa-di-atas-rata-rata");
    if (elemenDiAtasRataRata) {
        elemenDiAtasRataRata.textContent = cariDiAtasRataRata(daftarMahasiswa)
            .map((m) => `${m.nama} (${m.nilai})`)
            .join(", ") || "Tidak ada mahasiswa di atas rata-rata.";
    }
}

if (typeof document !== "undefined") {
    const form = document.getElementById("form-mahasiswa");
    const tombolBatal = document.getElementById("batal-edit");
    let nimSedangDiedit = null;

    function resetForm() {
        if (form) form.reset();
        nimSedangDiedit = null;
        if (tombolBatal) tombolBatal.hidden = true;
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const nama = document.getElementById("nama-mahasiswa").value.trim();
            const nim = document.getElementById("nim-mahasiswa").value.trim();
            const jurusan = document.getElementById("jurusan-mahasiswa").value.trim();
            const nilai = Number(document.getElementById("nilai-mahasiswa").value);

            if (!nama || !nim || !jurusan || !Number.isFinite(nilai) || nilai < 0 || nilai > 100) {
                alert("Lengkapi semua data. Nilai harus berada antara 0 dan 100.");
                return;
            }

            const nimDuplikat = daftarMahasiswa.some((m) => m.nim === nim && m.nim !== nimSedangDiedit);
            if (nimDuplikat) {
                alert("NIM sudah terdaftar.");
                return;
            }

            const dataBaru = { nama, nim, jurusan, nilai };
            if (nimSedangDiedit) {
                daftarMahasiswa = daftarMahasiswa.map((m) => m.nim === nimSedangDiedit ? dataBaru : m);
            } else {
                daftarMahasiswa.push(dataBaru);
            }

            resetForm();
            tampilkanMahasiswa();
        });
    }

    const badanTabel = document.getElementById("tabel-mahasiswa");
    if (badanTabel) {
        badanTabel.addEventListener("click", (event) => {
            const tombol = event.target.closest("button[data-aksi]");
            if (!tombol) return;

            const mahasiswa = daftarMahasiswa.find((m) => m.nim === tombol.dataset.nim);
            if (!mahasiswa) return;

            if (tombol.dataset.aksi === "hapus") {
                daftarMahasiswa = daftarMahasiswa.filter((m) => m.nim !== mahasiswa.nim);
                if (nimSedangDiedit === mahasiswa.nim) resetForm();
                tampilkanMahasiswa();
            } else if (tombol.dataset.aksi === "edit" && form) {
                document.getElementById("nama-mahasiswa").value = mahasiswa.nama;
                document.getElementById("nim-mahasiswa").value = mahasiswa.nim;
                document.getElementById("jurusan-mahasiswa").value = mahasiswa.jurusan;
                document.getElementById("nilai-mahasiswa").value = mahasiswa.nilai;
                nimSedangDiedit = mahasiswa.nim;
                if (tombolBatal) tombolBatal.hidden = false;
            }
        });
    }

    if (tombolBatal) {
        tombolBatal.addEventListener("click", resetForm);
    }

    const pilihanUrutan = document.getElementById("urutan-nama");
    if (pilihanUrutan) pilihanUrutan.addEventListener("change", tampilkanMahasiswa);

    tampilkanMahasiswa();
}
