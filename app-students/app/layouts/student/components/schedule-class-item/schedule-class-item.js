class ScheduleClassItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    try {
      const currentScript = new URL(import.meta.url);
      const cssPath = `${currentScript.origin}${currentScript.pathname.replace(
        /\.js$/,
        ".css"
      )}`;
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", cssPath);
      this.shadowRoot.append(link);
    } catch (e) {
      console.error("Error loading CSS:", e);
    }
    this.#getAttributes();
  }

  connectedCallback() {
    this.#getAttributes();
    this.build();
  }

  build() {
    const classItem = document.createElement("div");
    classItem.classList.add("class-item");

    //Subject data
    const subject = document.createElement("div");
    subject.classList.add("subject-name");
    subject.textContent = this.schedule?.klass.subject?.name || "N/A";

    //Teacher data
    const teacher = document.createElement("div");
    teacher.classList.add("teacher-name");
    const teacherLabel = document.createElement("span");
    teacherLabel.classList.add("label");
    teacherLabel.textContent = "Maestro:";
    teacher.append(teacherLabel);
    const teacherName = document.createElement("span");
    teacherName.classList.add("value");
    teacherName.textContent = this.schedule?.klass.teacher?.names || "N/A";
    teacher.append(teacherName);

    //Classroom data
    const classroom = document.createElement("div");
    classroom.classList.add("classroom");
    classroom.textContent = "LV-1800"; // Cambiar si es dinámico

    //Schedule data
    const schedule = document.createElement("div");
    schedule.classList.add("schedule");
    const scheduleStars = document.createElement("span");
    scheduleStars.classList.add("stars");
    //Remove seconds from time
    scheduleStars.textContent = this.schedule?.klass.startTime.split(":").slice(0, 2).join(":");
    const dash = document.createElement("span");
    dash.textContent = "-";
    const scheduleEnd = document.createElement("span");
    scheduleEnd.classList.add("ends");

    // Calcular horario final
    const duration = this.schedule?.klass.duration || 0;
    const startTime = this.schedule?.klass.startTime.split(":") || [0, 0];
    const startHours = parseInt(startTime[0]);
    const startMinutes = parseInt(startTime[1]);
    const totalMinutes = startMinutes + (duration % 60);
    const endHours =
      startHours + Math.floor(duration / 60) + Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    scheduleEnd.textContent = `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
    schedule.append(scheduleStars);
    schedule.append(dash);
    schedule.append(scheduleEnd);

    // Append all elements
    classItem.append(subject);
    classItem.append(teacher);
    classItem.append(classroom);
    classItem.append(schedule);
    this.shadowRoot.append(classItem);
  }

  #getAttributes() {
    const scheduleAttribute = this.getAttribute("schedule");
    try {
      this.schedule = scheduleAttribute ? JSON.parse(scheduleAttribute) : null;
    } catch (e) {
      console.error("Error parsing schedule attribute:", e);
      this.schedule = null;
    }
  }
}

export default ScheduleClassItem;
