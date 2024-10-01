import { Class } from './Class.js';

export class Subject{
    constructor(id, name, hoursPerWeek, semester, classes=[]){
        this.id=id;
        this.name=name;
        this.hoursPerWeek=hoursPerWeek;
        this.semester=semester;
        this.classes=classes;
    }
}