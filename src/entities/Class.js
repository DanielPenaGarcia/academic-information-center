import { Student } from './Student.js';
import { Subject } from './Subject.js';

export class Class{

    constructor(id, startTime, duration, description,days,student, subject){
        this.id=id;
        this.startTime=startTime;
        this.duration=duration;
        this.description=description;
        this.days=days;
        this.student=student;
        this.subject=subject;
    }

}