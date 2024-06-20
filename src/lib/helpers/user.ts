export const getAcronym = (name: string) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return initials;
};

export const getFirstName = (name: string) => {
  const firstName = name.split(" ")[0];
  return firstName;
};
