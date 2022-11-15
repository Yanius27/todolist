let tasks = [];

const startUp = () => {
  document.getElementById('add').addEventListener('click', saveTaskAndDateToObject, /* clearInput */);
  document.getElementById('taskList').addEventListener('click', (event) => {
    let id = event.target.getAttribute('delete-task-id');
    if(id) {
      tasks = tasks.filter((task) => {
      return task.id != id;
      });
      console.log(tasks);
      renderTaskList();
    }
    let checkBoxId = event.target.getAttribute('checkbox-id');
    if(checkBoxId) {
      tasks = tasks.map((task) => {
        if(task.id == checkBoxId) {
          task.checkBoxStatus = event.target.checked;
          return task;
        }
        else return task;
      });
      console.log(tasks);
      renderTaskList();
    }
  });
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
  field.checkBoxStatus = false;
  addToMassiv(field);
}

// const clearInput = () => {
//   document.getElementById('input').value = "";
// }

startUp();