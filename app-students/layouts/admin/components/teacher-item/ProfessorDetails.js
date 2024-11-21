class ProfessorDetails extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
     
      this.render();
    }
  
    connectedCallback() {
      // Escuchar el evento personalizado para obtener el ID académico
      this.addEventListener("search-professor", (e) => {
        const academicId = e.detail.academicId;
        this.fetchProfessorDetails(academicId);
      });
    }
  
    // Método para obtener detalles del profesor
    async fetchProfessorDetails(academicId) {
      try {
        
        const response = await api.get({ endpoint: "teachers", body });
        const teacher = await response.json();
  
        if (response.ok) {
          this.updateDetails(teacher);
        } else {
          console.error("Error al obtener los datos del profesor.");
          this.clearDetails();
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        this.clearDetails();
      }
    }
  
    
    updateDetails(teacher) {
      this.shadowRoot.querySelector(".professor-name").textContent = teacher.name || "No disponible";
      this.shadowRoot.querySelector(".professor-id").textContent = teacher.academicId || "No disponible";
      this.shadowRoot.querySelector(".professor-email").textContent = teacher.email || "No disponible";
    }
  
    
    clearDetails() {
      this.shadowRoot.querySelector(".professor-name").textContent = "No disponible";
      this.shadowRoot.querySelector(".professor-id").textContent = "No disponible";
      this.shadowRoot.querySelector(".professor-email").textContent = "No disponible";
    }
  
    // Renderizar la estructura HTML
    render() {
      this.shadowRoot.innerHTML = `
        <div class="professor-details">
          <div class="professor-photo">
            <img src="default-profile.png" alt="Foto del profesor" />
          </div>
          <div class="professor-info">
            <p><strong>Nombre:</strong> <span class="professor-name">No disponible</span></p>
            <p><strong>ID académico:</strong> <span class="professor-id">No disponible</span></p>
            <p><strong>Correo:</strong> <span class="professor-email">No disponible</span></p>
          </div>
        </div>
        <style>
          .professor-details {
            display: flex;
            gap: 15px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
          }
          .professor-photo img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
          .professor-info p {
            margin: 5px 0;
          }
        </style>
      `;
    }
  }
  
  customElements.define("professor-details", ProfessorDetails);
  