import BackButton from "../../../../shared/components/back-button/back-button.js";
import api from "../../../../shared/services/api.service.js";
import { StudentSubjectItemComponent } from "../../components/student-subject-item/student-subject-item.js";

document.addEventListener("DOMContentLoaded",function(){
    let pagination = {
        page:1,
        count : 5
    };

    async function getAllStudentPendingClasses() {
        try{
            const urlParams = new URLSearchParams(window.location.search);
            const academicId = urlParams.get('academicId');
            document.querySelector("#studentId").textContent = academicId;
            const subject = document.querySelector("#searchInput").value;
            if(subject){
                pagination.page = 1;
            }
            const endpoint = `/student/${academicId}/classes`;
            const query = `subject=${subject}&page=${pagination.page}&count=${pagination.count}`;
            const studentClasses = await api.get({
                endpoint,
                query
            });
            pagination.page = studentClasses.data.currentPage;
            pagination.end = studentClasses.data.totalPages;
            if(studentClasses.status < 200 || studentClasses.status > 200){
                //TODO Agregar Toast como componente
                console.log(
                    "Hubo un error al consultar las clases del estudiante",
                    "error"
                  );
                  return;
            }
            thereAreMoreClasses(studentClasses.data);
            insertAllClasses(studentClasses.data);
        }catch(error){
            console.log(
                "Hubo un error al consultar las clases del estudiante",
                "error"
              );
        }
    }

    function insertAllClasses({studentClasses}){
        document.querySelector("#pageInfo").textContent =  `Página ${pagination.page}`
        const classesList = document.querySelector("#itemList");
        classesList.innerHTML = "";
        if(studentClasses.length == 0){
            const empty = new StudentSubjectItemComponent();
            empty.setSubjectInfo("","No se encontraron clases que el estudiante esté cursando","","");
            classesList.appendChild(empty);
            return;
        }

        for(let studentClass of studentClasses){
            const studentClassItem = new StudentSubjectItemComponent();
            const id = studentClass.klass.id;
            const name =studentClass.klass.subject.name;
            const days = studentClass.klass.days;
            const time = studentClass.klass.startTime;
            studentClassItem.setSubjectInfo(id,name,days,time);
            classesList.appendChild(studentClassItem);
        }

    }

    function thereAreMoreClasses({currentPage,totalPages}){
        if(currentPage<=1){
            document.querySelector("#prevButton").disabled = true;
        }else{
            document.querySelector("#prevButton").disabled = false;
        }

        if(totalPages>currentPage){
            document.querySelector("#nextButton").disabled = false;
        }else{
            document.querySelector("#nextButton").disabled = true;
        }
    }
    function getNextClasses(){

        pagination.page = +pagination.page+1;
        getAllStudentPendingClasses(); 
    }

    function getPrevClasses(){
        pagination.page = +pagination.page-1;
        getAllStudentPendingClasses(); 
    }

    function init(){
        document.querySelector("#searchButton").addEventListener("click",getAllStudentPendingClasses);
        document.querySelector("#nextButton").addEventListener("click",getNextClasses);
        document.querySelector("#prevButton").addEventListener("click",getPrevClasses);
        window.customElements.define('back-button', BackButton);
        getAllStudentPendingClasses();
    }

    init();
});