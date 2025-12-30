function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((elem) => {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += ` <div class="task">
      <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
      <details>${elem.details}</details>
      <button id=${idx}>Mark as Completed</button>
      </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    document.querySelectorAll(".task button").forEach(function (elem) {
      elem.addEventListener("click", function () {
        currentTask.splice(elem.id, 1);
        renderTask();
      });
    });
  }
  renderTask();
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // console.log(taskInput.value);
    // console.log(taskDetailsInput.value);
    // console.log(taskCheckbox.checked);
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    // console.log(currentTask);
    renderTask();
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });
}

todoList();
