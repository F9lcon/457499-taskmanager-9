import {getMenuContainer} from './components/menu';
import {getSearchContainer} from './components/search';
import {getFilterContainer} from "./components/filter";
import {getBoardContainer} from "./components/board";
import {getAddTaskForm} from "./components/task-edit";
import {getTaskCard} from "./components/task";
import {getLoadMoreButton} from "./components/load-more-button";

const mainElement = document.querySelector(`main`);
const mainControlElement = document
  .querySelector(`.main__control.control.container`);

const renderComponent = (element, component) => {
  element.insertAdjacentHTML(`beforeend`, component);
};

const renderBoardContent = () => {
  const taskBoardElement = document.querySelector(`.board__tasks`);

  renderComponent(taskBoardElement, getAddTaskForm());
  for (let i = 0; i < 3; i++) {
    renderComponent(taskBoardElement, getTaskCard());
  }
};

const renderAllElements = () => {
  renderComponent(mainControlElement, getMenuContainer());
  renderComponent(mainElement, getSearchContainer());
  renderComponent(mainElement, getFilterContainer());
  renderComponent(mainElement, getBoardContainer());
  renderBoardContent();
  renderComponent(document
    .querySelector(`.board.container`), getLoadMoreButton());
};

renderAllElements();
