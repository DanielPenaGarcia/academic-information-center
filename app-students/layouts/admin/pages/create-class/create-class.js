import TableSubject from "../../components/table-subject/table-subject.js";

// Variable global para almacenar los días seleccionados
const selectedDays = [];

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    loadDays();
    window.customElements.define('table-subjects', TableSubject);
});

// Función para cargar los días y recuperar los seleccionados desde el localStorage
const loadDays = () => {
    const daysContainer = document.getElementById('days-container');
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    // Recorrer el array de días y crear un checkbox para cada uno
    days.forEach(day => {
        // Crear el label que contendrá el checkbox
        const label = document.createElement('label');
        label.classList.add('day-check');

        // Crear el input tipo checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = day.toLowerCase();  // Asignar un ID único (por ejemplo: 'monday')

        // Crear un span para mostrar el texto
        const span = document.createElement('span');
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
        checkbox.addEventListener('change', (e) => {
            pushSelectedDay();
        });
    });
};

// Función para actualizar la variable selectedDays con los días seleccionados
const pushSelectedDay = () => {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    
    // Limpiar la lista de días seleccionados antes de llenarla nuevamente
    selectedDays.length = 0;

    days.forEach(day => {
        const checkbox = document.getElementById(day.toLowerCase());
        if (checkbox.checked) {
            selectedDays.push(day);
        }
    });
};
