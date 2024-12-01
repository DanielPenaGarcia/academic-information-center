class StudentItem extends HTMLElement {
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

  connectedCallback() {
    this.classId = this.getAttribute("student-id");
    this.name = this.getAttribute("student-name");
    this.createStudentItem();
  }

  createStudentItem() {
    const item = document.createElement("div");
    item.classList.add("student-item", "row");
    const basicInformation = document.createElement("div");
    basicInformation.classList.add("basic-information");
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.innerHTML = this.#createStudentIcon();
    basicInformation.append(icon);
    const name = document.createElement("div");
    name.classList.add("name");
    const nameText = document.createElement("p");
    nameText.textContent = this.name;
    name.append(nameText);
    basicInformation.append(name);
    const actions = document.createElement("div");
    actions.classList.add("actions");
    const detailsButton = this.#detailsStudentButton();
    actions.append(detailsButton);
    const gradeButton = this.#gradeStudentButton();
    actions.append(gradeButton);
    item.append(basicInformation);
    item.append(actions);
    this.shadowRoot.append(item);
  }

  #detailsStudentButton() {
    const detailsButton = document.createElement("button");
    detailsButton.classList.add("btn", "action");
    detailsButton.textContent = "Detalles";
    detailsButton.addEventListener("click", () => {
      console.log("Detalles del estudiante");
    });
    return detailsButton;
  }

  //Calificar estudiante
  #gradeStudentButton() {
    const gradeButton = document.createElement("button");
    gradeButton.classList.add("btn", "action");
    gradeButton.textContent = "Calificar";
    gradeButton.addEventListener("click", () => {
      console.log("Calificar estudiante");
    });
    return gradeButton;
  }

  #createStudentIcon() {
    return `
    <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M14.217 3.5a5.17 5.17 0 0 0-4.434 0L3.092 6.637c-1.456.682-1.456 3.044 0 3.726l6.69 3.137a5.17 5.17 0 0 0 4.435 0l6.691-3.137c1.456-.682 1.456-3.044 0-3.726zM22 8.5v5"
      />
      <path
        d="M5 11.5v5.125C5 19.543 9.694 21 12 21s7-1.457 7-4.375V11.5"
      />
    </svg>
    `;
  }
}

export default StudentItem;