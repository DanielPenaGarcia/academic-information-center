import api from "../../../../shared/services/api.service.js";

class EnrolledClasses extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.studentId = JSON.parse(localStorage.getItem('user'))?.id;
        this.page = parseInt(this.getAttribute("page")) || 1;
        this.size = parseInt(this.getAttribute("size")) || 10;
        this.classes = [];

        // Check if studentId is available
        if (!this.studentId) {
            console.error("Student ID is not available. Check localStorage data.");
            return;
        }

        this.getEnrolledClasses();
    }

    async getEnrolledClasses() {
        const body = {
            studentId: this.studentId
        };

        try {
            const response = await api.post({
                endpoint: `classes/enrolledClasses`,
                body
            });

            // Log response for debugging
            console.log("API Response:", response);

            if (response.status === 200 && Array.isArray(response.data)) {
                this.classes = response.data.map(enrollment => {
                    const klass = enrollment.klass;
                    return {
                        subjectName: klass?.subject?.name || "No Subject Info",
                        teacherName: klass?.teacher?.names || "No Teacher Info",
                        startTime: klass?.startTime,
                        duration: klass?.duration,
                        days: klass?.days,
                        id: klass?.id,
                        finishTime: this.calculateEndTime(klass?.startTime, klass?.duration)
                    };
                });
                this.render();
            } else {
                console.warn("Invalid API response format or status code.");
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    }

    calculateEndTime(startTime, duration) {
        if (!startTime || duration == null) return "Invalid Time";
        const [hours, minutes] = startTime.split(':').map(Number);
        const endHour = hours + duration;
        return this.formatTime(`${endHour}:${minutes}`);
    }

    formatTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = ((hours + 11) % 12 + 1);
        return `${formattedHour}:${String(minutes).padStart(2, '0')} ${period}`;
    }

    render() {
      if (!this.shadowRoot) {
          console.error("Shadow DOM is not available.");
          return;
      }
  
      this.shadowRoot.innerHTML = `
          <ul id="class-list">
              ${this.classes.map(klass => `
                  <li class="class-item">
                      <div class="class-info">
                          <strong>${klass.subjectName}</strong><br>
                          Profesor: ${klass.teacherName}<br>
                          Hora inicio: ${klass.startTime || "N/A"}<br>
                          Hora finalización: ${klass.finishTime || "N/A"}<br>
                          Días: ${klass.days || "N/A"}
                      </div>
                      <button class="remove-button">Dar de baja</button>
                  </li>
              `).join('')}
          </ul>
          <link rel="stylesheet" href="../../components/enrolled-classes/enrolled-classes.css">
      `;
  
      // Add event listeners for remove buttons
      this.shadowRoot.querySelectorAll('.remove-button').forEach((button, index) => {
          button.addEventListener('click', () => this.removeClass(this.classes[index].id));
      });
  
      // Log for debugging if rendering worked
      console.log("Rendering completed.");
  }
  
  async removeClass(classId) {
    const body ={
      studentId:JSON.parse(localStorage.getItem('user')).id,
      classId: classId
  }
  const response = await api.patch({
      endpoint: `classes/dropClass`,
      body
    });
    return response;
    }
 
}

customElements.define('enrolled-classes', EnrolledClasses);
export default EnrolledClasses;
