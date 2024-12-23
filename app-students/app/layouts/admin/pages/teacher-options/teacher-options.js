import Header from "../../components/header/header.js";
import { router } from "../../../../shared/router.js";

document.addEventListener('DOMContentLoaded', () => {
    window.customElements.define("admin-header", Header);
    loadOptions(); // Cargar las opciones cuando el documento esté listo
});

function loadOptions() {
    const options = [
        {
            title: 'Registrar maestro',
            description: 'Registra un nuevo maestro',
            actions: [
                {
                    label: 'Registrar',
                    action: () => goToOption({ path: 'admin/teacher/register'})
                }
            ]
        },
        {
            title: 'Asignar materia a maestro',
            description: 'Asigna una materia a un maestro',
            actions: [
                {
                    label: 'Asignar',
                    action: () => goToOption({ path: 'admin/teacher/asign-subject-teacher'})
                }
            ]
        },
        {
            title: 'Asignar clase a maestro',
            description: 'Asigna una clase a un maestro',
            actions: [
                {
                    label: 'Asignar',
                    action: () => goToOption({ path: 'admin/teacher/asign-class-teacher'})
                }
            ]
        }
    ];

    // Mostrar las opciones en el main
    const main = document.getElementById('options');
    options.forEach(option => {
        const optionCard = createOption(option);
        main.appendChild(optionCard);
    });
}

function createOption(option) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerText = option.title;
    card.appendChild(cardHeader);
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.innerText = option.description;
    card.appendChild(cardContent);
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    option.actions.forEach(action => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = action.label;
        button.onclick = action.action;
        cardFooter.appendChild(button);
    });
    card.appendChild(cardFooter);

    return card;
}

function goToOption({ path }) {
    router.navigate(path);
}
