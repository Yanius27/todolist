class OnApp {
  state = {
    tasks: [],
  };
  //create an object
  
  saveLocalStorage = () => {
    stringTask = JSON.stringify(this.state);
    localStorage.setItem('data', stringTask);
  }
  //convert object to string and add data to storage
  
  taskActual = (val) => {
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
  
  renderTaskList = () => {
    document.getElementById('taskList').innerHTML = this.state.tasks.map(this.taskActual).join('');
  }
  //rendering of actual tasks
  
  sortTasks = (a, b) => {
    const aNumber = a.checkBoxStatus ? 1 : 0;
    const bNumber = b.checkBoxStatus ? 1 : 0;
  
    return aNumber - bNumber;
  }
  //task sorting
  
  deleteOrCheck = (event) => {
    let id = event.target.getAttribute('delete-task-id');
    if(id) {
      this.state.tasks = this.state.tasks.filter((task) => {
      return task.id != id;
      });
      this.saveLocalStorage();
      this.renderTaskList();
    };
    checkBoxId = event.target.getAttribute('checkbox-id');
    if(this.checkBoxId) {
      this.state.tasks = this.state.tasks.map((task) => {
        if(task.id == this.checkBoxId) {
          task.checkBoxStatus = event.target.checked;
          return task;
        }
        else return task;
      });
      this.state.tasks = this.state.tasks.sort(this.sortTasks);
      this.saveLocalStorage();
      this.renderTaskList();
    };
  }
  //operation of the delete button and checkbox
  
  createId = () => {
    return `${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}-${Math.round(Math.random() * 10000)}`;
  }
  //creating a unique id
  
  addToArray = (f) => {
    this.state.tasks.push(f);
    this.saveLocalStorage();
    this.renderTaskList();
  }
  //adding an object to an array, add data to storage and render
  
  clearInput = () => {
    document.getElementById('input').value = "";
  }
  //clearing the input field
  
  saveTaskAndDateToObject = () => {
    const field = {};
    field.task = document.getElementById('input').value;
    field.date = new Date().toLocaleDateString();
    field.id = createId();
    field.checkBoxStatus = false;
    addToArray(field);
    clearInput();
  }
  //creating an object and his fields, adding to the array, clearing the input field
  
  initState = () => {
    const localState = JSON.parse(localStorage.getItem('data'));
  
    if(localState) {
      this.state = localState;
    }
  
    this.renderTaskList();
  }
  //initialization of stored data, converting to an object and rendering
  
  startUp = () => {
    this.initState();
  
    document.getElementById('add').addEventListener('click', this.saveTaskAndDateToObject);
    document.getElementById('taskList').addEventListener('click', this.deleteOrCheck);
  }
  //main function declaration 
};

export const app = new OnApp();