import { TaskItem } from "./taskItem.js";

const COURSE_KEY = "ruang-kuliah.courses";
const TASK_KEY = "ruang-kuliah.tasks";
const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const WEATHER_LABELS = {
    0: "Cerah", 1: "Cerah berawan", 2: "Berawan", 3: "Mendung",
    45: "Berkabut", 48: "Berkabut", 51: "Gerimis", 53: "Gerimis",
    55: "Gerimis", 61: "Hujan ringan", 63: "Hujan", 65: "Hujan deras",
    80: "Hujan lokal", 81: "Hujan lokal", 82: "Hujan deras", 95: "Badai petir"
};

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const localDateString = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const dayOf = date => new Date(`${date}T12:00:00`).getDay();
const overlaps = (start, end, otherStart, otherEnd) => start < otherEnd && end > otherStart;

export class DashboardApp {
    constructor() {
        this.tasks = this.readStorage(TASK_KEY).map(task => new TaskItem(task));
        this.courses = this.readStorage(COURSE_KEY);
        this.selectedDate = localDateString(new Date());
        this.editingTaskId = null;
        this.editingCourseId = null;

        this.agendaList = document.querySelector("#agendaList");
        this.agendaNotice = document.querySelector("#agendaNotice");
        this.datePicker = document.querySelector("#datePicker");
        this.selectedDateLabel = document.querySelector("#selectedDateLabel");
        this.courseForm = document.querySelector("#courseForm");
        this.taskForm = document.querySelector("#taskForm");
        this.courseFormNotice = document.querySelector("#courseFormNotice");
        this.taskFormNotice = document.querySelector("#taskFormNotice");
        this.deleteDialog = document.querySelector("#deleteDialog");
        this.pendingDelete = null;
        this.taskForm.elements.date.value = this.selectedDate;

        this.bindEvents();
        this.render();
        this.loadWeather();
    }

