import {isExpired, isRepeating, humanizeTaskDueDate} from "../utils.js";
import {COLORS} from "../const.js";

const createTaskEditDateTemplate = (dueDate) =>
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
  </button>

  ${dueDate !== null ? `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value="${humanizeTaskDueDate(dueDate)}"
      />
    </label>
  </fieldset>` : ``}`;

const createTaskEditRepeatingTemplate = (repeating) =>
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isRepeating(repeating) ? `yes` : `no`}</span>
  </button>

  ${isRepeating(repeating) ? `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.entries(repeating).map(([day, repeat]) => `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}"
        name="repeat"
        value="${day}"
        ${repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}">
        ${day}
      </label>`).join(``)}
    </div>
  </fieldset>` : ``}`;

const createTaskEditColorsTemplate = (currentColor) => {
  return COLORS.map((color) => `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${currentColor === color ? `checked` : ``}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
  >
    ${color}
  </label>`).join(``);
};

export const createTaskEditTemplate = (task = {}) => {
  const {
    color = `black`,
    description = ``,
    dueDate = null,
    repeating = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    }
  } = task;

  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = Object.values(repeating).some(Boolean)
    ? `card--repeat`
    : ``;

  return (
    `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${createTaskEditDateTemplate(dueDate)}
                ${createTaskEditRepeatingTemplate(repeating)}

              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${createTaskEditColorsTemplate(color)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

