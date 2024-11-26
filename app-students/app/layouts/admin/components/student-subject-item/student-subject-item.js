import api from "../../../../shared/services/api.service.js"

export class StudentSubjectItemComponent extends HTMLElement {
    id
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        const currentScript = new URL(import.meta.url); // URL del archivo JS actual
        const cssPath = `${currentScript.origin}${currentScript.pathname.replace(/\.js$/, '.css')}`;

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', cssPath);

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'subject-item');

        const timeInfoElement = document.createElement('span');
        timeInfoElement.setAttribute('class', 'time-info');

        const subjectNameElement = document.createElement('span');
        subjectNameElement.setAttribute('class', 'subjectName');

        const daysElement = document.createElement('span');
        daysElement.setAttribute('class', 'days');

        const timeElement = document.createElement('span');
        timeElement.setAttribute('class', 'time');

        timeInfoElement.appendChild(daysElement);
        timeInfoElement.appendChild(timeElement);

        wrapper.appendChild(subjectNameElement);
        wrapper.appendChild(timeInfoElement);

        wrapper.addEventListener('click', this.confirmDeletion.bind(this));

        this.shadowRoot.append(link, wrapper);
    }

    setSubjectInfo(id,subjectName,days,time) {
        this.id = id;
        const subjectNameElement = this.shadowRoot.querySelector('.subjectName');
        const daysElement = this.shadowRoot.querySelector('.days');
        const timeElement = this.shadowRoot.querySelector('.time');

        subjectNameElement.textContent = subjectName;
        daysElement.textContent = days;
        timeElement.textContent = time;
    }

    confirmDeletion(event) {
        event.preventDefault();
        const confirmation = confirm('¿Estás seguro de que deseas eliminar este elemento?');
        if (confirmation) {
            this.dropClassToStudent();
        }
    }

    async dropClassToStudent(){
        const urlParams = new URLSearchParams(window.location.search);
        const body ={
            studentId:urlParams.get('id'),
            classId: this.id
        }
        const response = await api.patch({
            endpoint: `/classes/dropClass`,
            body
          });
        if(response){
           this.remove();
           alert('El elemento ha sido eliminado.');
       }
    }
}

customElements.define('subject-item',StudentSubjectItemComponent);