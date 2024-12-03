import BackButton from "../../../../shared/components/back-button/back-button.js";
import { router } from "../../../../shared/router.js";
import api from "../../../../shared/services/api.service.js";
import Header from "../../components/header/header.js";

document.addEventListener("DOMContentLoaded", function () {
  async function registerTeacher({ names, fatherLastName, motherLastName }) {
    try {
      const response = await api.post({
        endpoint: "teacher",
        body: { names, fatherLastName, motherLastName },
      });
      if (response.status === 200 || response.status === 201) {
        showToast("Maestro registrado exitosamente", "success");
        showTeacherInfo(response.data.teacher);
      } else {
        showToast(
          "Algo salio mal al registrar al maestro, intentelo mas tarde",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Hubo un problema con el registro del maestro",
        "error"
      );
        console.error("Hubo un problema con el registro del maestro:", error);
    }
  }

  function showTeacherInfo({
    email,
    academicId,
    names,
    fatherLastName,
    motherLastName,
    password,
  }) {
    document.querySelector("#emailReturned").textContent = email;
    document.querySelector("#academiIdReturned").textContent = academicId;
    document.querySelector("#namesReturned").textContent = names;
    document.querySelector("#fatherLastNameReturned").textContent =
      fatherLastName;
    document.querySelector("#motherLastNameReturned").textContent =
      motherLastName;
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

    toast.style.visibility = "visible";

    setTimeout(function () {
      toast.style.visibility = "hidden";
    }, 3000);
  }

  async function onClickRegisterTeacher(event) {
    event.preventDefault();
    const names = document.getElementById("name").value;
    const fatherLastName = document.getElementById("fatherLastName").value;
    const motherLastName = document.getElementById("motherLastName").value;

    registerTeacher({ names, fatherLastName, motherLastName });
  }

  async function onClickReturnToMenu(event) {
    event.preventDefault();
    router.replace('/admin');
  }

  const fprm = document.getElementById("teacherForm");
  fprm.addEventListener("submit", onClickRegisterTeacher);
  const returnToMenuBtn = document.querySelector("#returToMenuBtn");
  returnToMenuBtn.addEventListener("click",onClickReturnToMenu);
  window.customElements.define("admin-header", Header);
  window.customElements.define('back-button', BackButton);
});
