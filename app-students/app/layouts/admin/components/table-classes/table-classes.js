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

  
    this.addListeners();
  }


  addListeners() {
    this.addPageListeners();
  }


 async connectedCallback() {
    const teacherId = this.getAttribute("teacher-id");  
    if (teacherId) {
      this.findClassesByTeacher(teacherId);  
    }
  }



  async findClassesByTeacher(teacherId) {
    try {
      const response = await api.get({
        endpoint: `classes/teacherSubjects`,
        query: { teacherId },
      });
      

      if (response.status === 200) {
        console.log(response.data);
        const data = Array.isArray(response.data) ? response.data.flat() : [];
        this.classes = data.map((classItem) => {
          return {
            ...classItem,
            subject: classItem.subject,
            startTime: classItem.startTime,
            days: classItem.days,
          };
        });
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        console.log(this.classes);
        this.render();
      }


    } catch (error) {
      console.error(error);
    };

  }

 
  async updatePage(direction) {
    if (direction === "next" && this.currentPage < this.totalPages) {
      this.page++;
    } else if (direction === "previous" && this.currentPage > 1) {
      this.page--;
    }

    this.findClassesByTeacher(this.getAttribute("teacher-id"));
  }

  async handleRadioChange(classId) {
    const selectedClass = this.classes.find(
      (classItem) => classItem.id === parseInt(classId)
    );

    this.selectedClass = selectedClass;
    this.selectedClassEvent(selectedClass);
  }

  async selectedClassEvent(selectedClass) {
    this.dispatchEvent(
      new CustomEvent("class-selected", {
        detail: selectedClass,
        bubbles: true,
        composed: true,
      })
    );
  }

  async addSubjectItemListeners() {
    const classItems = this.shadowRoot.querySelectorAll(".table-item");

    classItems.forEach((classItem) => {
      
      classItem.addEventListener("click", (e) =>
        this.onClassItemClick(e, classItem)
      );
    });
  }

  async onClassItemClick(event, classItem) {
    const radio = classItem.querySelector(".class-radio");
    if (radio && !radio.checked) {
      radio.checked = true;
    }

   
    if (radio) {
      this.handleRadioChange(radio.getAttribute("data-id"));
    }
  }

  async addPageListeners() {
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

  async render() {
    if (!this.shadowRoot) {
      
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot.innerHTML = `
         <table class="table-classes">
          <thead>
              <tr class="table-classes__header">
                  <th class="table-classes__header__select">Seleccionar</th>
                  <th class="table-classes__header__name">Nombre</th>
                  <th class="table-classes__header__days">Hora</th>
                  <th class="table-classes__header__hour">Dias</th>
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
                  <td>${classItem.subject.name}</td>
                  <td>${classItem.startTime}</td>
                  <td>${classItem.days}</td>
                </tr>`
    ).join("")}          
          </tbody>
      </table>
      <div class="table-classes__footer">
        <button id="previousPage" ${this.page <= 1 ? "disabled" : ""
      }>Anterior</button>
        <span class="current-page">Página ${this.currentPage} de ${this.totalPages
      }</span>
        <button id="nextPage" ${this.page >= this.totalPages ? "disabled" : ""
      }>Siguiente</button>
      </div>
    `;


    this.attachStyles();
    this.addPageListeners();
    this.addSubjectItemListeners();
  }


 
  async attachStyles() {
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




