class SubjectItem {

    constructor({id, name, hours, semester, courseMap: { year }}) {
        this.id = id;
        this.name = name;
        this.hours = hours;
        this.semester = semester;
        this.year = year;
    }

    render() {
        return `
            <div id=${this.id} class="subject-item ">
                <div class="subject-item__name">${this.name}</div>
                <div class="subject-item__hours">${this.hours}</div>
                <div class="subject-item__semester">${this.semester}</div>
                <div class="subject-item__year">${this.year}</div>
            </div>
        `;
    }
}

export default SubjectItem;