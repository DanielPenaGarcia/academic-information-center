import { where } from "./query-builder/condition.builder.js";
import { JoinTypes } from "./query-builder/query.js";
import { ReviewRepository } from "./repositories/review.repository.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";

const teacherRepository = new TeacherRepository();

const result = await teacherRepository.find({
  fields: ["id", "names", "email"],
  limit: 10,
  offset: 0,
  joins: [
    {
      table: "classes",
      type: JoinTypes.INNER,
      field: "id",
      fields: ["name", "description"],
      fieldNameReference: "teacher_id",
    },
  ],
});

console.log(result); //SELECT by FIND

const result2 = await teacherRepository.findById(1, {
  fields: ["id", "names", "email"],
  limit: 10,
  offset: 0,
  joins: [
    {
      table: "classes",
      type: JoinTypes.INNER,
      field: "id",
      fields: ["name", "description"],
      fieldNameReference: "teacher_id",
    },
  ],
});

console.log(result2); //SELECT by ID

const result3 = await teacherRepository.update({
  setValues: { column: "names", value: "Daniel" },
  conditions: where().equal("id", 1).build(),
});

console.log(result3); //UPDATE

const result4 = await teacherRepository.delete({ conditions: where().equal("id", 1).build() });

console.log(result4); //DELETE

const result5 = await teacherRepository.create({ fields: ["names", "email"], values: [["Daniel", "dapgpena@gmail.com"]]});

console.log(result5); //INSERT

const reviewRepository = new ReviewRepository();

const result6 = await reviewRepository.find({fields: ["id", "comment"], limit: 10, offset: 0});

console.log(result6); //SELECT by FIND

const result7 = await reviewRepository.findById(1, {fields: ["id", "comment"], limit: 10, offset: 0});

console.log(result7); //SELECT by ID

const result8 = await reviewRepository.update({setValues: {column: "comment", value: "Excelente"}, conditions: where().equal("id", 1).build()});
console.log(result8); //UPDATE

const result9 = await reviewRepository.delete({conditions: where().equal("id", 1).build()});

console.log(result9); //DELETE