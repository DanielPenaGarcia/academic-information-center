import { User } from './User.js';
import { Class } from './Class.js';
import { Subject } from './Subject.js';

export class Teacher extends User{
    constructor(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo,classes=[], subjects=[]){
        super(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo);
        this.classes=classes;
        this.subjects=subjects;
    }
}