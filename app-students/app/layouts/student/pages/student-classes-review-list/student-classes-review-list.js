import api from "../../../../shared/services/api.service.js";
import BackButton from "../../../../shared/components/back-button/back-button.js";
import { StudentClassReviewItem } from "../../components/student-class-review-item/student-class-review-item.js";

document.addEventListener("DOMContentLoaded",function(){


    async function getAllStudentClasses(studentId) {
        try{
            const endpoint = `/student/${studentId}/classes/review`;
            const studentClasses = await api.get({
                endpoint,
            });
            if(studentClasses.status < 200 || studentClasses.status > 200){
                //TODO Agregar Toast como componente
                console.log(
                    "Hubo un error al consultar las clases del estudiante",
                    "error"
                  );
                  return;
            }
            insertAllClasses(studentClasses.data);
        }catch(error){
            console.log(
                "Hubo un error al consultar las clases del estudiante",
                "error"
              );
        }
    }

    function insertAllClasses(studentClasses){
        const classesList = document.querySelector("#itemList");
        if(studentClasses.length == 0){
            const empty = new StudentSubjectItemComponent();
            empty.setSubjectInfo("","No se encontraron clases que el estudiante esté cursando","","","","");
            classesList.appendChild(empty);
            return;
        }

        for(let studentClass of studentClasses){
            const studentClassItem = new StudentClassReviewItem();
            const id = studentClass.classId;
            const name =studentClass.subject_name;
            const days = studentClass.klass_days;
            const time = studentClass.klass_start_time;
            const teacher = `${studentClass.teacher_name} ${studentClass.teacher_father_last_name} ${studentClass.teacher_mother_lastName}`;
            const hasReview = studentClass.hasReview;
            debugger;
            studentClassItem.setSubjectInfo(id,name,days,time,teacher,hasReview);
            classesList.appendChild(studentClassItem);
        }

    }

    function init(){
        const studentId = JSON.parse(localStorage.getItem('user'))?.academicId;
        getAllStudentClasses(studentId);
        document.querySelector("#studentId").textContent = studentId;
        window.customElements.define('back-button', BackButton);
    }

    init();
});