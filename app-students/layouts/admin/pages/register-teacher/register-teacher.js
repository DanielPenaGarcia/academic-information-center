const API_URL = "http://localhost:3000/api/v1/teacher"

document.addEventListener("DOMContentLoaded",function (){

    function registerTeacher({names,fatherLastName,motherLastName}) {
        const token = localStorage.getItem("token")

        const xhr = new XMLHttpRequest();
        xhr.open("POST",API_URL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.setRequestHeader("Authorization",`Bearer ${token}`)

        xhr.onload =function(){
            if(xhr.status === 200 || xhr.status === 201){
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                showToast("Maestro registrado exitosamente","success")
                showTeacherInfo(response.teacher);
            }else{
                showToast("Algo salio mal al registrar al maestro, intentelo mas tarde","error")
            }
        };

        xhr.onerror = function () {
            document.getElementById("responseMessage").textContent = "Error en la solicitud.";
          };

          const teacher = {
            names,
            fatherLastName,
            motherLastName
          }

          xhr.send(JSON.stringify(teacher));
    }

    function showTeacherInfo({email,academicId,names,fatherLastName,motherLastName,password}){
        console.log(fatherLastName);
        console.log(motherLastName);
        document.querySelector("#emailReturned").textContent = email;
        document.querySelector("#academiIdReturned").textContent = academicId;
        document.querySelector("#namesReturned").textContent = names;
        document.querySelector("#fatherLastNameReturned").textContent = fatherLastName;
        document.querySelector("#motherLastNameReturned").textContent = motherLastName;
        document.querySelector("#passwordReturned").textContent = password;

        const teacherInfoDiv = document.querySelector("#teacherInfo");
        const formContainer = document.querySelector(".form-container");

        formContainer.style.display = "none";
        teacherInfoDiv.style.display = "block";
    }

    function showToast(message, type) {
        const toast = document.getElementById("responseMessage");
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Hacer visible el toast
        toast.style.visibility = "visible";
        
        // Ocultar el toast después de 3 segundos
        setTimeout(function() {
          toast.style.visibility = "hidden";
        }, 3000);
      }

    async function onClickRegisterTeacher(event) {
        event.preventDefault();
        console.log("hola")
        const names = document.getElementById("name").value;
        const fatherLastName = document.getElementById("fatherLastName").value;
        const motherLastName = document.getElementById("motherLastName").value;

        registerTeacher({names,fatherLastName,motherLastName});

    }

    const fprm = document.getElementById("teacherForm");
    fprm.addEventListener("submit",onClickRegisterTeacher);

})
