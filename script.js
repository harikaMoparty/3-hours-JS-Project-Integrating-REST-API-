const myForm = document.querySelector("todo-form");
const todo = document.getElementById("todo-task");
const description = document.getElementById("task-desc");
const pendingTodo = document.getElementById("total-tasks");
const doneTodo = document.getElementById("todo-list");

function addTask() {
  const taskInput = document.getElementById("todo-task");

  const taskList = document.getElementById("taskList");

  if (taskInput.value !== "") {

    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");

    const label = document.createElement("label");

    const removeBtn = document.createElement("button");

    const editBtn = document.createElement("button");

    checkbox.type = "checkbox";

    label.textContent = taskInput.value;

    removeBtn.textContent = "Remove";

    editBtn.textContent = "Edit";

    removeBtn.onclick = function() {

      taskList.removeChild(taskItem);

    };

    editBtn.onclick = function() {

      const newTask = prompt("Edit the task", label.textContent);

      if (newTask !== null) {

        label.textContent = newTask;

      }

    };

    checkbox.onchange = function() {

      if (checkbox.checked) {

        label.classList.add("completed");

      } else {

        label.classList.remove("completed");

      }

    };

    taskItem.appendChild(checkbox);

    taskItem.appendChild(label);

    taskItem.appendChild(editBtn);

    taskItem.appendChild(removeBtn);

    taskList.appendChild(taskItem);

    taskInput.value = "";

  }

}

todo.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText);
        taskInput.value = "";
    }
});

todo.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let myObj = {
    todo: todo.value,
    description: description.value,
    isDone: false,
  };

  axios
    .post(
      "https://crudcrud.com/api/7820a34ccc3f4243b4a2e5719947c1f8/todos",
      myObj
    )
    .then((res) => {
      console.log(res.data);
      location.reload();
    })
    .catch((err) => console.log(err));

    todo.value = ""
    description.value = ""
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/7820a34ccc3f4243b4a2e5719947c1f8/todos")
    .then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.task.length; i++) {
        showTodo(res.data[i])
      }
    })
    .catch((err) => console.log(err));
});

function showTodo(data) {
  console.log(data);
  const todo = data.todo;
  const description = data.description;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${todo}</strong>:${description}`;

  const span = document.createElement("span");

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add = "delete";
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => onDelete(data._id))

  if(data.isDone===false){

    // Edit Button
    const tickBtn = document.createElement("button")
    tickBtn.classList.add = "tick"
    tickBtn.textContent = "✅"
    tickBtn.addEventListener("click", () => onEdit(data))
  
    span.appendChild(tickBtn)
    span.appendChild(deleteBtn)
  
    li.appendChild(span);
    pendingTodo.appendChild(li);
  }else{
    span.appendChild(deleteBtn);
    li.appendChild(span)
    doneTodo.appendChild(li);
  }  
}

function onEdit(data){
    const newObj = {
        todo:data.todo,
        description:data.description,
        isDone:true
    }
    axios.put(`https://crudcrud.com/api/7820a34ccc3f4243b4a2e5719947c1f8/todos/${data._id}`, newObj)
    .then((res) => {
        console.log(res.data)
        location.reload()
    })
    .catch((err) => console.log(err))
}

function onDelete(id){
    axios.delete(`https://crudcrud.com/api/7820a34ccc3f4243b4a2e5719947c1f8/todos/${id}`)
    .then((res) => {
        console.log(res)
        location.reload()
    })
    .catch((err) => console.log(err))
}