import { latiniseString } from "./latinise-string.function.js";

export function createAcademicEmail({ name, fatherLastName, academicId }) {
    if (!name){
        throw new Error('Name is required');
    }
    if (!fatherLastName){
        throw new Error('Father last name is required');
    }
    if (!academicId){
        throw new Error('Academic id is required');
    }
    const domain = 'potros.itson.edu.mx';
    const id = removeFirstDigits(academicId, 5);
    let firstName = hasSpaces(name) ? name.split(' ')[0] : name;
    firstName = latiniseString(firstName).toLowerCase();
    let LastName = hasSpaces(fatherLastName) ? fatherLastName.split(' ')[0] : fatherLastName;
    LastName = latiniseString(LastName).toLowerCase();
    const email = `${firstName}.${LastName}${id}@${domain}`;
    return email.toLowerCase();
}

const hasSpaces = (str) => {
    return /\s/.test(str);
}

const removeFirstDigits = (str, count) => {
    if (str.length <= count) {
        return str;
    }
    return str.slice(count);
}