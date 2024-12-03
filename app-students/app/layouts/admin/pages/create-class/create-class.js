import TableSubject from "../../components/table-subject/table-subject.js";
import api from "../../../../shared/services/api.service.js";
import Header from "../../components/header/header.js";
import { router } from "../../../../shared/router.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";

// Variable global para almacenar los días seleccionados
const selectedDays = [];
let subject;

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  loadDays();
  loadComponents();
  addListeners();
});

const addListeners = () => {
  addListenerToForm();
};

const addListenerToForm = () => {
  const form = document.getElementById("create-class-form");
  form.addEventListener("submit", createSubject);
};

const createSubject = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {};
  const duration = form.querySelector("#duration").value;
  const start = form.querySelector("#start-time").value;
  const classroom = form.querySelector("#classroom").value;
  data.duration = duration;
  data.start = start;
  data.days = selectedDays;
  data.subject = subject;
  data.classroom = classroom;
  submitCreateClass(data);
};

const showFormInvalid = (message) => {
  alert(message || "Formulario inválido");
};

const validateCreateClass = ({ duration, start, days, subject }) => {
  if (!duration || !start || !days || !subject) {
    showFormInvalid("Todos los campos son requeridos");
    return false;
  }
  const hours = subject.hoursPerWeek;
  if ((days.length * duration) / 60 > hours) {
    showFormInvalid("La duración no puede ser mayor a las horas de la materia");
    return false;
  }
  return true;
};

const submitCreateClass = async ({ duration, start, days, subject, classroom }) => {
  if (!validateCreateClass({ duration, start, days, subject })) {
    return;
  }
  const body = {
    duration,
    startTime: start,
    days: days.join(","),
    subjectId: subject.id,
    classroom:  classroom,
  };
  const response = await api.post({ endpoint: "classes", body: body });
  if (response.status === 201) {
    alert("Clase creada exitosamente");
    router.navigate("admin/academic");
  }
};

const loadComponents = () => {
  window.customElements.define("admin-header", Header);
  window.customElements.define('back-button', BackButton);
  window.customElements.define("table-subjects", TableSubject);
  const tableSubjects = document.querySelector("table-subjects");
  tableSubjects.addEventListener("subject-selected", async (e) => {
    const selectedSubject = e.detail;
    subject = await getSubject(selectedSubject.id);
    const inputSubject = document.getElementById("subject");
    inputSubject.value = selectedSubject.name;
  });

  async function getSubject(subjectId) {
    const subject = (await api.get({ endpoint: `subjects/${subjectId}` })).data;
    return subject;
  }
};

// Función para cargar los días y recuperar los seleccionados desde el localStorage
const loadDays = () => {
  const daysContainer = document.getElementById("days-container");
  const days = ["L", "M", "X", "J", "V", "S", "D"];

  // Recorrer el array de días y crear un checkbox para cada uno
  days.forEach((day) => {
    // Crear el label que contendrá el checkbox
    const label = document.createElement("label");
    label.classList.add("day-check");

    // Crear el input tipo checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = day.toLowerCase(); // Asignar un ID único (por ejemplo: 'monday')

    // Crear un span para mostrar el texto
    const span = document.createElement("span");
    span.textContent = day;

    // Agregar el input y el span al label
    label.appendChild(checkbox);
    label.appendChild(span);

    // Agregar el label al contenedor de días
    daysContainer.appendChild(label);

    // Si el día ya está en selectedDays, marcar el checkbox
    if (selectedDays.includes(day)) {
      checkbox.checked = true;
    }

    // Escuchar los cambios en el checkbox
    checkbox.addEventListener("change", (e) => {
      pushSelectedDay();
    });
  });
};

// Función para actualizar la variable selectedDays con los días seleccionados
const pushSelectedDay = () => {
  const days = ["L", "M", "X", "J", "V", "S", "D"];

  // Limpiar la lista de días seleccionados antes de llenarla nuevamente
  selectedDays.length = 0;

  days.forEach((day) => {
    const checkbox = document.getElementById(day.toLowerCase());
    if (checkbox.checked) {
      selectedDays.push(day);
    }
  });
};
