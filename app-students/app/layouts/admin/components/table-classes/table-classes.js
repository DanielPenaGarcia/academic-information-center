import api from "../../../../shared/services/api.service.js";

class TableClasses extends HTMLElement {
    totalElements = 0;
    totalPages = 0;
    currentPage = 1;
    selectedClass = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subject = this.getAttribute("subject") || "";
        this.days = this.getAttribute("days") || "";
        this.startTime = this.getAttribute("startTime") || "";
        this.page = parseInt(this.getAttribute("page")) || 1;
        this.size = parseInt(this.getAttribute("size")) || 10;
        this.classes = [];

        // Llamar a métodos iniciales
        this.addListeners();
    }

    // Método para agregar los listeners iniciales
    addListeners() {
        this.addPageListeners();
    }

    // Se ejecuta cuando el componente se inserta en el DOM
    connectedCallback() {
        this.findClassesBySubject();
    }

    // Método para obtener clases por materia usando la API
    
    async findClassesBySubject() {
       
    }

    // Metodo para actualizar la pagina de la tabla

    updatePage(direction) {
        if (direction === "next" && this.currentPage < this.totalPages) {
            this.page++;
          } else if (direction === "previous" && this.currentPage > 1) {
            this.page--;
          }

        this.findClassesBySubject();
    }

    handleRadioChange(classId) {
        const selectedClass = this.classes.find(
          (classItem) => classItem.id === parseInt(classId)
        );
    
        this.selectedClass = selectedClass;
        this.selectedClassEvent(selectedClass);
    } 
    
    selectedClassEvent(selectedClass) {
        this.dispatchEvent(
          new CustomEvent("class-selected", {
            detail: selectedClass,
            bubbles: true,
            composed: true,
          })
        );
    }

    addSubjectItemListeners() {
        const classItems = this.shadowRoot.querySelectorAll(".table-item");
    
        classItems.forEach((classItem) => {
          // Agregar evento click al contenedor
          classItem.addEventListener("click", (e) =>
            this.onClassItemClick(e, classItem)
          );
        });
    }

    onClassItemClick(event, classItem) {
        const radio = classItem.querySelector(".class-radio");
        if (radio && !radio.checked) {
          radio.checked = true;
        }
    
        // Emitir el cambio al seleccionar el radio
        if (radio) {
          this.handleRadioChange(radio.getAttribute("data-id"));
        }
    }

    addPageListeners() {
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
    }

    render(){
        if(!this.shadowRoot){
            this.attachShadow({mode: "open"});
        }

        this.shadowRoot.innerHTML = `
         <table class="table-classes">
          <thead>
              <tr class="table-classes__header">
                  <th class="table-classes__header__select">Seleccionar</th>
                  <th class="table-classes__header__name">Materia</th>
                  <th class="table-classes__header__hours">Dias</th>
                  <th class="table-classes__header__semester">Hora</th>
              </tr>
          </thead>
          <tbody class="table-classes__body">
                ${this.classes.map(
                    (classItem) => `
                <tr class="table-classes__body__row table-item" id="${classItem.id}">
                  <td>
                      <input type="radio" 
                            name="class-radio" 
                            class="class-radio" 
                            data-id="${classItem.id}" />
                  </td>
                  <td>${classItem.name}</td>
                  <td>${classItem.hours}</td>
                  <td>${classItem.semester}</td>
                  <td>${classItem.year}</td>
                </tr>`   
                ).join("")}          
          </tbody>
      </table>
      <div class="table-classes__footer">
        <button id="previousPage" ${
          this.page <= 1 ? "disabled" : ""
        }>Anterior</button>
        <span class="current-page">Página ${this.currentPage} de ${
      this.totalPages
    }</span>
        <button id="nextPage" ${
          this.page >= this.totalPages ? "disabled" : ""
        }>Siguiente</button>
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
    styleLink.setAttribute(
      "href",
      `../../components/table-classes/table-classes.css`
    );
    this.shadowRoot.appendChild(styleLink);
  }

}   

export default TableClasses;