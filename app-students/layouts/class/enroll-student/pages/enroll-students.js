import api from "../../../../shared/services/api.service.js";

document.addEventListener("DOMContentLoaded", function () {
  const availableFrame = document.getElementById('available-frame');
  const enrolledFrame = document.getElementById('enrolled-frame');

  let enrolledClasses = [];

  window.addEventListener('message', (event) => {
      if (event.data.type === 'SELECT_CLASS') {

        if (enrolledClasses.length===0){
          enrolledClasses.push(event.data.classObject);
          enrolledFrame.contentWindow.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
        }

        enrolledClasses.forEach(enrolledClass => {
          if (enrolledClass.id!=event.data.classObject.id){
            enrolledClasses.push(event.data.classObject);
              enrolledFrame.contentWindow.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
          }
        })
          
      } else if (event.data.type === 'REMOVE_ENROLLED_CLASSES') {
        console.log(enrolledClasses)
        console.log(event.data)

        enrolledClasses = enrolledClasses.filter(classItem => classItem.id !== event.data.class.id);
        console.log(enrolledClasses)

        enrolledFrame.contentWindow.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
      }
  });

  function showToast(message, type) {
    const toast = document.getElementById("responseMessage");
    toast.textContent = message;
    toast.className = `toast ${type}`;
  
    toast.style.visibility = "visible";
  
    setTimeout(function () {
      toast.style.visibility = "hidden";
    }, 3000);
  }
  

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

          showToast(
            `Se ha inscrito en la clase ${enrolledClass.name}`,
            "success"
          );

        }catch(error){
          console.log(error)
          }
      })
      enrolledClasses = []; 
      enrolledFrame.contentWindow.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
  } else {
    alert('No classes selected!');
  }
  };
});
