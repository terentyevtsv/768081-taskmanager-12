import {COLORS} from "../const.js";
import {getRandomInteger} from "../utils.js";

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger());
  if (!isDate) {
    return null;
  }

  // Дата в диапазоне +/- 7 дней от текущей даты
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  // Случайная дата из выбранного интервала
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);

  // Максимальное значение времени у даты
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger()),
    th: false,
    fr: Boolean(getRandomInteger()),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInteger()),
    isArchive: Boolean(getRandomInteger())
  };
};
