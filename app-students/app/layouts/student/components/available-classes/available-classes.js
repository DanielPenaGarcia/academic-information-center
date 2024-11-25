import api from "../../../../shared/services/api.service.js";

let subjects = []; // Moved subjects to a global scope

const getSubjects = async () => {
  const student = localStorage.getItem('user');
  const studentObject = JSON.parse(student);

  if (!studentObject || !studentObject.id) {
    console.error('Student object or ID not found in local storage');
    return;
  }

  const body = {
    studentId: studentObject.id
  };

  try {
    const response = await api.post({
      endpoint: `classes/availableClasses`,
      body
    });

    console.log(response.status === 200 && Array.isArray(response.data));

    // Check if the response is successful and contains the expected data
    if (response.status === 200 && Array.isArray(response.data)) {
      const subjectMap = {};

      response.data.forEach((klass) => {
        const subjectName = klass.subject?.name; 
        const teacherName = klass.teacher?.names; 
        const startTime = klass.startTime;        
        const duration = klass.duration;          
        const days = klass.days;  
        const id = klass.id;                

        // Check if the necessary fields are available
        if (subjectName && teacherName && startTime && duration && days) {
          if (!subjectMap[subjectName]) {
            subjectMap[subjectName] = [];
          }

          const finishTime = calculateEndTime(startTime, duration);

          subjectMap[subjectName].push({
            name: subjectName,
            professor: teacherName,
            startTime: startTime,
            finishTime: finishTime,
            days: days,
            id: id,
          });
        } else {
          console.warn(`Missing data for Klass ID: ${klass.id}`);
        }
      });

      // Map the subjects to the desired structure
      const mappedSubjects = Object.keys(subjectMap).map(subjectName => ({
        name: subjectName,
        classes: subjectMap[subjectName]
      }));

      console.log("Mapped Subjects:", mappedSubjects);
      subjects = mappedSubjects;
      renderAvailableClasses();
    } else {
      console.warn("API response did not contain expected subjects data");
    }

  } catch (error) {
    console.error('Hubo un problema al obtener las materias:', error);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  getSubjects();
});

// Calculate end time for a class
function calculateEndTime(startTime, duration) {
  const [hours, minutes, seconds] = startTime.split(':').map(Number);
  const endHour = hours + duration;
  return formatTime(`${endHour}:${minutes}:${seconds}`);
}

// Format time to a 12-hour format
function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = ((hours + 11) % 12 + 1);
  return `${formattedHour}:${String(minutes).padStart(2, '0')} ${period}`;
}

// Render available classes
function renderAvailableClasses() {
  const availableClassesList = document.getElementById('available-classes-list');
  availableClassesList.innerHTML = ''; 
  subjects.forEach(subject => {
    const subjectCard = document.createElement('li');
    subjectCard.classList.add('subject-card');
    const subjectTitle = document.createElement('h3');
    subjectTitle.textContent = subject.name;
    subjectCard.appendChild(subjectTitle);

    const classList = document.createElement('ul');
    classList.classList.add('class-list');

    subject.classes.forEach(classInfo => {
      const classItem = document.createElement('li');
      classItem.classList.add('class-item');

      const classDetails = document.createElement('div');
      classDetails.classList.add('class-info');
      classDetails.innerHTML = `
        <strong>${classInfo.name}</strong><br>
        Profesor: ${classInfo.professor}<br>
        Hora inicio: ${classInfo.startTime}<br>
        Hora finalización: ${classInfo.finishTime}<br>
        Días: ${classInfo.days}
      `;

      const selectButton = document.createElement('button');
      selectButton.classList.add('select-button');
      selectButton.textContent = 'Escoger';
      selectButton.onclick = () => selectClass(classInfo);

      classItem.appendChild(classDetails);
      classItem.appendChild(selectButton);
      classList.appendChild(classItem);
    });

    subjectCard.appendChild(classList);
    availableClassesList.appendChild(subjectCard);
  });
}

// Function to handle class selection
function selectClass(classObject) {
  subjects.forEach((subject) => {
    // Find the index of the class to be removed in the subject's classes array
    const classIndex = subject.classes.findIndex(classItem => classItem.id === classObject.id);

    // If the class is found, remove it
    if (classIndex !== -1) {
      subject.classes.splice(classIndex, 1);
    }
  });

  // Remove subjects that have no classes left
  subjects = subjects.filter(subject => subject.classes.length > 0);

  console.log(subjects);
  window.parent.postMessage({ type: 'SELECT_CLASS', classObject }, '*');
  renderAvailableClasses();
}

// Listen for reload messages from the parent window
window.addEventListener('message', (event) => {
  if (event.data.type === 'RELOAD') {
    getSubjects();
  }
});
