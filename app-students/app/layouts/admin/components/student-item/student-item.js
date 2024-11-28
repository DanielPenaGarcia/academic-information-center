import { router } from "../../../../shared/router.js";

export class StudentItemComponent extends HTMLElement {
    academicId
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        const currentScript = new URL(import.meta.url); // URL del archivo JS actual
        const cssPath = `${currentScript.origin}${currentScript.pathname.replace(/\.js$/, '.css')}`;

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', cssPath);

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'student-item');

        const fullNameElement = document.createElement('span');
        fullNameElement.setAttribute('class', 'fullName');

        const academicIdElement = document.createElement('span');
        academicIdElement.setAttribute('class', 'academicId');

        wrapper.appendChild(fullNameElement);
        wrapper.appendChild(academicIdElement);
        wrapper.addEventListener("click",this.goToClasses.bind(this))
        this.shadowRoot.append(link, wrapper);
    }

    setStudentInfo(id,academicId,names,fatherLastName,motherLastName) {
        this.id = id;
        this.academicId = academicId;
        const fullName = `${names} ${fatherLastName} ${motherLastName}`;
        const fullNameElement = this.shadowRoot.querySelector('.fullName');
        const academicIdElement = this.shadowRoot.querySelector('.academicId');


        fullNameElement.textContent = fullName;
        if(academicId){
            academicIdElement.textContent = `ID: ${academicId}`;
        }else{
            academicIdElement.textContent = `${academicId}`;
        }
    }

    goToClasses(event){
        event.preventDefault();
        router.navigate(
            "admin/students/drop-class/classes",
            {
                academicId: this.academicId,
                id:this.id
            });
    }
}

customElements.define('student-item',StudentItemComponent);