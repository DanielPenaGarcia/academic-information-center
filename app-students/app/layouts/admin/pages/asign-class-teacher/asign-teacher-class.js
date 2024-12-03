import Header from "../../components/header/header.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";
import TableClasses from "../../components/table-classes/table-classes.js";
import api from "../../../../shared/services/api.service.js";

let selectedTeacher = null;
let selectedClass = null;

document.addEventListener("DOMContentLoaded", function () {
    loadComponents();
    addListeners();
    const professorDetails = document.querySelector("professor-details");
    professorDetails.addEventListener("professor-selected", (e) => {
        selectedTeacher = e.detail.teacher.teacher;
        loadClasses(selectedTeacher.id);
    });
});


const addListeners = () => {
    addAssignClassListener();
};


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
    try {
        const body = {
            teacherId: selectedTeacher.id,
            classId: selectedClass.id,
        };

        const response = await api.patch({ endpoint: "classes/assign-teacher", body });
        if (response.status === 201) {
            showAlert("Clase asignada exitosamente");
            selectedClass = null;  
            
            
            loadClasses(selectedTeacher.id);  
        }
    } catch (error) {
        showAlert("Error al asignar la clase");
    }
};


const loadComponents = () => {
    window.customElements.define("admin-header", Header);
    window.customElements.define("back-button", BackButton);
};

const loadClasses = (teacherId) => {
    window.customElements.define("table-classes", TableClasses);
    const tableClasses = document.getElementById("table-classes");
    const tableInstance = new TableClasses();
    tableInstance.findClassesByTeacher(teacherId);
    
 
    tableClasses.innerHTML = '';  
    tableClasses.appendChild(tableInstance);

    tableClasses.addEventListener("class-selected", (e) => {
        selectedClass = e.detail;
    });
};

const showAlert = (message) => {
    alert(message || "Error");
}
