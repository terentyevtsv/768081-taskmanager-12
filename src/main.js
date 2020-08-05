import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const AddedComponentPosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

// Отрисовка Меню
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(
    siteHeaderElement,
    createSiteMenuTemplate(),
    AddedComponentPosition.BEFORE_END
);

// Отрисовка фильтров
render(
    siteMainElement,
    createFilterTemplate(filters),
    AddedComponentPosition.BEFORE_END
);

// Отрисовка раздела обзора дел
render(
    siteMainElement,
    createBoardTemplate(),
    AddedComponentPosition.BEFORE_END
);

// Отрисовка формы редактирования дела и трех дел в общем формате
const boardElement = siteMainElement.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

render(
    boardTasksElement,
    createTaskEditTemplate(tasks[0]),
    AddedComponentPosition.BEFORE_END
);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); ++i) {
  render(
      boardTasksElement,
      createTaskTemplate(tasks[i]),
      AddedComponentPosition.BEFORE_END
  );
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  // Отрисовка кнопки загрузить больше
  render(
      boardElement,
      createLoadMoreButtonTemplate(),
      AddedComponentPosition.BEFORE_END
  );

  const loadMoreElement = boardElement.querySelector(`.load-more`);

  loadMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) =>
        render(boardTasksElement, createTaskTemplate(task), AddedComponentPosition.BEFORE_END));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreElement.remove();
    }
  });
}
