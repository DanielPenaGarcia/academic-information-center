import BackButton from "../../../../shared/components/back-button/back-button.js";
import { router } from "../../../../shared/router.js";
import api from "../../../../shared/services/api.service.js";
import Header from "../../components/header/header.js";

document.addEventListener("DOMContentLoaded", function () {
  async function registerStudent({ names, fatherLastName, motherLastName }) {
    try {
      const response = await api.post({
        endpoint: "student",
        body: { names, fatherLastName, motherLastName },
      });
      if (response.status === 200 || response.status === 201) {
        showToast("Estudiante registrado exitosamente", "success");
        showStudentInfo(response.data.student);
      } else {
        showToast(
          "Algo salio mal al registrar al estudiante, intentelo mas tarde",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Hubo un problema con el registro del estudiante",
        "error"
      );
        console.error("Hubo un problema con el registro del estudiante:", error);
    }
  }

  function showStudentInfo({
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

    const studentInfoDiv = document.querySelector("#studentInfo");
    const formContainer = document.querySelector(".form-container");

    formContainer.style.display = "none";
    studentInfoDiv.style.display = "block";
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

  async function onClickRegisterStudent(event) {
    event.preventDefault();
    const names = document.getElementById("name").value;
    const fatherLastName = document.getElementById("fatherLastName").value;
    const motherLastName = document.getElementById("motherLastName").value;

    registerStudent({ names, fatherLastName, motherLastName });
  }

  async function onClickReturnToMenu(event) {
    event.preventDefault();
    router.replace('/admin');
  }

  const fprm = document.getElementById("studentForm");
  fprm.addEventListener("submit", onClickRegisterStudent);
  const returnToMenuBtn = document.querySelector("#returToMenuBtn");
  returnToMenuBtn.addEventListener("click",onClickReturnToMenu);
  window.customElements.define("admin-header", Header);
  window.customElements.define('back-button', BackButton);
});
