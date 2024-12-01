import api from '../../../../shared/services/api.service.js';

class ClassItem extends HTMLElement {
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
    this.descriptionEnabled = false;
  }

  connectedCallback() {
    this.currentDescription = this.getAttribute("description");
    this.id = this.getAttribute("class-id");
    this.subjectName = this.getAttribute("subject-name");
    this.days = this.getAttribute("days");
    this.classroom = this.getAttribute("classroom");
    this.duration = this.getAttribute("duration");
    this.startTime = this.getAttribute("start-time");
    this.createClassItem();
  }

  createClassItem() {
    //item
    const classItem = document.createElement("div");
    classItem.className = "class-item";
    classItem.id = `class-${this.id}`;
    //Header
    const header = document.createElement("div");
    header.className = "class-header";
    header.innerHTML = `<h2>${this.subjectName}</h2>`;
    classItem.appendChild(header);
    //Content
    const content = document.createElement("div");
    content.className = "class-content";
    //class-infos
    //Days
    const days = document.createElement("p");
    days.className = "class-info";
    //Label
    const daysLabel = document.createElement("span");
    daysLabel.className = "info-label";
    daysLabel.innerHTML = `
    ${this.#daysIcon()}
    <strong>Días:</strong>
    `;
    days.appendChild(daysLabel);
    //Value
    const daysValue = document.createElement("span");
    daysValue.textContent = `${this.#getDays()}`;
    days.appendChild(daysValue);
    content.appendChild(days);
    //Hours
    // Calcular horario final
    const duration = this.duration || 0;
    const startTime = this.startTime.split(":") || [0, 0];
    const startHours = parseInt(startTime[0]);
    const startMinutes = parseInt(startTime[1]);
    const totalMinutes = startMinutes + (duration % 60);
    const endHours =
      startHours + Math.floor(duration / 60) + Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    const hours = document.createElement("p");
    hours.className = "class-info";
    //Label
    const hoursLabel = document.createElement("span");
    hoursLabel.className = "info-label";
    hoursLabel.innerHTML = `
    ${this.#hoursIcon()}
    <strong>Horario:</strong>
    `;
    hours.appendChild(hoursLabel);
    //Value
    const hoursValue = document.createElement("span");
    hoursValue.textContent = `${this.startTime
      .split(":")
      .slice(0, 2)
      .join(":")} - ${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
    hours.appendChild(hoursValue);
    content.appendChild(hours);
    //Room
    const room = document.createElement("p");
    room.className = "class-info";
    //Label
    const roomLabel = document.createElement("span");
    roomLabel.className = "info-label";
    roomLabel.innerHTML = `
    ${this.#roomIcon()}
    <strong>Aula:</strong>
    `;
    room.appendChild(roomLabel);
    //Value
    const roomValue = document.createElement("span");
    roomValue.textContent = `${this.classroom}`;
    room.appendChild(roomValue);
    content.appendChild(room);
    //Class description
    const description = document.createElement("div");
    description.className = "class-description";
    const descriptionInfo = document.createElement("p");
    descriptionInfo.className = "class-info";
    descriptionInfo.innerHTML = `<strong>Descripción:</strong>.`;
    description.appendChild(descriptionInfo);
    const descriptionText = document.createElement("textarea");
    if (this.currentDescription) {
      descriptionText.textContent = this.currentDescription;
    } else {
      descriptionText.placeholder = "Agrega una descripción";
    }
    descriptionText.disabled = !this.descriptionEnabled;
    description.appendChild(descriptionText);
    content.appendChild(description);
    classItem.appendChild(content);
    //Footer
    const footer = document.createElement("div");
    footer.className = "class-footer";
    const editButton = this.#createEditButton({ classId: this.id });
    footer.appendChild(editButton);
    //See students
    const studentsButton = document.createElement("button");
    studentsButton.classList.add("btn", "class-option");
    studentsButton.textContent = "Ver alumnos";
    footer.appendChild(studentsButton);
    classItem.appendChild(footer);

    this.shadowRoot.appendChild(classItem);
  }

  #getDays() {
    let days = [];
    const daysArray = this.days.split(",");
    daysArray.map((day) => {
      if (day === "L") {
        days.push("Lunes");
      } else if (day === "M") {
        days.push("Martes");
      } else if (day === "X") {
        days.push("Miércoles");
      } else if (day === "J") {
        days.push("Jueves");
      } else if (day === "V") {
        days.push("Viernes");
      } else if (day === "S") {
        days.push("Sábado");
      } else if (day === "D") {
        days.push("Domingo");
      } else {
        days.push("Día no válido");
      }
    });
    return days.join(", ");
  }

  #createEditButton({ classId }) {
    const button = document.createElement("button");
    button.classList.add("btn", "class-option", "icon-option");
    button.id = `class-${classId}-edit`;
    button.innerHTML = this.#editIcon();
    button.addEventListener("click", (event) => this.toggleEditButton(event)); // Usamos una función flecha
    return button;
  }

  toggleEditButton(event) {
    const textArea = this.shadowRoot.querySelector("textarea");
    const button = event.currentTarget; // Apunta al botón, no al SVG

    if (textArea) {
      textArea.disabled = !textArea.disabled;

      if (!textArea.disabled) {
        // Si el textarea está habilitado
        textArea.focus();
        button.innerHTML = `Guardar`;
        button.className = "btn class-option"; // Cambia las clases al estilo de "Guardar"
        const classItem = this.shadowRoot.querySelector(".class-item");
        classItem.classList.remove("updating");
      } else {
        const classItem = this.shadowRoot.querySelector(".class-item");
        if (textArea.value !== this.currentDescription) {
          classItem.classList.add("updating");
          this.#updateDescription({ description: textArea.value });
        }
        button.innerHTML = this.#editIcon();
        button.className = "btn class-option icon-option";
      }
    }
  }

  async #updateDescription({ description }) {
    const button = this.shadowRoot.getElementById(`class-${this.id}-edit`);
    button.disabled = true;
    const response = await api.patch({ endpoint: `classes/${this.id}/description`, body: { description } });
    if (response.status === 200) {
      this.currentDescription = description;
    }
    button.disabled = false;
  }

  #daysIcon() {
    return `
    <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        stroke-linejoin="round"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
    >
    <path 
        d="M16.5 5V3m-9 2V3M3.25 8h17.5M3 10.044c0-2.115 0-3.173.436-3.981a3.9 3.9 0 0 1 1.748-1.651C6.04 4 7.16 4 9.4 4h5.2c2.24 0 3.36 0 4.216.412.753.362 1.364.94 1.748 1.65.436.81.436 1.868.436 3.983v4.912c0 2.115 0 3.173-.436 3.981a3.9 3.9 0 0 1-1.748 1.651C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.412a3.9 3.9 0 0 1-1.748-1.65C3 18.128 3 17.07 3 14.955z"
    />
    </svg>
    `;
  }

  #hoursIcon() {
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
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
        <path d="M12 6v6l4 2" />
    </svg>
    `;
  }

  #roomIcon() {
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
            d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z"
        />
        <path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21" />
    </svg>
    `;
  }

  #editIcon() {
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
        d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z"
      />
      <path
        d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"
      />
    </svg>
    `;
  }
}

export default ClassItem;
