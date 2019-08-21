const TASK_AMOUNT = 10;

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

const taskList = new Array(TASK_AMOUNT).fill(``).map(getTask);

const getFilterList = (data) => ([
  {
    title: `all`,
    count: data.length
  },
  {
    title: `overdue`,
    count: data.filter((task) => Date.now() - task.dueDate > 0).length
  },
  {
    title: `today`,
    count: data.filter((task) => new Date(Date.now())
       .getDate() === new Date(task.dueDate).getDate()).length
  },
  {
    title: `favorites`,
    count: data.filter((task) => task.isFavorite).length
  },
  {
    title: `repeating`,
    count: data.filter((task) => Object.keys(task.repeatingDays)
      .some((day) => task.repeatingDays[day])).length
  },
  {
    title: `tags`,
    count: data.filter((task) => task.tags.size).length
  },
  {
    title: `archive`,
    count: data.filter((task) => task.isArchive).length
  }
]);


export {taskList, getFilterList};

