let values = [];

document.getElementById('add').addEventListener('click', () => {
  let val = document.getElementById('input').value;
  values.push(val);

  const taskLi = values.forEach(v => {
    const li = document.createElement('li');
    li.textContent = v;
    document.getElementById('taskList').appendChild(li);
  });

});