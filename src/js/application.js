export const onApp = () => {
  let state = {
    tasks: [],
  };
  //create an object
  
  const saveLocalStorage = () => {
    const stringTask = JSON.stringify(state);
    localStorage.setItem('data', stringTask);
  }
  //convert object to string and add data to storage
  
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
  //adding valid layout
  
  const renderTaskList = () => {
    document.getElementById('taskList').innerHTML = state.tasks.map(taskActual).join('');
  }
  //rendering of actual tasks
  
  const sortTasks = (a, b) => {
    const aNumber = a.checkBoxStatus ? 1 : 0;
    const bNumber = b.checkBoxStatus ? 1 : 0;
  
    return aNumber - bNumber;
  }
  //task sorting
  
  const deleteOrCheck = (event) => {
    let id = event.target.getAttribute('delete-task-id');
    if(id) {
      state.tasks = state.tasks.filter((task) => {
      return task.id != id;
      });
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
      renderTaskList();
    };
  }
  //operation of the delete button and checkbox
  
  const createId = () => {
    return `${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}`;
  }
  //creating a unique id
  
  const addToArray = (f) => {
    state.tasks.push(f);
    saveLocalStorage();
    renderTaskList();
  }
  //adding an object to an array, add data to storage and render
  
  const clearInput = () => {
    document.getElementById('input').value = "";
  }
  //clearing the input field
  
  const saveTaskAndDateToObject = () => {
    const field = {};
    field.task = document.getElementById('input').value;
    field.date = new Date().toLocaleDateString();
    field.id = createId();
    field.checkBoxStatus = false;
    addToArray(field);
    clearInput();
  }
  //creating an object and his fields, adding to the array, clearing the input field
  
  const initState = () => {
    const localState = JSON.parse(localStorage.getItem('data'));
  
    if(localState) {
      state = localState;
    }
  
    renderTaskList();
  }
  //initialization of stored data, converting to an object and rendering
  
  const startUp = () => {
    initState();
  
    document.getElementById('add').addEventListener('click', saveTaskAndDateToObject);
    document.getElementById('taskList').addEventListener('click', deleteOrCheck);
  }
  //main function declaration
  
  startUp();
  //main function call  
};