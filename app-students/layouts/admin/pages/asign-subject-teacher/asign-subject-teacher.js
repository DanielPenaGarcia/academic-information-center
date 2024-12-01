import api from '../../../../app/shared/services/api.service.js';
import TableSubjects from '../../../../app/layouts/admin/components/table-subject/table-subject.js';
import Header from '../../../../app/layouts/admin/components/header/header.js';
import BackButton from '../../../../app/shared/components/back-button/back-button.js';
let selectedTeacher = null;
let selectedSubject; // Variable para almacenar la materia seleccionada

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  loadComponents();
  addListeners();

  const professorDetails = document.querySelector("professor-details");
  professorDetails.addEventListener("professor-selected", (e) => {
    selectedTeacher = e.detail.teacher.teacher;
  });
});

// Agregar listeners a los elementos
const addListeners = () => {
  addAssignSubjectListener();
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
      clearTeacherSelection();
    }
  } catch (error) {
    showAlert("Error al asignar la materia, intenta más tarde");
    console.error(error);
  }
};

// Cargar la lista de materias disponibles
const loadComponents = () => {
  window.customElements.define("admin-header", Header);
  window.customElements.define("back-button", BackButton);
  window.customElements.define("table-subjects", TableSubjects);
  const subjectsTable = document.getElementById("subjects-table");
  subjectsTable.addEventListener("subject-selected", async (e) => { 
    const subject = e.detail;
    selectedSubject = await getSubject(subject.id); 
  });

  async function getSubject(subjectId) {
    const subject = (await api.get({ endpoint: `subjects/${subjectId}` })).data;

    return subject;
  }
};


// Limpiar la selección de materia
const clearSubjectSelection = () => {
  const subjectInput = document.getElementById("selected-subject");
  subjectInput.value = ""; // Vaciar el campo de materia seleccionada
};

const clearTeacherSelection = () => {
  const teacherInput = document.getElementById("academicIdInput");
  teacherInput.value = ""; // Vaciar el campo de profesor seleccionado
};

// Mostrar alerta de error o éxito
const showAlert = (message) => {
  alert(message || "Ocurrió un error inesperado");
};
