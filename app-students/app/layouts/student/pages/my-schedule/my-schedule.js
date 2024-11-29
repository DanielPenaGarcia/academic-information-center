import Header from "../../components/header/header.js";
import ScheduleClassItem from "../../components/schedule-class-item/schedule-class-item.js";
import api from "../../../../shared/services/api.service.js";
import localStorageService from "../../../../shared/services/local-storage.service.js";

document.addEventListener("DOMContentLoaded", function () {
  window.customElements.define("student-header", Header);
  window.customElements.define("schedule-class-item", ScheduleClassItem);
  findSchedule();
});

async function findSchedule() {
  const user = localStorageService.getItem("user");
  const response = await api.get({ endpoint: `student/schedule/${user.academicId}` });
  const schedules = response.data;
  const monday = schedules.filter((schedule) => schedule.klass.days.includes("L"));
  const tuesday = schedules.filter((schedule) => schedule.klass.days.includes("M"));
  const wednesday = schedules.filter((schedule) => schedule.klass.days.includes("X"));
  const thursday = schedules.filter((schedule) => schedule.klass.days.includes("J"));
  const friday = schedules.filter((schedule) => schedule.klass.days.includes("V"));
  const saturday = schedules.filter((schedule) => schedule.klass.days.includes("S"));
  const sunday = schedules.filter((schedule) => schedule.klass.days.includes("D"));
  loadDayClasses(monday, "L");
  loadDayClasses(tuesday, "M");
  loadDayClasses(wednesday, "X");
  loadDayClasses(thursday, "J");
  loadDayClasses(friday, "V");
  loadDayClasses(saturday, "S");
  loadDayClasses(sunday, "D");
}

function loadDayClasses(schedules, day) {
  const classesLList = document.getElementById(`classes-${day}`);
  schedules.forEach((schedule) => {
    const scheduleL = document.createElement("schedule-class-item");
    scheduleL.setAttribute("schedule", JSON.stringify(schedule));
    classesLList.append(scheduleL);
  });
}
