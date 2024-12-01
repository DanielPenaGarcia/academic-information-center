import Header from "../../components/header/header.js";
import StudentItem from "../../components/student-item/student-item.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";
import api from "../../../../shared/services/api.service.js";

let page = 1;
let size = 10;
let pages = 1;
let totalPages = 1;
let classId = null;

document.addEventListener("DOMContentLoaded", function () {
  init();
  addListeners();
});

function addListeners() {
  document.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + viewportHeight >= documentHeight) {
      incrementPage();
    }
  });
}

async function incrementPage() {
  if (page < pages) {
    page++;
    await findStudents();
  }
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  classId = urlParams.get("classId");
  initComponents();
  findClass({ classId });
  findStudents();
}

function initComponents() {
  window.customElements.define("teacher-header", Header);
  window.customElements.define("student-item", StudentItem);
  window.customElements.define("back-button", BackButton);
}

async function findClass({ classId }) {
  const response = await api.get({ endpoint: `classes/${classId}` });
  const subjectName = document.getElementById("subject-name");
  const name = response.data.subject.name;
  subjectName.textContent = name;
}

async function findStudents() {
  const response = await api.get({
    endpoint: `student/classes/${classId}`,
    query: { page, size },
  });
  const { totalElements, totalPages, currentPage, students } = response.data;
  pages = totalPages;
  page = currentPage;
  if (students.length > 0) {
    students.forEach((studentClass) => {
      const item = createStudentItem(studentClass);
      const list = document.getElementById("students");
      list.appendChild(item);
    });
  } else {
    const message = document.getElementById("no-students");
    message.hidden = false;
  }
}

function createStudentItem(studentClass) {
  const item = document.createElement("student-item");
  item.setAttribute("student-id", studentClass.klass.id);
  item.setAttribute(
    "student-name",
    `${studentClass.student.names} ${studentClass.student.fatherLastName} ${studentClass.student.motherLastName}`
  );
  item.setAttribute("academic-id", studentClass.student.academicId);
  item.setAttribute("student-grade", studentClass.grade || "");
  return item;
}
