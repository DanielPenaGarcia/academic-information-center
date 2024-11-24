import api from "../../../../shared/services/api.service.js";
import StudentItemComponent from "../../components/subject-item/subject-item.js"
document.addEventListener("DOMContentLoaded",function(){

    let pagination = {
        page:1,
        count:10
    };

    async function getAllStudents() {
        try{
            let academicId = document.querySelector("#searchInput").value;
            if(academicId){
                pagination.page = 1;
            }
            academicId = academicId.replace(/\s/g, "");;
            const endpoint = "student/all";
            const query =  `academicId=${academicId}&page=${pagination.page}&count=${pagination.count}`;
            const students = await api.get({
                endpoint,
                query
            });
            pagination.page = students.data.currentPage;
            pagination.end = students.data.totalPages;
            if(students.status < 200 || students.status > 200){
                //TODO Agregar Toast como componente
                console.log(
                    "Hubo un error al consultar los estudiantes",
                    "error"
                  );
                  return;
            }
            thereAreMoreStudents(students.data);
            insertAllStudents(students.data);
        }catch(error){
            console.log(
                "Hubo un error al consultar los estudiantes",
                "error"
              );
        }
    }


    function insertAllStudents({students}){
        document.querySelector("#pageInfo").textContent =  `Página ${pagination.page}`
        const studetList = document.querySelector("#itemList");
        studetList.innerHTML = "";
        if(students.length == 0){
            const studentEmpty = new StudentItemComponent();
            studentEmpty.setStudentInfo("","No se encontraron Alumnos","","");
            studetList.appendChild(studentEmpty);
            return;
        }

        for(let student of students){
            const studentItem = new StudentItemComponent();
            studentItem.setStudentInfo(student.academicId,student.names,student.fatherLastName,student.motherLastName);
            studetList.appendChild(studentItem);
        }

    }

    function getNextStudents(){

        pagination.page = +pagination.page+1;
        getAllStudents(); 
    }

    function getPrevStudents(){
        pagination.page = +pagination.page-1;
        getAllStudents(); 
    }

    function thereAreMoreStudents({currentPage,totalPages}){
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

    function init(){
        document.querySelector("#searchButton").addEventListener("click",getAllStudents);
        document.querySelector("#nextButton").addEventListener("click",getNextStudents);
        document.querySelector("#prevButton").addEventListener("click",getPrevStudents);
        getAllStudents();
    }

    init();

});