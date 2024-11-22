import api from "../../../../shared/services/api.service.js";

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    addListeners();
});

const addListeners = () => {
    addListenerToForm();
};

const addListenerToForm = () => {
    const form = document.getElementById("course-map");
    form.addEventListener("submit", createCourseMap);
};

const createCourseMap = async (e) => {
    debugger;
    e.preventDefault();
    const form = e.target;
    const data = {};
    const year = form.querySelector("#year").value;
    const semesters = form.querySelector("#semesters").value;
    data.year = year;
    data.semesters = semesters;
    submitCreateCourseMap(data);
};

const showFormInvalid = (message) => {
    alert(message || "Formulario inválido");
};

const validateCreateCourseMap = ({ year, semesters }) => {
    if (!year || !semesters) {
        showFormInvalid("Todos los campos son requeridos");
        return false;
    }
    if(semesters < 1) {
        showFormInvalid("El número de semestres debe ser mayor a 0");
        return false;
    }

    if(year < 1) {
        showFormInvalid("El año debe ser mayor a 0");
        return false;
    }
    return true;
}
const submitCreateCourseMap = async ({ year, semesters }) => {
   debugger;
    if (!validateCreateCourseMap({ year, semesters })) {
        return;
    }
    const body = {
        year,
        semesters
    };
    const response = await api.post({ endpoint: "course-maps", body });
    if (response.status === 201) {
        alert("Mapa curricular creado correctamente");
    } else {
        alert("Error al crear mapa curricular");
    }
};