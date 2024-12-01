import api from "../../../../shared/services/api.service.js";
import localStorageService from "../../../../shared/services/local-storage.service.js";
import ClassItem from "../../components/class-item/class-item.js";
import Header from "../../components/header/header.js";

let page = 1;
let size = 10;
let pages = 1;
let totalPages = 1;
let totalElements = 0;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  addComponents();
});

function addComponents() {
  window.customElements.define("teacher-header", Header);
  window.customElements.define("class-item", ClassItem);
  init();
}

async function init() {
  loadPageController();
  await loadClasses();
}

function loadPages() {
  const pagesControllers = document.querySelectorAll(".page-list");
  pagesControllers.forEach((pages) => {
    pages.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("span");
      pageItem.textContent = i;
      pageItem.classId = `page-${i}`;
      pageItem.classList.add("page-item");
      if (i === page) {
        pageItem.classList.add("active");
      } else {
        pageItem.classList.remove("active");
      }
      pageItem.addEventListener("click", () => {
        page = i;
        loadClasses();
      });
      pages.appendChild(pageItem);
    }
  });
}

function loadPageController() {
  // Obtener todos los controllers por su clase "page-controller"
  const pageControllers = document.querySelectorAll(".page-controller"); // Cambié el selector aquí
  pageControllers.forEach((controller) => {
    const previousButton = document.createElement("button");
    previousButton.textContent = "Anterior";
    previousButton.classList.add("nav-button");
    previousButton.classId = "previous-button";
    previousButton.addEventListener("click", loadPreviousPage);
    controller.appendChild(previousButton);
    const pages = document.createElement("div");
    pages.classId = "pages";
    pages.className = "page-list";
    controller.appendChild(pages);
    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.classList.add("nav-button");
    nextButton.classId = "next-button";
    nextButton.addEventListener("click", loadNextPage);
    controller.appendChild(nextButton);
  });
}

function loadNextPage() {
  if (page >= pages) return;
  page++;
  loadClasses();
}

function loadPreviousPage() {
  if (page <= 1) return;
  page--;
  loadClasses();
}

async function loadClasses() {
  const user = localStorageService.getItem("user");
  const response = await api.get({
    endpoint: `teacher/${user.academicId}/classes`,
    query: { page, size },
  });
  pages = response.data.totalPages;
  totalElements = response.data.totalElements;
  const classes = response.data.classes;
  const gallery = document.getElementById("classes");
  gallery.innerHTML = "";
  classes.forEach((classData) => {
    const classItem = createClassItem(classData);
    gallery.appendChild(classItem);
  });
  totalPages = response.data.totalPages;
  totalElements = response.data.totalElements;
  loadPages();
  updateNavButtons();
}

function createClassItem(classData) {
  const classItem = document.createElement("class-item");
  classItem.setAttribute("class-id", classData.id);
  classItem.setAttribute("subject-name", classData.subject.name);
  classItem.setAttribute("days", classData.days);
  classItem.setAttribute("description", classData.description || "");
  classItem.setAttribute("classroom", classData.classroom || "No asignado");
  classItem.setAttribute("duration", classData.duration);
  classItem.setAttribute("start-time", classData.startTime);
  return classItem;
}

function updateNavButtons() {
  const previousButtons = document.querySelectorAll("#previous-button");
  const nextButtons = document.querySelectorAll("#next-button");
  if (page <= 1) {
    previousButtons.forEach((button) => button.setAttribute("disabled", true));
  } else {
    previousButtons.forEach((button) => button.removeAttribute("disabled"));
  }
  if (page >= totalPages) {
    nextButtons.forEach((button) => button.setAttribute("disabled", true));
  } else {
    nextButtons.forEach((button) => button.removeAttribute("disabled"));
  }
}
