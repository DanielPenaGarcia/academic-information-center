export function formatValuesInsert(values) {
  return values
    .map((value) => {
      if (Array.isArray(value)) {
        return `(${formatValuesInsert(value)})`;
      }
      if (typeof value === "string") {
        return `'${value}'`;
      }
      if (typeof value === "number") {
        return value;
      }
      return value;
    })
    .join(", ");
}
