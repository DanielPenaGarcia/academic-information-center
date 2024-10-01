import { User } from './User.js';

export class Admin extends User{
    constructor(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo){
        super(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo);
    }
}