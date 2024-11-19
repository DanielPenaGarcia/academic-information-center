import api from "../../../../shared/services/api.service.js";
import SubjectItem from "../subject-item/subject-item.js";

class TableSubject extends HTMLElement {
  totalElements = 0;
  totalPages = 0;
  currentPage = 1;
  selectedSubject = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.year = this.getAttribute("year") || "";
    this.name = this.getAttribute("name") || "";
    this.semester = this.getAttribute("semester") || "";
    this.page = parseInt(this.getAttribute("page")) || 1;
    this.size = parseInt(this.getAttribute("size")) || 10;
    this.subjects = [];

    // Llamar a métodos iniciales
    this.addListeners();
  }

  // Método para agregar los listeners iniciales
  addListeners() {
    this.addPageListeners();
  }

  // Se ejecuta cuando el componente se inserta en el DOM
  connectedCallback() {
    this.findSubjectByCourseMapYear();
  }

  // Método para obtener materias por año usando la API
  async findSubjectByCourseMapYear() {
    try {
      const response = await api.get({
        endpoint: `subjects/course-map/year/${this.year}`,
        query: {
          name: this.name,
          semester: this.semester,
          page: this.page,
          size: this.size,
        },
      });

      if (response.status === 200) {
        this.subjects = response.data.subjects.map(
          (subject) =>
            new SubjectItem({ ...subject, hours: subject.hoursPerWeek })
        );
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;

        this.render();
      }
    } catch (error) {
      console.error("Hubo un problema al obtener las materias:", error);
    }
  }

  // Método para actualizar la página
  updatePage(direction) {
    if (direction === "next" && this.currentPage < this.totalPages) {
      this.page++;
    } else if (direction === "previous" && this.currentPage > 1) {
      this.page--;
    }
    this.findSubjectByCourseMapYear(); // Volver a llamar a la API con la nueva página
  }

  // Método para manejar cambios en los radio buttons
  handleRadioChange(subjectId) {
    this.selectedSubject = this.subjects.find(subject => {
      return subject.id == subjectId;
    });
    this.selectedSubjectEvent(this.selectedSubject);
  }

  // Método para emitir un evento personalizado cuando se selecciona una materia
  selectedSubjectEvent(selectedSubject) {
    this.dispatchEvent(
      new CustomEvent("subject-selected", {
        detail: selectedSubject,
        bubbles: true,
        composed: true,
      })
    );
  }

  // Método para agregar eventos a los radio buttons después de renderizar
  addSubjectItemListeners() {
    const subjectItems = this.shadowRoot.querySelectorAll(".table-item");

    subjectItems.forEach((subjectItem) => {
      // Agregar evento click al contenedor
      subjectItem.addEventListener("click", (e) => this.onSubjectItemClick(e, subjectItem));
    });
  }

  // Método que maneja el click en un subject-item
  onSubjectItemClick(event, subjectItem) {
    const radio = subjectItem.querySelector(".subject-radio");
    if (radio && !radio.checked) {
      radio.checked = true;
    }
    
    // Emitir el cambio al seleccionar el radio
    if (radio) {
      this.handleRadioChange(radio.getAttribute("data-id"));
    }
  }

  // Método para agregar eventos de paginación
  addPageListeners() {
    const previousPageButton = this.shadowRoot.querySelector("#previousPage");
    const nextPageButton = this.shadowRoot.querySelector("#nextPage");

    if (previousPageButton) {
      previousPageButton.addEventListener("click", () =>
        this.updatePage("previous")
      );
    }

    if (nextPageButton) {
      nextPageButton.addEventListener("click", () =>
        this.updatePage("next")
      );
    }
  }

  // Método principal para renderizar el contenido HTML
  render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot.innerHTML = `
      <table class="table-subject">
          <thead>
              <tr class="table-subject__header">
                  <th class="table-subject__header__select">Seleccionar</th>
                  <th class="table-subject__header__name">Nombre</th>
                  <th class="table-subject__header__hours">Horas</th>
                  <th class="table-subject__header__semester">Semestre</th>
                  <th class="table-subject__header__year">Año</th>
              </tr>
          </thead>
          <tbody class="table-subject__body">
            ${this.subjects
              .map(
                (subject) => `  
                <tr class="table-subject__body__row table-item" id="${subject.id}">
                  <td>
                      <input type="radio" 
                            name="subject-radio" 
                            class="subject-radio" 
                            data-id="${subject.id}" />
                  </td>
                  <td>${subject.name}</td>
                  <td>${subject.hours}</td>
                  <td>${subject.semester}</td>
                  <td>${subject.year}</td>
                </tr>`
              )
              .join("")}
          </tbody>
      </table>
      <div class="table-subject__footer">
        <button id="previousPage" ${this.page <= 1 ? "disabled" : ""}>Anterior</button>
        <span class="current-page">Página ${this.currentPage} de ${this.totalPages}</span>
        <button id="nextPage" ${this.page >= this.totalPages ? "disabled" : ""}>Siguiente</button>
      </div>
    `;

    this.attachStyles();
    this.addPageListeners();
    this.addSubjectItemListeners();
  }

  // Método para agregar estilos
  attachStyles() {
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", `../../components/table-subject/table-subject.css`);
    this.shadowRoot.appendChild(styleLink);
  }
}

export default TableSubject;
