import api from '../../../../shared/services/api.service.js';
import Header from '../../components/header/header.js';
import { router } from '../../../../shared/router.js';
import BackButton from '../../../../shared/components/back-button/back-button.js';

let form;

document.addEventListener('DOMContentLoaded', function () {
    onInit();
});

function onInit() {
    initCreateEnrollmentPeriodForm();
    loadComponents();
}

function loadComponents() {
    window.customElements.define("admin-header", Header);
    window.customElements.define("back-button", BackButton);
}

function initCreateEnrollmentPeriodForm() {
    form = document.getElementById('registrationPeriodForm');
    form.addEventListener('submit', createEnrollmentPeriodSubmit);
}

function createEnrollmentPeriodSubmit(event) {
    event.preventDefault();
    const nameField = form.querySelector('#name');
    const startDateField = form.querySelector('#startDate');
    const endDateField = form.querySelector('#endDate');
    let isValid = true;
    if (!nameField.value.trim()) {
        showError(nameField, 'El nombre del período es obligatorio.');
        isValid = false;
    } else {
        clearError(nameField);
    }
    if (!startDateField.value) {
        showError(startDateField, 'La fecha de inicio es obligatoria.');
        isValid = false;
    } else {
        clearError(startDateField);
    }
    if (!endDateField.value) {
        showError(endDateField, 'La fecha de fin es obligatoria.');
        isValid = false;
    } else if (new Date(startDateField.value) >= new Date(endDateField.value)) {
        showError(endDateField, 'La fecha de fin debe ser posterior a la de inicio.');
        isValid = false;
    } else {
        clearError(endDateField);
    }
    if (!isValid) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte a objeto
    console.log('Datos válidos:', data);
    submitEnrollmentData(data);
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

async function submitEnrollmentData(data) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Guardando...';
    const response = await api.post({ endpoint: 'enrollment-periods', body: data});
    if (response.status === 201) {
        alert('Período de inscripción creado correctamente.');
        submitButton.disabled = false;
        submitButton.textContent = 'Guardar Período';
        form.reset();
        router.navigate('admin/academic');
    } else {
        alert('Error al crear el período de inscripción.');
    }

}
