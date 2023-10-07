window.addEventListener("load", function () {
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#add-item");
  const taskList = document.querySelector("#tasks");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please enter a ToDo");
      return;
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("content");

    taskElement.appendChild(taskContent);

    const taskInput = document.createElement("input");
    taskInput.classList.add("text");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.setAttribute("readonly", "readyonly");

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

    input.value = "";

    taskDelete.addEventListener("click", function (event) {
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
  });
});
