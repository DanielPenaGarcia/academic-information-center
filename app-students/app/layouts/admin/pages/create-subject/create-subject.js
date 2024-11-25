import api from "../../../../shared/services/api.service.js";
import Header from "../../components/header/header.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";
import { router } from "../../../../shared/router.js";

const searchParams = {
    page: 1,
    size: 10,
}
const courseMaps = [];

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    addListeners();
    findAllCourseMaps();
});

function loadComponents() {
    window.customElements.define("admin-header", Header);
    window.customElements.define("back-button", BackButton);
}

function addListeners() {
    addListenerSubjectFormButton();
}

function addListenerSubjectFormButton() {
    const buttonSubmit = document.getElementById('submit-subject');
    buttonSubmit.addEventListener('click', createSubject);
}

async function createSubject() {
    const form = document.getElementById('subject-form');
    const data = {};
    data.courseMap = form.querySelector('#course-map').value;
    data.name = form.querySelector('#name').value;
    data.hoursPerWeek = form.querySelector('#hoursPerWeek').value;
    data.semester = form.querySelector('#semester').value;
    validateSubject(data);
    const response = await api.post({ endpoint: 'subjects', body: data });
    if (response.status !== 201) {
        console.error('Error al crear la materia');
        alert('Error al crear la materia');
        return;
    }
    alert('Materia creada correctamente');
    router.navigate('admin/academic');
}

function validateSubject({courseMap, name, hoursPerWeek, semester}) {
    //TODO: Validar campos y mostrar mensajes de error
}

async function findAllCourseMaps() {
    const response = await api.get({ endpoint: 'course-maps', query: searchParams });
    if (response.status !== 200) {
        console.error('Error al obtener los cursos');
    }
    courseMaps.push(...response.data.courseMaps);
    const select = document.getElementById('course-map');
    select.addEventListener('change', selectOnChange);
    courseMaps.forEach(courseMap => {
        const option = document.createElement('option');
        option.value = courseMap.id;
        option.innerText = courseMap.year;
        select.appendChild(option);
    });
}

async function selectOnChange(event) {
    const id = event.target.value;
    const response = await api.get({ endpoint: `course-maps/${id}` });
    if (response.status !== 200) {
        console.error('Error al obtener el curso');
    }
    const courseMap = response.data;
    addCourseMapInfo(courseMap);
}

function addCourseMapInfo(courseMap) {
    const courseMapInfo = document.getElementById('course-map-info');
    courseMapInfo.hidden = false;
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    courseMapInfo.appendChild(formGroup);
    const labelSemesters = document.createElement('label');
    labelSemesters.innerText = 'Semestres';
    formGroup.appendChild(labelSemesters);
    const inputSemesters = document.createElement('input');
    inputSemesters.type = 'text';
    inputSemesters.value = courseMap.semesters;
    inputSemesters.disabled = true;
    formGroup.appendChild(inputSemesters);
}