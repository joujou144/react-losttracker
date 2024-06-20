export function formatDateObj(date: string) {
  const dateObj = new Date(date);
  const datePart = dateObj.toDateString();
  return datePart;
}
