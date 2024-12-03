import { ToastComponent } from "../../../../shared/components/toast-component/toast-component.js";
import { router } from "../../../../shared/router.js";
import api from "../../../../shared/services/api.service.js";

document.addEventListener("DOMContentLoaded",function(){
    
    const toast = new ToastComponent();

    async function sendReview(event) {
        try{
            const urlParams = new URLSearchParams(window.location.search);
            event.preventDefault();
            document.body.appendChild(toast);
            const submitButton = document.getElementById('button');
            submitButton.disable = true;
            const classId = urlParams.get('classId');
            const comment = document.getElementById("comments").value;
            const academicId = JSON.parse(localStorage.getItem('user'))?.academicId;
            const endpoint = `class/review`;
            const body = {
                comment,
                academicId,
                classId
            }
            const response = api.post(
                {
                    endpoint,
                    body
                }
            );
    
            if (response.status < 200 || response.status > 299) {
                submitButton.disable = false;
                toast.showToast("Algo salió mal creando la evaluacion", "error", 3000);
                return;
            }
            alert("Evaluación creada extosamente");
            router.replace('/student');
    
        }catch(error){
            toast.showToast("Algo salió mal creando la evaluacion", "error", 3000);
        }
    }

    function init(){
        const urlParams = new URLSearchParams(window.location.search);
        const teacher = urlParams.get('teacher');
        const subjectName = urlParams.get('subjectName');
        const time = urlParams.get('time');
        const days = urlParams.get('days');

        const form = document.getElementById("review-form");
        form.addEventListener('submit',sendReview);
        document.querySelector("#class").textContent = subjectName;
        document.querySelector("#teacher").textContent = teacher;
        document.querySelector("#days").textContent = days;
        document.querySelector("#time").textContent = time;
    }

    init();
    
});