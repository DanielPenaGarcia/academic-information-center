export class Person {
  constructor(name, fatherLastname, motherLastname, curp, createdAt = null, updatedAt = null) {
    this.name = name;
    this.fatherLastname = fatherLastname;
    this.motherLastname = motherLastname;
    this.curp = curp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
