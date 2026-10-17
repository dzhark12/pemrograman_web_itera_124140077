export class TaskItem {
    constructor({ id = crypto.randomUUID(), title, course, date, start, end, link = "", done = false } = {}) {
        Object.assign(this, { id, title, course, date, start, end, link, done });
    }
}
