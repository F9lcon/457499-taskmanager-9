import {getMenuContainer} from './components/menu';
import {getSearchContainer} from './components/search';
import {getFilterContainer} from "./components/filter";
import {getBoardContainer} from "./components/board";
import {getAddTaskForm} from "./components/task-edit";
import {getTaskCard} from "./components/task";
import {getLoadMoreButton} from "./components/load-more-button";
import {taskList, getFilterList} from "./data";

const TASK_AMOUNT = 7;
const MAX_TASK_COULD_LOAD = 8;

const mainElement = document.querySelector(`main`);
const mainControlElement = document
  .querySelector(`.main__control.control.container`);

const renderComponent = (element, component) => {
  element.insertAdjacentHTML(`beforeend`, component);
};

const renderBoardContent = () => {
  const taskBoardElement = document.querySelector(`.board__tasks`);

  renderComponent(taskBoardElement, getAddTaskForm());
  for (let i = 0; i < TASK_AMOUNT; i++) {
    renderComponent(taskBoardElement, getTaskCard(taskList[i]));
  }
};

const renderCards = (tasks) => {
  tasks.forEach((task) => {
    renderComponent(document.querySelector(`.board__tasks`), getTaskCard(task));
  });
};

const onLoadMoreClick = () => {
  const taskBoardElement = document.querySelector(`.board__tasks`);

  if (taskBoardElement.childElementCount < taskList.length) {
    renderCards(taskList.slice(taskBoardElement.childElementCount,
        taskBoardElement.childElementCount + MAX_TASK_COULD_LOAD));
    if (taskBoardElement.childElementCount >= taskList.length) {
      document.querySelector(`.board.container`)
        .removeChild(document.querySelector(`.load-more`));
    }
  } else {
    document.querySelector(`.board.container`)
      .removeChild(document.querySelector(`.load-more`));
  }
};

renderComponent(mainControlElement, getMenuContainer());
renderComponent(mainElement, getSearchContainer());
renderComponent(mainElement, getFilterContainer(getFilterList(taskList)));
renderComponent(mainElement, getBoardContainer());
renderBoardContent();
renderComponent(document
  .querySelector(`.board.container`), getLoadMoreButton());

document.querySelector(`.load-more`)
  .addEventListener(`click`, onLoadMoreClick);
