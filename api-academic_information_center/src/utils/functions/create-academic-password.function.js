import { latiniseString } from "./latinise-string.function.js";

export function createAcademicPassword({ name, fatherLastName, academicId }) {
  const id = removeFirstDigits(academicId, 5);
  let firstName = hasSpaces(name) ? name.split(" ")[0] : name;
  firstName = latiniseString(firstName).toLowerCase();
  let LastName = hasSpaces(fatherLastName)
  ? fatherLastName.split(" ")[0]
  : fatherLastName;
  LastName = latiniseString(LastName);
  let password = "";

  for (var i = 0, n = firstName.length; i < 2; ++i) {
    password += firstName.charAt(Math.floor(Math.random() * n));
  }
  for (var i = 0, n = LastName.length; i < 2; ++i) {
    password += LastName.charAt(Math.floor(Math.random() * n));
  }
  for (var i = 0, n = id.length; i < 4; ++i) {
    password += id.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const hasSpaces = (str) => {
  return /\s/.test(str);
};

const removeFirstDigits = (str, count) => {
  if (str.length >= count) {
    return str;
  }
  return str.slice(count);
};