    readStorage(key) {
        try {
            const stored = localStorage.getItem(key);
            if (stored === null) return [];
            const value = JSON.parse(stored);
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    saveStorage() {
        try {
            localStorage.setItem(COURSE_KEY, JSON.stringify(this.courses));
            localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
            return true;
        } catch {
            this.agendaNotice.textContent = "Perubahan belum tersimpan. Penyimpanan browser mungkin penuh.";
            return false;
        }
    }

    bindEvents() {
        this.courseForm.addEventListener("submit", event => {
            event.preventDefault();
            const { name, day, room, start, end } = Object.fromEntries(new FormData(this.courseForm));
            this.saveCourse({ name, day: Number(day), room, start, end });
        });

        this.taskForm.addEventListener("submit", event => {
            event.preventDefault();
            const { title, course, date, start, end, link } = Object.fromEntries(new FormData(this.taskForm));
            this.saveTask({ title, course, date, start, end, link });
        });

        document.querySelector("#previousDate").addEventListener("click", () => this.shiftDate(-1));
        document.querySelector("#nextDate").addEventListener("click", () => this.shiftDate(1));
        document.querySelector("#goToday").addEventListener("click", () => {
            this.selectedDate = localDateString(new Date());
            this.render();
        });
        this.datePicker.addEventListener("change", () => {
            if (this.datePicker.value) {
                this.selectedDate = this.datePicker.value;
                this.render();
            }
        });

        this.agendaList.addEventListener("click", event => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const { action, type, id } = button.dataset;
            if (action === "edit") this.editEntry(type, id);
            if (action === "delete") this.askDelete(type, id);
            if (action === "toggle") this.toggleTask(id);
        });

        this.deleteDialog.addEventListener("close", () => { this.pendingDelete = null; });
        this.deleteDialog.querySelector("[data-cancel-delete]").addEventListener("click", () => this.deleteDialog.close());
        this.deleteDialog.querySelector("[data-confirm-delete]").addEventListener("click", () => {
            const item = this.pendingDelete;
            this.deleteDialog.close();
            if (item) this.deleteEntry(item.type, item.id);
        });

        document.querySelectorAll("[data-cancel]").forEach(button => {
            button.addEventListener("click", () => this.cancelEdit(button.dataset.cancel));
        });
    }

    shiftDate(amount) {
        const date = new Date(`${this.selectedDate}T12:00:00`);
        date.setDate(date.getDate() + amount);
        this.selectedDate = localDateString(date);
        this.render();
    }

    hasConflict({ date, day, start, end }, type, ignoredId = null) {
        const targetDay = day ?? dayOf(date);
        const matches = (entry, entryType, entryDay) =>
            !(entryType === type && entry.id === ignoredId) &&
            entryDay === targetDay && overlaps(start, end, entry.start, entry.end);

        return [
            ...this.courses.filter(course => matches(course, "course", course.day)),
            ...this.tasks.filter(task => matches(task, "task", dayOf(task.date)))
        ];
    }

    showConflictWarning(conflicts) {
        this.agendaNotice.textContent = conflicts.length
            ? `Jadwal bentrok dengan: ${conflicts.map(item => item.name ?? item.title).join(", ")}. Data tetap disimpan.`
            : "";
    }

    saveCourse({ name, day, room, start, end }) {
        const notice = this.courseFormNotice;
        if (end <= start) {
            notice.textContent = "Jam selesai harus setelah jam mulai.";
            return;
        }
        const id = this.editingCourseId ?? crypto.randomUUID();
        const conflicts = this.hasConflict({ day, start, end }, "course", id);
        this.showConflictWarning(conflicts);
        const course = { id, name: name.trim(), day, room: room.trim(), start, end };
        this.courses = this.editingCourseId
            ? this.courses.map(item => item.id === id ? { ...item, ...course } : item)
            : [...this.courses, course];
        const saved = this.saveStorage();
        this.cancelEdit("course");
        notice.textContent = saved ? "Jadwal kuliah tersimpan." : "Jadwal berubah, tetapi belum tersimpan di browser.";
        this.render();
    }

    normalizeLink(value) {
        if (!value.trim()) return "";
        try {
            const url = new URL(value);
            return ["http:", "https:"].includes(url.protocol) ? url.href : null;
        } catch {
            return null;
        }
    }

    saveTask({ title, course, date, start, end, link }) {
        const notice = this.taskFormNotice;
        if (end <= start) {
            notice.textContent = "Jam selesai harus setelah jam mulai.";
            return;
        }
        const safeLink = this.normalizeLink(link);
        if (safeLink === null) {
            notice.textContent = "Link harus menggunakan alamat http atau https yang valid.";
            return;
        }
        const id = this.editingTaskId ?? crypto.randomUUID();
        const conflicts = this.hasConflict({ date, start, end }, "task", id);
        this.showConflictWarning(conflicts);
        const task = new TaskItem({ id, title: title.trim(), course: course.trim(), date, start, end, link: safeLink, done: this.tasks.find(item => item.id === id)?.done ?? false });
        this.tasks = this.editingTaskId
            ? this.tasks.map(item => item.id === id ? new TaskItem({ ...item, ...task }) : item)
            : [...this.tasks, task];
        const saved = this.saveStorage();
        this.cancelEdit("task");
        notice.textContent = saved ? "Sesi tugas tersimpan." : "Sesi berubah, tetapi belum tersimpan di browser.";
        this.render();
    }

    editEntry(type, id) {
        const form = type === "course" ? this.courseForm : this.taskForm;
        const item = (type === "course" ? this.courses : this.tasks).find(entry => entry.id === id);
        if (!item) return;
        const fields = type === "course"
            ? { name: item.name, day: item.day, room: item.room, start: item.start, end: item.end }
            : { title: item.title, course: item.course, date: item.date, start: item.start, end: item.end, link: item.link };
        Object.entries(fields).forEach(([name, value]) => { form.elements[name].value = value; });
        if (type === "course") {
            this.editingCourseId = id;
            form.querySelector('[type="submit"]').textContent = "Simpan perubahan";
        } else {
            this.editingTaskId = id;
            form.querySelector('[type="submit"]').textContent = "Simpan perubahan";
        }
        form.querySelector("[data-cancel]").hidden = false;
        form.elements.name?.focus();
        form.elements.title?.focus();
    }

    cancelEdit(type) {
        const form = type === "course" ? this.courseForm : this.taskForm;
        if (!form) return;
        if (type === "course") this.editingCourseId = null;
        else this.editingTaskId = null;
        form.reset();
        form.querySelector('[type="submit"]').textContent = type === "course" ? "Tambah jadwal" : "Tambah sesi";
        form.querySelector("[data-cancel]").hidden = true;
        (type === "course" ? this.courseFormNotice : this.taskFormNotice).textContent = "";
    }

    askDelete(type, id) {
        const entry = (type === "course" ? this.courses : this.tasks).find(item => item.id === id);
        if (!entry) return;
        this.pendingDelete = { type, id };
        this.deleteDialog.querySelector("#deleteDialogMessage").textContent =
            `Hapus “${entry.name ?? entry.title}” dari agenda?`;
        this.deleteDialog.showModal();
    }

    deleteEntry(type, id) {
        if (type === "course") this.courses = this.courses.filter(item => item.id !== id);
        else this.tasks = this.tasks.filter(item => item.id !== id);
        this.saveStorage();
        this.agendaNotice.textContent = "Item dihapus dari agenda.";
        this.render();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => task.id === id ? new TaskItem({ ...task, done: !task.done }) : task);
        this.saveStorage();
        this.render();
    }

