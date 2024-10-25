export function formatValuesUpdate(values) {
  return values
    .map((element) => {
      if (!(element instanceof Object)) {
        throw new Error("Values must be an array of arrays");
      }
      element.value = typeof element.value === "string" ? `'${element.value}'` : element.value;
      return `${element.column} = ${element.value}`;
    })
    .join(", ");
}