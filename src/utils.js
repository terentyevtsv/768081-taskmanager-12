export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getDate() > dueDate.getDate();
};

export const isRepeating = (repeating) => Object.values(repeating).some(Boolean);
export const humanizeTaskDueDate = (dueDate) =>
  dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
