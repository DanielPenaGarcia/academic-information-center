import { User } from './User.js';
import { EnrollmentAppointment } from './EnrollmentAppointment.js';


export class Student extends User{
    constructor(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo,enrollmentAppointments=[]){
        super(id,name,fatherLastname, motherLastname,curp, email, password, academicId,photo);
        this.enrollmentAppointments=enrollmentAppointments;
    }
}