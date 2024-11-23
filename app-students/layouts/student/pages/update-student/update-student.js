import api from "../../../../shared/services/api.service.js";


document.addEventListener("DOMContentLoaded",function(){
    let studentInfo;
    async function getStudentInfo() {
        try{
            const response = await api.get({
                endpoint: "student"
            });
            if(response.status < 200 || response.status > 200){
                showToast(
                    "Hubo un error al consultar la informacion del estudiante",
                    "error"
                  );
            }else{
            studentInfo = response.data.student;
            fillStudentForm(studentInfo);
            }
        }catch(error){
            showToast(
                "Hubo un error al consultar la información del estudiante",
                "error"
              );
            console.log("Hubo un error al consultar la informacion del estudiante:", error)
        }
    }

    async function updateStudent({names,fatherLastName,motherLastName,password,photo}) {
        try{
            const response = await api.patch({
                endpoint: "student",
                body:{names,fatherLastName,motherLastName,password,photo}
            });

            if (response.status === 200 || response.status === 201) {
                getStudentInfo()
                showToast("Información del Estudiante actualizado exitosamente", "success");
              } else {
                showToast(
                  "Algo salio mal al actualizar al estudiante, intentelo mas tarde",
                  "error"
                );
              }
        }catch(error){
            showToast(
                "Hubo un error al actualizar al estudiante",
                "error"
              );
            console.log("Hubo un error al actualizar al estudiante:", error)
        }
    }

    function fillStudentForm({names,fatherLastName,motherLastName}){
        document.querySelector("#names").value = names;
        document.querySelector("#fatherLastName").value = fatherLastName;
        document.querySelector("#motherLastName").value = motherLastName;
        document.querySelector("#password").value = "";
        document.querySelector("#passwordRepeat").value = "";
    }

    function onClickRestartStudentForm(event){
        event.preventDefault();
        fillStudentForm(studentInfo);
    }

    function onClickUpdateStudent(event){
        event.preventDefault();
        const names = document.querySelector("#names").value;
        const fatherLastName = document.querySelector("#fatherLastName").value;
        const motherLastName = document.querySelector("#motherLastName").value;
        const password = document.querySelector("#password").value;
        const passwordRepeat = document.querySelector("#passwordRepeat").value;

        const newStudentData = {};
        if(names){
            newStudentData.names = names;
        }
        if(fatherLastName){
            newStudentData.fatherLastName = fatherLastName;
        }
        if(motherLastName){
            newStudentData.motherLastName = motherLastName;
        }
        if(password){
            newStudentData.password = password;
            if(password !== passwordRepeat){
                showToast(
                    "Las contraseñas no coinciden",
                    "error"
                  );
                return;
            }
        }
        //TODO UPDATE PHOTO
        updateStudent(newStudentData);
    }

    function showToast(message, type) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = `toast ${type}`;
    
        toast.style.visibility = "visible";
    
        setTimeout(function () {
          toast.style.visibility = "hidden";
        }, 3000);
      }

    getStudentInfo();
    const restartBtn = document.querySelector("#restart");
    restartBtn.addEventListener("click",onClickRestartStudentForm);
    
    const updateBtn = document.querySelector("#update");
    updateBtn.addEventListener("click",onClickUpdateStudent);

    const togglePasswordButton = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const togglePasswordButtonRepeat = document.getElementById("togglePasswordRepeat");
    const passwordInputRepeat = document.getElementById("passwordRepeat");

    togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.textContent = "Ocultar";
    } else {
        passwordInput.type = "password";
        togglePasswordButton.textContent = "Ver";
    }
    });

    togglePasswordButtonRepeat.addEventListener("click", () => {
        if (passwordInputRepeat.type === "password") {
            passwordInputRepeat.type = "text";
            togglePasswordButtonRepeat.textContent = "Ocultar";
        } else {
            passwordInputRepeat.type = "password";
            togglePasswordButtonRepeat.textContent = "Ver";
        }
        });

});