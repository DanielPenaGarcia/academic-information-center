export class Person {
  constructor({
    names,
    fatherLastName,
    motherLastName,
    curp,
    createdAt = null,
    updatedAt = null,
  }) {
    this.names = names;
    this.fatherLastName = fatherLastName;
    this.motherLastName = motherLastName;
    this.curp = curp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