    render() {
        this.datePicker.value = this.selectedDate;
        if (!this.editingTaskId) this.taskForm.elements.date.value = this.selectedDate;
        this.selectedDateLabel.textContent = new Intl.DateTimeFormat("id-ID", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        }).format(new Date(`${this.selectedDate}T12:00:00`));
        document.querySelector("#todayLabel").textContent = this.selectedDate === localDateString(new Date())
            ? "Agenda hari ini"
            : `Agenda ${new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(`${this.selectedDate}T12:00:00`))}`;
        this.renderAgenda();
    }

    renderAgenda() {
        const day = dayOf(this.selectedDate);
        const entries = [
            ...this.courses.filter(course => course.day === day).map(course => ({
                ...course, type: "course", title: course.name,
                subtitle: `${DAYS[course.day]}${course.room ? ` · ${course.room}` : ""}`
            })),
            ...this.tasks.filter(task => task.date === this.selectedDate).map(task => ({
                ...task, type: "task", subtitle: task.course
            }))
        ].sort((a, b) => a.start.localeCompare(b.start));

        this.agendaList.innerHTML = entries.length ? entries.map(item => {
            let typeLabel = item.type === "course" ? "Kuliah" : "Sesi tugas";
            if (item.type === "task" && item.done) typeLabel = "Tugas · selesai";
            const link = item.type === "task" && item.link
                ? `<a class="agenda-link" href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">Buka link ↗</a>`
                : "";
            const taskActions = item.type === "task"
                ? `<button class="small-button complete" type="button" data-action="toggle" data-id="${escapeHTML(item.id)}">${item.done ? "Belum selesai" : "Selesai"}</button>`
                : "";
            return `<article class="agenda-item ${item.type}${item.done ? " done" : ""}">
        <time class="agenda-time">${escapeHTML(item.start)}–${escapeHTML(item.end)}</time>
        <span class="agenda-rule" aria-hidden="true"></span>
        <div class="agenda-content"><p class="agenda-type">${typeLabel}</p>
          <h3 class="agenda-title">${escapeHTML(item.title)}</h3>
          <div class="agenda-meta"><span>${escapeHTML(item.subtitle)}</span>${link}</div>
        </div>
        <div class="item-actions">
          ${taskActions}
          <button class="small-button" type="button" data-action="edit" data-type="${item.type}" data-id="${escapeHTML(item.id)}">Edit</button>
          <button class="small-button delete" type="button" data-action="delete" data-type="${item.type}" data-id="${escapeHTML(item.id)}">Hapus</button>
        </div>
      </article>`;
        }).join("") : `<div class="empty-state"><strong>Agendamu masih lega.</strong><span>Tambahkan jadwal kuliah atau sesi tugas untuk tanggal ini.</span></div>`;
    }

    async loadWeather() {
        const weather = document.querySelector("#weatherText");
        const detail = document.querySelector("#weatherDetail");
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FJakarta");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const { current, current_units: units } = await response.json();
            weather.textContent = `${WEATHER_LABELS[current.weather_code] ?? "Cuaca saat ini"} · ${current.temperature_2m}${units.temperature_2m}`;
            detail.textContent = `Terasa ${current.apparent_temperature}${units.apparent_temperature} · Angin ${current.wind_speed_10m} ${units.wind_speed_10m}`;
        } catch {
            weather.textContent = "Cuaca belum tersedia";
            detail.textContent = "Agenda tetap bisa dipakai tanpa koneksi.";
        }
    }

}
