import api from "../../../../shared/services/api.service.js";

document.addEventListener("DOMContentLoaded", function () {
  const availableFrame = document.getElementById('available-frame').contentWindow;
  const enrolledFrame = document.getElementById('enrolled-frame').contentWindow;

  // Store selected classes here
  let enrolledClasses = [];

  // Listen for messages from microfrontends
  window.addEventListener('message', (event) => {
      if (event.data.type === 'SELECT_CLASS') {

        if (enrolledClasses.length===0){
          enrolledClasses.push(event.data.classObject);
          enrolledFrame.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
        }

        enrolledClasses.forEach(enrolledClass => {
          if (enrolledClass.id!=event.data.classObject.id){
            enrolledClasses.push(event.data.classObject);
              enrolledFrame.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
          }
        })
          
      } else if (event.data.type === 'REMOVE_ENROLLED_CLASSES') {
        console.log(enrolledClasses)
        console.log(event.data)

        enrolledClasses = enrolledClasses.filter(classItem => classItem.id !== event.data.class.id);
        console.log(enrolledClasses)
          // Send updated classes to the enrolled iframe
          enrolledFrame.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
      }
  });

  // Handle enrollment button click
  document.getElementById('enroll-button').onclick = async() => {

    if (enrolledClasses.length > 0) {

      const student = localStorage.getItem('user');
      const studentObject = JSON.parse(student);
  
      console.log(studentObject)

      enrolledClasses.forEach(async enrolledClass => {
  
        const body={
          "studentId":studentObject.id, 
          "classId": enrolledClass.id
        }
    
        console.log(body)

        try{
          const response = await api.post({
            endpoint: `classes/enroll`,
            body
          })
        }catch(error){
          console.log(error)
          }
  
      })

      alert(`You have enrolled in: ${enrolledClasses.join(', ')}`);
      enrolledClasses = []; // Clear the list after enrollment
      enrolledFrame.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
  } else {
    alert('No classes selected!');

  }
   
  };
});
