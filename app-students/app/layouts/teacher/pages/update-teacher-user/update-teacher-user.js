import BackButton from "../../../../shared/components/back-button/back-button.js";
import api from "../../../../shared/services/api.service.js";


document.addEventListener("DOMContentLoaded",function(){
    let teacherInfo;
    async function getTeacherInfo() {
        try{
            const response = await api.get({
                endpoint: "teacher"
            });
            if(response.status < 200 || response.status > 200){
                showToast(
                    "Hubo un error al consultar la informacion del maestro",
                    "error"
                  );
            }else{
            teacherInfo = response.data.teacher;
            fillTeacherForm(teacherInfo);
            }
        }catch(error){
            showToast(
                "Hubo un error al consultar la información del maestro",
                "error"
              );
            console.log("Hubo un error al consultar la informacion del maestro:", error)
        }
    }

    async function updateTeacher({names,fatherLastName,motherLastName,password,photo}) {
        try{
            const response = await api.patch({
                endpoint: "teacher",
                body:{names,fatherLastName,motherLastName,password,photo}
            });

            if (response.status === 200 || response.status === 201) {
                getTeacherInfo()
                showToast("Información del Maestro actualizado exitosamente", "success");
              } else {
                showToast(
                  "Algo salio mal al actualizar al maestro, intentelo mas tarde",
                  "error"
                );
              }
        }catch(error){
            showToast(
                "Hubo un error al actualizar al maestro",
                "error"
              );
            console.log("Hubo un error al actualizar al maestro:", error)
        }
    }

    function fillTeacherForm({names,fatherLastName,motherLastName}){
        document.querySelector("#names").value = names;
        document.querySelector("#fatherLastName").value = fatherLastName;
        document.querySelector("#motherLastName").value = motherLastName;
    }

    function onClickRestartTeacherForm(event){
        event.preventDefault();
        fillTeacherForm(teacherInfo);
    }

    function onClickUpdateTeacher(event){
        event.preventDefault();
        const names = document.querySelector("#names").value;
        const fatherLastName = document.querySelector("#fatherLastName").value;
        const motherLastName = document.querySelector("#motherLastName").value;
        const password = document.querySelector("#password").value;
        const passwordRepeat = document.querySelector("#passwordRepeat").value;

        const newTeacherData = {};
        if(names){
            newTeacherData.names = names;
        }
        if(fatherLastName){
            newTeacherData.fatherLastName = fatherLastName;
        }
        if(motherLastName){
            newTeacherData.motherLastName = motherLastName;
        }
        if(password){
            newTeacherData.password = password;
            if(password !== passwordRepeat){
                showToast(
                    "Las contraseñas no coinciden",
                    "error"
                  );
                return;
            }
        }
        //TODO UPDATE PHOTO
        updateTeacher(newTeacherData);
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

    getTeacherInfo();
    const restartBtn = document.querySelector("#restart");
    restartBtn.addEventListener("click",onClickRestartTeacherForm);
    
    const updateBtn = document.querySelector("#update");
    updateBtn.addEventListener("click",onClickUpdateTeacher);

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
        window.customElements.define('back-button', BackButton);

});