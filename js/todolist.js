let tasks = [];

const startUp = () => {
  document.getElementById('add').addEventListener('click', saveTaskAndDateToObject);
  document.getElementById('taskList').addEventListener('click', (event) => {
    let id = event.target.getAttribute('data-task-id');
    tasks = tasks.filter((task) => {
      return task.id != id;
    });
    renderTaskList();
  });
}

const taskActual = (val) => {
  return `<div class="task-block">
    <div class="task">${val.task}</div>
    <div class="task-content">
      <div class="date">${val.date}</div>
      <button type="reset" class="button-reset" data-task-id=${val.id}>
        <span class="hidden">Кнопка для удаления задачи</span>
      </button>
    </div>
  </div>`;
}

const renderTaskList = () => {
  document.getElementById('taskList').innerHTML = tasks.map(taskActual).join('');
}

const addToMassiv = (f) => {
  tasks.push(f);
  renderTaskList();
}

const createId = () => Math.random();

const saveTaskAndDateToObject = () => {
  const field = {};
  field.task = document.getElementById('input').value;
  field.date = new Date().toLocaleDateString();
  field.id = createId();
  addToMassiv(field);
}

startUp();