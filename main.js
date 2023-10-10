window.addEventListener("load", function () {
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#add-item");
  const taskList = document.querySelector("#tasks");
  const inputField = document.querySelector("#add-item");

  const storedInput = JSON.parse(localStorage.getItem("tasks")) || [];

  storedInput.forEach(function (taskText) {
    renderTask(taskText);
  });

  inputField.value = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please enter a ToDo");
      return;
    }
    if (storedInput.includes(task)) {
      alert("This task already exists.");
      return;
    }
    storedInput.push(task);

    localStorage.setItem("tasks", JSON.stringify(storedInput));

    renderTask(task);

    input.value = "";
  });

  function renderTask(taskText) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("content");

    taskElement.appendChild(taskContent);

    const taskInput = document.createElement("input");
    taskInput.classList.add("text");
    taskInput.type = "text";
    taskInput.value = taskText;
    taskInput.setAttribute("readonly", "readonly");

    taskContent.appendChild(taskInput);

    const taskActions = document.createElement("div");
    taskActions.classList.add("actions");

    const taskEdit = document.createElement("button");
    taskEdit.classList.add("edit");
    taskEdit.innerHTML = "Edit";

    const taskDelete = document.createElement("button");
    taskDelete.classList.add("delete");
    taskDelete.innerHTML = "Delete";

    taskActions.appendChild(taskEdit);
    taskActions.appendChild(taskDelete);

    taskElement.appendChild(taskActions);
    taskList.appendChild(taskElement);

    taskDelete.addEventListener("click", function (event) {
      const index = storedInput.indexOf(taskText);
      if (index !== -1) {
        storedInput.splice(index, 1);
      }

      localStorage.setItem("tasks", JSON.stringify(taskText));

      taskElement.parentNode.removeChild(taskElement);
    });

    taskEdit.addEventListener("click", function (event) {
      if (taskEdit.innerText.toLowerCase() == "edit") {
        taskInput.removeAttribute("readonly");
        taskInput.focus();
        taskEdit.innerText = "Save";
      } else {
        taskInput.setAttribute("readonly", "readonly");
        taskEdit.innerText = "Edit";
      }
    });
  }
});
