import api from "../../../../shared/services/api.service";

class EnrolledClasses extends HTMLElement{

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.studentId = (JSON.parse(localStorage.getItem('user'))).id
        this.page = parseInt(this.getAttribute("page")) || 1;
        this.size = parseInt(this.getAttribute("size")) || 10;
        this.classes = [];
        this.addListeners();
      }

      addListeners() {
        this.addPageListeners();
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

      async getEnrolledClasses(){

        const body = {
            studentId: this.studentId
          };

        try{

            const response = await api.post({
                endpoint: `classes/enrolledClasses`,
                body
              });
              if (response.status === 200 && Array.isArray(response.data)) {
                const subjectMap = {};
        
                response.data.forEach((klass) => {
                  const subjectName = klass.subject?.name; 
                  const teacherName = klass.teacher?.names; 
                  const startTime = klass.startTime;        
                  const duration = klass.duration;          
                  const days = klass.days;  
                  const id = klass.id;                
        
                  if (subjectName && teacherName && startTime && duration && days) {
                    if (!subjectMap[subjectName]) {
                      subjectMap[subjectName] = [];
                    }
        
                    const finishTime = calculateEndTime(startTime, duration);
        
                  } else {
                    console.warn(`Missing data for Klass ID: ${klass.id}`);
                  }
                });
                this.render();
              }
        } catch (error){
            console.error("Hubo un problema al obtener las materias:", error);
        }
      }

    calculateEndTime(startTime, duration) {
        const [hours, minutes, seconds] = startTime.split(':').map(Number);
        const endHour = hours + duration;
        return formatTime(`${endHour}:${minutes}:${seconds}`);
      }
    
    formatTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = ((hours + 11) % 12 + 1);
        return `${formattedHour}:${String(minutes).padStart(2, '0')} ${period}`;
      }
      
      render() {
        if (!this.shadowRoot) {
          this.attachShadow({ mode: "open" });
        }
      
        // Clear previous content
        this.shadowRoot.innerHTML = "";
      
        // Attach styles
        this.attachStyles();
      
        // Create a container for the enrolled classes
        const container = document.createElement("div");
        container.classList.add("enrolled-classes-container");
      
        // Iterate through the enrolled classes and render them
        if (this.classes && this.classes.length > 0) {
          const classList = document.createElement("ul");
          classList.classList.add("class-list");
      
          this.classes.forEach((klass) => {
            const listItem = document.createElement("li");
            listItem.classList.add("class-item");
      
            // Assuming that each 'klass' has a subject, teacher, and time details
            const subjectName = klass.subjectName || "Unknown Subject";
            const teacherName = klass.teacherName || "Unknown Teacher";
            const startTime = klass.startTime || "TBD";
            const duration = klass.duration || "TBD";
            const status = klass.status || "Pending";
            const grade = klass.grade || "N/A";
      
            listItem.innerHTML = `
              <div class="class-details">
                <h3>${subjectName}</h3>
                <p><strong>Teacher:</strong> ${teacherName}</p>
                <p><strong>Start Time:</strong> ${startTime}</p>
                <p><strong>Duration:</strong> ${duration} hours</p>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Grade:</strong> ${grade}</p>
              </div>
            `;
      
            classList.appendChild(listItem);
          });
      
          container.appendChild(classList);
        } else {
          // If no classes, display a message
          const noClassesMessage = document.createElement("p");
          noClassesMessage.textContent = "You are not enrolled in any classes.";
          container.appendChild(noClassesMessage);
        }
      
        // Add pagination buttons (optional)
        this.addPaginationButtons(container);
      
        // Append the container to the shadow root
        this.shadowRoot.appendChild(container);
      }
      
      // Helper method to add pagination buttons
      addPaginationButtons(container) {
        const pagination = document.createElement("div");
        pagination.classList.add("pagination");
      
        const previousPageButton = document.createElement("button");
        previousPageButton.id = "previousPage";
        previousPageButton.textContent = "Previous";
      
        const nextPageButton = document.createElement("button");
        nextPageButton.id = "nextPage";
        nextPageButton.textContent = "Next";
      
        pagination.appendChild(previousPageButton);
        pagination.appendChild(nextPageButton);
      
        container.appendChild(pagination);
      }
      
    
      // Método para agregar estilos
      attachStyles() {
        const styleLink = document.createElement("link");
        styleLink.setAttribute("rel", "stylesheet");
        styleLink.setAttribute(
          "href",
          `../../components/table-subject/table-subject.css`
        );
        this.shadowRoot.appendChild(styleLink);
      }
    }
    export default EnrolledClasses;
