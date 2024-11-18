import api from "../../../../shared/services/api.service.js";
import SubjectItem from "../subject-item/subject-item.js";

class TableSubject extends HTMLElement {
  totalElements = 0;
  totalPages = 0;
  currentPage = 1;
  selectedSubject = null; // Para rastrear la materia seleccionada

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.year = this.getAttribute("year") ? this.getAttribute("year") : "";
    this.name = this.getAttribute("name") ? this.getAttribute("name") : "";
    this.semester = this.getAttribute("semester")
      ? this.getAttribute("semester")
      : "";
    this.page = this.getAttribute("page")
      ? parseInt(this.getAttribute("page"))
      : 1;
    this.size = this.getAttribute("size")
      ? parseInt(this.getAttribute("size"))
      : 10;
  }

  connectedCallback() {
    this.findSubjectByCourseMapYear();
  }

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

  updatePage(direction) {
    if (direction === "next" && this.currentPage < this.totalPages) {
      this.page++;
    } else if (direction === "previous" && this.currentPage > 1) {
      this.page--;
    }
    this.findSubjectByCourseMapYear(); // Volver a llamar a la API con la nueva página
  }

  handleRadioChange(subjectId) {
    this.selectedSubject = subjectId; // Actualizar la materia seleccionada
    console.log("Materia seleccionada:", this.selectedSubject);
  }

  render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    // Reemplazar el contenido HTML del shadow DOM
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
                      <tr class="table-subject__body__row">
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
            <button id="previousPage" ${
              this.page <= 1 ? "disabled" : ""
            }>Anterior</button>
            <span class="current-page">Página ${this.currentPage} de ${this.totalPages}</span>
            <button id="nextPage" ${
              this.page >= this.totalPages ? "disabled" : ""
            }>Siguiente</button>
          </div>
      `;

    // Crear un <link> para importar el CSS
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute(
      "href",
      `../../components/table-subject/table-subject.css`
    );

    // Añadir el <link> al shadow DOM
    this.shadowRoot.appendChild(styleLink);

    // Añadir los eventos para cambiar de página
    const previousPageButton = this.shadowRoot.querySelector("#previousPage");
    const nextPageButton = this.shadowRoot.querySelector("#nextPage");

    if (previousPageButton) {
      previousPageButton.addEventListener("click", () =>
        this.updatePage("previous")
      );
    }

    if (nextPageButton) {
      nextPageButton.addEventListener("click", () => this.updatePage("next"));
    }

    // Añadir eventos a los radio buttons
    const radios = this.shadowRoot.querySelectorAll(".subject-radio");
    radios.forEach((radio) => {
      const subjectId = radio.dataset.id; // Obtener el ID de la materia
      radio.addEventListener("change", () => this.handleRadioChange(subjectId));
    });
  }
}

export default TableSubject;
