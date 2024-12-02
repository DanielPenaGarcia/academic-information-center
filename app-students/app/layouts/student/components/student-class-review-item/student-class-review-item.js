import { router } from "../../../../shared/router.js";

export class StudentClassReviewItem extends HTMLElement {
    clazz = {}
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

        this.shadowRoot.append(link, wrapper);
    }

    setSubjectInfo(id,subjectName,days,time,teacher,hasReview) {
        this.clazz.classId = id;
        this.clazz.teacher = teacher;
        this.clazz.subjectName = subjectName;
        this.clazz.time = time;
        this.clazz.days = days;
        const subjectNameElement = this.shadowRoot.querySelector('.subjectName');
        const daysElement = this.shadowRoot.querySelector('.days');
        const timeElement = this.shadowRoot.querySelector('.time');

        const item = this.shadowRoot.querySelector(".subject-item")
        subjectNameElement.textContent = subjectName;
        daysElement.textContent = days;
        timeElement.textContent = time;

        if(hasReview == 0){
            item.addEventListener('click', this.goToReviewClass.bind(this));
        }else{
            const evaluatedText = document.createElement('span');
            evaluatedText.setAttribute('class', 'evaluated-text');
            evaluatedText.textContent = 'Evaluada';
            item.appendChild(evaluatedText);
        }
    }

    goToReviewClass(event) {
        event.preventDefault();
        router.replace(
            "/student/review-class",this.clazz);
    }
}

customElements.define('subject-item',StudentClassReviewItem);