document.addEventListener("DOMContentLoaded", function () {
    const enrolledClassesList = document.getElementById('enrolled-classes-list');

    // Store selected classes here
    let enrolledClasses = [];

    // Listen for messages from the parent window
    window.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_ENROLLED_CLASSES') {
            updateEnrolledClasses(event.data.classes);
        } 
        //if (!enrolledClasses.includes(selectedClass)) {
         //       enrolledClasses.push(selectedClass);
          //      // Send updated classes to the enrolled iframe
           //     enrolledFrame.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
            //}
        }
    );

    // Update the enrolled classes displayed on the page
    function updateEnrolledClasses(classes) {
        enrolledClassesList.innerHTML = '';  // Clear the list before adding new data

        // If no classes, show a message
        if (classes.length === 0) {
            return;
        }

        // Iterate over each class and display it
        classes.forEach(classInfo => {
            const classItem = document.createElement('li');
            classItem.classList.add('class-item');

            const classDetails = document.createElement('div');
            classDetails.classList.add('class-info');
            classDetails.innerHTML = `
                <strong>${classInfo.name}</strong><br>
                Professor: ${classInfo.professor}<br>
                Start: ${classInfo.startTime}<br>
                Finish: ${classInfo.finishTime}<br>
                Days: ${classInfo.days}
            `;

            const selectButton = document.createElement('button');
            selectButton.classList.add('remove-button');
            selectButton.textContent = 'Remove';
            selectButton.onclick = () => removeClass(classInfo);

            classItem.appendChild(classDetails);
            classItem.appendChild(selectButton);
            enrolledClassesList.appendChild(classItem);  // Append to the correct list
        });
    }

    // Remove a class from the enrolled list
    function removeClass(classInfo) {
        console.log('Removing class:', classInfo.name);  // Verify which class is being removed
        console.log("Before"+enrolledClasses);

        // Filter out the class from the enrolled list based on object comparison
        enrolledClasses = enrolledClasses.filter(classItem => classItem !== classInfo);
        
        console.log("After"+enrolledClasses);

        // Send updated list back to parent
        window.parent.postMessage({ type: 'REMOVE_ENROLLED_CLASSES', class: classInfo }, '*');
    }

    // Handle enrollment button click
    document.getElementById('enroll-button').onclick = () => {
        if (enrolledClasses.length > 0) {
            alert(`You have enrolled in: ${enrolledClasses.map(classItem => classItem.name).join(', ')}`);
            enrolledClasses = [];  // Clear the list after enrollment
            window.parent.postMessage({ type: 'UPDATE_ENROLLED_CLASSES', classes: enrolledClasses }, '*');
        } else {
            alert('No classes selected!');
        }
    };
});

