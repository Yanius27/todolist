let state = {
  tasks: [],
};


const saveLocalStorage = () => {
  const stringTask = JSON.stringify(state);
  localStorage.setItem('data', stringTask);
}

const taskActual = (val) => {
  return `<div class="task-block">
    <div class="task">${val.task}</div>
    <div class="task-content">
      <div class="date">${val.date}</div>
      <button type="reset" class="button-reset" delete-task-id=${val.id}>
        <span class="hidden">Кнопка для удаления задачи</span>
      </button>
      <label>
        <input type="checkbox" class="checkbox" checkbox-id=${val.id} ${val.checkBoxStatus ? 'checked' : ''}>
        <span class="fake-checkbox"></span>
      </label>
    </div>
  </div>`;
}

const renderTaskList = () => {
  document.getElementById('taskList').innerHTML = state.tasks.map(taskActual).join('');
}

const sortTasks = (a, b) => {
  const aNumber = a.checkBoxStatus ? 1 : 0;
  const bNumber = b.checkBoxStatus ? 1 : 0;

  return aNumber - bNumber;
}

const deleteOrCheck = (event) => {
  let id = event.target.getAttribute('delete-task-id');
  if(id) {
    state.tasks = state.tasks.filter((task) => {
    return task.id != id;
    });
    console.log(state.tasks);
    saveLocalStorage();
    renderTaskList();
  };
  let checkBoxId = event.target.getAttribute('checkbox-id');
  if(checkBoxId) {
    state.tasks = state.tasks.map((task) => {
      if(task.id == checkBoxId) {
        task.checkBoxStatus = event.target.checked;
        return task;
      }
      else return task;
    });
    state.tasks = state.tasks.sort(sortTasks);
    saveLocalStorage();
    console.log(state.tasks);
    renderTaskList();
  };
}

const createId = () => {
  return `${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}`;
}

const addToArray = (f) => {
  state.tasks.push(f);
  saveLocalStorage();
  renderTaskList();
}

const clearInput = () => {
  document.getElementById('input').value = "";
}

const saveTaskAndDateToObject = () => {
  const field = {};
  field.task = document.getElementById('input').value;
  field.date = new Date().toLocaleDateString();
  field.id = createId();
  field.checkBoxStatus = false;
  addToArray(field);
  clearInput();
}

const initState = () => {
  state = JSON.parse(localStorage.getItem('data'));
  renderTaskList();
}

const startUp = () => {
  initState();

  document.getElementById('add').addEventListener('click', saveTaskAndDateToObject);
  document.getElementById('taskList').addEventListener('click', deleteOrCheck);
}

startUp();