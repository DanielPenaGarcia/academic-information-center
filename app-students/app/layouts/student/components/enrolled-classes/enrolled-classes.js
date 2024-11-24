import api from "../../../../shared/services/api.service.js";

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
    
        this.shadowRoot.innerHTML = "";
    
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
          `../../components/table-subject/table-subject.css`
        );
        this.shadowRoot.appendChild(styleLink);
      }
    }
    export default EnrolledClasses;
