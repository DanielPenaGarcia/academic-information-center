class ClassItem{
    constructor({id, start_time, duration, days, subject: { name }, teacher: { id: teacherId }}) {
        this.id = id;
        this.startTime = start_time;
        this.duration = duration;
        this.days = days;
        this.subject = name;
        this.teacherId = teacherId;
    }

    render() {
        return `
            <div id=${this.id} class="class-item">
                <div class="class-item__start-time">${this.startTime}</div>
                <div class="class-item__duration">${this.duration}</div>
                <div class="class-item__days">${this.days}</div>
                <div class="class-item__subject">${this.subject}</div>
                <div class="class-item__teacher-id">${this.teacherId}</div>
            </div>
        `;
    }

}

export default ClassItem;