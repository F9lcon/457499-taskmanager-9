const getTask = () => ({
  description: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    Mo: false,
    Tu: false,
    We: false,
    Th: Boolean(Math.round(Math.random())),
    Fr: false,
    Sa: false,
    Su: false
  },
  tags: new Set([`homework`, `theory`, `practice`]),
  color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

const getTaskList = () => {
  const taskList = [];
  for (let i = 0; i < 20; i++) {
    taskList.push(getTask());
  }
  return taskList;
};

const taskList = getTaskList();

const filterData = {
  titles: [`all`,
    `overdue`,
    `today`,
    `favorites`,
    `repeating`,
    `tags`,
    `archive`],
  counters: {
    all: taskList.length,
    overdue: taskList.filter((task) => Date
      .now() - task.dueDate > 0).length,
    today: taskList.filter((task) => new Date(Date.now())
      .getDate() === new Date(task.dueDate).getDate()).length,
    favorites: taskList.filter((task) => task.isFavorite).length,
    repeating: taskList.filter((task) => Object.keys(task.repeatingDays)
      .some((day) => task.repeatingDays[day])).length,
    tags: taskList.filter((task) => task.tags.size > 0).length,
    archive: taskList.filter((task) => task.isArchive).length,
  }};

export const getFilterList = () => {
  const filterList = [];
  for (let i = 0; i < 7; i++) {
    filterList.push(
        {
          title: filterData.titles[i],
          count: filterData.counters[filterData.titles[i]],
        }
    );
  }
  return filterList;
};

export {taskList};

