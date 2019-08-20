import {getMenuContainer} from './components/menu';
import {getSearchContainer} from './components/search';
import {getFilterContainer} from "./components/filter";
import {getBoardContainer} from "./components/board";
import {getAddTaskForm} from "./components/task-edit";
import {getTaskCard} from "./components/task";
import {getLoadMoreButton} from "./components/load-more-button";
import {taskList} from "./data";
import {getFilterList} from "./data";

let taskAmount = 7;
let loadMoreButton;

const mainElement = document.querySelector(`main`);
const mainControlElement = document
  .querySelector(`.main__control.control.container`);

const renderComponent = (element, component) => {
  element.insertAdjacentHTML(`beforeend`, component);
};

const renderBoardContent = () => {
  const taskBoardElement = document.querySelector(`.board__tasks`);

  renderComponent(taskBoardElement, getAddTaskForm());
  for (let i = 0; i < taskAmount; i++) {
    renderComponent(taskBoardElement, getTaskCard(taskList[i]));
  }
};

const renderFilters = () => {
  renderComponent(mainElement, getFilterContainer(getFilterList()));

};

const getListEnd = () => {
  let listEnd;
  if (taskAmount + 8 >= taskList.length) {
    listEnd = taskList.length;
  } else {
    listEnd = taskAmount + 8;
  }
  return listEnd;
};


const renderMoreTasks = () => {
  const taskBoardElement = document.querySelector(`.board__tasks`);

  let listStart = taskAmount;
  let listEnd = getListEnd();
  for (let i = listStart; i < listEnd; i++) {
    renderComponent(taskBoardElement, getTaskCard(taskList[i]));
  }
  taskAmount += 8;
  if (taskAmount >= taskList.length) {
    document
      .querySelector(`.board.container`).removeChild(loadMoreButton);
  }
};

const renderAllElements = () => {
  renderComponent(mainControlElement, getMenuContainer());
  renderComponent(mainElement, getSearchContainer());
  renderFilters();
  renderComponent(mainElement, getBoardContainer());
  renderBoardContent();
  renderComponent(document
    .querySelector(`.board.container`), getLoadMoreButton());

  loadMoreButton = document.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, renderMoreTasks);
};

renderAllElements();
