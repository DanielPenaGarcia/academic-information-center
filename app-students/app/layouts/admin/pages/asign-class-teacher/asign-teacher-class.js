import Header from "../../components/header/header.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";
import TableSubjects from "../../components/table-subject/table-subject.js";
import api from "../../../../shared/services/api.service.js";

let selectedTeacher = null;
let selectedClass = null;

document.addEventListener("DOMContentLoaded", function () {
    loadComponents();
    addListeners();
    const teacherDetails = document.querySelector("teacher-details");
    teacherDetails.addEventListener("teacher-selected", (e) => {
        selectedTeacher = e.detail.teacher.teacher;
    });
});

// Agregar listeners a los elementos
const addListeners = () => {
    addAssignClassListener();
};

// Listener para asignar una clase al profesor

const addAssignClassListener = () => {
    const assignButton = document.getElementById("assignButton");
    assignButton.addEventListener("click", async () => {
        if (!selectedTeacher) {
            showAlert("Por favor selecciona un profesor primero");
            return;
        }

        if (!selectedClass) {
            showAlert("Por favor selecciona una clase");
            return;
        }

        await assignClassToTeacher();
    });
};

const assignClassToTeacher = async () => {


};

// Cargar la lista de clases disponibles
const loadComponents = () => {
    window.customElements.define("admin-header", Header);
    window.customElements.define("back-button", BackButton);

};

const showAlert = (message) => {
    alert(message || "Error");
}
