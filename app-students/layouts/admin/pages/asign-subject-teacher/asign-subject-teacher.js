import api from '../../../../app/shared/services/api.service.js';

let selectedTeacher = null;
let selectedSubject = null; // Variable para almacenar la materia seleccionada

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  loadComponents();
  addListeners();
});

// Agregar listeners a los elementos
const addListeners = () => {
  addAssignSubjectListener();
};

// Listener para el formulario de búsqueda de profesor
const addSearchProfessorListener = () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", async () => {
    const query = document.getElementById("academicIdInput").value;
    if (query.trim() === "") {
      showAlert("Por favor ingresa el id academico del profesor a buscar");
      return;
    }
    await searchProfessor(query);
  });
};

// Buscar profesor en la API
const searchProfessor = async (query) => {
  try {
    const response = await api.get({ endpoint: `teacher?academicId=${query}` });
    if (response.data && response.data.length > 0) {
      displayProfessor(response.data[0]); // Mostrar el primer resultado
    } else {
      showAlert("No se encontró un profesor con ese nombre");
    }
  } catch (error) {
    showAlert("Error al buscar el profesor, intenta más tarde");
    console.error(error);
  }
};

// Mostrar información del profesor en la sección correspondiente
const displayProfessor = (teacher) => {
  selectedTeacher = teacher; // Almacenar el profesor seleccionado

  const teacherPhoto = document.querySelector(".professor-photo img");
  const teacherName = document.querySelector(".professor-info .name");
  const teacherEmail = document.querySelector(".professor-info .email");

  teacherPhoto.src = teacher.photo || "default-photo.png";
  teacherName.textContent = teacher.name;
  teacherEmail.textContent = teacher.email;
};

// Listener para asignar una materia al profesor
const addAssignSubjectListener = () => {
  const assignButton = document.getElementById("assignButton");
  assignButton.addEventListener("click", async () => {
    if (!selectedTeacher) {
      showAlert("Por favor selecciona un profesor primero");
      return;
    }

    if (!selectedSubject) {
      showAlert("Por favor selecciona una materia");
      return;
    }

    await assignSubjectToProfessor();
  });
};

// Asignar la materia seleccionada al profesor
const assignSubjectToProfessor = async () => {
  try {
    const body = {
      teacherId: selectedTeacher.id,
      subjectId: selectedSubject.id,
    };

    const response = await api.post({ endpoint: "/subjects/teachers", body });
    if (response.status === 201) {
      showAlert("Materia asignada exitosamente");
      selectedSubject = null; 
      clearSubjectSelection();
    }
  } catch (error) {
    showAlert("Error al asignar la materia, intenta más tarde");
    console.error(error);
  }
};

// Cargar la lista de materias disponibles
const loadComponents = () => {
  const subjectsTable = document.getElementById("subjects-table");
  subjectsTable.addEventListener("click", (e) => { 
    const row = e.target.closest("tr");
    if (row && row.dataset.subjectId) {
      selectSubject(row.dataset.subjectId, row.dataset.subjectName);
    }
  });
};

// Seleccionar una materia
const selectSubject = (subjectId, subjectName) => {
  selectedSubject = { id: subjectId, name: subjectName };
  const subjectInput = document.getElementById("selected-subject");
  subjectInput.value = subjectName; // Mostrar la materia seleccionada
};

// Limpiar la selección de materia
const clearSubjectSelection = () => {
  const subjectInput = document.getElementById("selected-subject");
  subjectInput.value = ""; // Vaciar el campo de materia seleccionada
};

// Mostrar alerta de error o éxito
const showAlert = (message) => {
  alert(message || "Ocurrió un error inesperado");
};
