const tasks = [];

const liActual = (val) => {
  return `<li>${val}</li>`;
}

const renderTaskList = () => {
  document.getElementById('taskList').innerHTML = tasks.map(liActual).join('');
}


const saveTask = () => {
  const field = document.getElementById('input').value;
  tasks.push(field);
  renderTaskList();
}

document.getElementById('add').addEventListener('click', saveTask);
