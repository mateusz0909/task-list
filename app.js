const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventlisteners();

function loadEventlisteners() {
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear all tasks
  clearBtn.addEventListener('click', clearAll);
  //filter all tasks
  filter.addEventListener('keyup', filterTasks);
  //DOM load event to add tasks from LS
  document.addEventListener('DOMContentLoaded', getTasks)
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement('li');

    //add class
    li.className = 'collection-item'

    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content'

    //add icon html
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';

    //append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li)

  })
}

//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task')
  } else {

    //create li element
    const li = document.createElement('li');

    //add class
    li.className = 'collection-item'

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content'

    //add icon html
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';

    //append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li)

    //add to LS
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value = '';
    e.preventDefault();

  }
}

// Storage task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


//remove task from list
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove()
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }

  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1)
      }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}

//clear all tasks
function clearAll(e) {
  if (confirm('Are you sure?')) {
    taskList.innerHTML = '';
  }
  //Clear all tasks from LS
  clearTasksFromLocalStorage()
}
//Clear all tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.csollection-item').forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }

  })
}