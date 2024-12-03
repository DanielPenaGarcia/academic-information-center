import api from "../../../../shared/services/api.service.js";

class GradeStudent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const currentScript = new URL(import.meta.url);
    const cssPath = `${currentScript.origin}${currentScript.pathname.replace(
      /\.js$/,
      ".css"
    )}`;
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", cssPath);
    this.shadowRoot.append(link);
  }

  #createModal(studentClass) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "grade-modal";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Header con el nombre del alumno
    const header = document.createElement("div");
    header.classList.add("modal-header");
    const studentName = document.createElement("h2");
    const { names, fatherLastName, motherLastName } = studentClass.student;
    studentName.textContent = `${names} ${fatherLastName} ${motherLastName}`;
    header.append(studentName);

    // Botón de cerrar
    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      modal.hidden = true;
      this.dispatchEvent(
        new CustomEvent("close-modal", { bubbles: true, composed: true })
      );
    });
    header.append(closeButton);

    // Campo de calificación
    const gradeLabel = document.createElement("label");
    gradeLabel.textContent = "Calificación:";
    gradeLabel.setAttribute("for", "grade-input");

    const gradeInput = document.createElement("input");
    gradeInput.id = "grade-input";
    gradeInput.type = "number";
    gradeInput.min = "0";
    gradeInput.max = "100";
    if (studentClass.grade) {
      gradeInput.value = studentClass.grade;
    }

    // Campo de descripción
    const descriptionSection = document.createElement("div");
    descriptionSection.classList.add("description-section");
    if (studentClass.grade < 70) {
      descriptionSection.hidden = false;
    } else {
      descriptionSection.hidden = true;
    }
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Retroalimentación:";
    descriptionLabel.setAttribute("for", "description-input");
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "description-input";
    descriptionInput.placeholder =
      "Indique una retroalimentación constructiva al estudiante";
    if (studentClass.feedback) {
        descriptionInput.value = studentClass.feedback;
    }
    descriptionSection.append(descriptionLabel, descriptionInput);
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.textContent = "Confirmar";
    const updateButtonLabelAndColor = () => {
      const grade = parseInt(gradeInput.value, 10);
      if (grade < 70) {
        confirmButton.textContent = "Reprobar";
        confirmButton.classList.add("reprobado");
        confirmButton.classList.remove("aprobado");
      } else {
        confirmButton.textContent = "Aprobar";
        confirmButton.classList.add("aprobado");
        confirmButton.classList.remove("reprobado");
      }
    };
    gradeInput.addEventListener("input", () => {
      const grade = parseInt(gradeInput.value, 10);
      if (grade < 70) {
        descriptionSection.hidden = false;
      } else {
        descriptionSection.hidden = true;
      }
      updateButtonLabelAndColor();
    });
    confirmButton.addEventListener("click", async () => {
      const grade = gradeInput.value;
      const feedback = descriptionInput.value;
      const classId = this.getAttribute("class-id");
      const academicId = this.getAttribute("academic-id");
      const response = await api.patch({
        endpoint: `student/${academicId}/classes/${classId}/grade`,
        body: { grade, feedback },
      });
      this.dispatchEvent(
        new CustomEvent("grade-confirmed", {
          bubbles: true,
          composed: true,
          detail: response.data,
        })
      );
      modal.hidden = true;
    });
    updateButtonLabelAndColor();
    modalContent.append(
      header,
      gradeLabel,
      gradeInput,
      descriptionSection,
      confirmButton
    );
    modal.append(modalContent);
    this.shadowRoot.append(modal);
  }

  connectedCallback() {
    this.#findStudentClass();
  }

  async #findStudentClass() {
    const classId = this.getAttribute("class-id");
    const academicId = this.getAttribute("academic-id");
    const response = await api.get({
      endpoint: `student/${academicId}/classes/${classId}`,
    });
    this.#createModal(response.data);
  }
}

window.customElements.define("grade-student", GradeStudent);
export default GradeStudent;
