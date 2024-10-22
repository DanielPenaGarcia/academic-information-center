import { Class } from './Class.js';

export class CourseMap{
    constructor(year, semesters, classes=[]){
        this.year=year;
        this.semesters=semesters;
        this.classes=classes;
    }   
}