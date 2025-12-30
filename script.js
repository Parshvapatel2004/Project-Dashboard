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

function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || "";
    wholeDaySum += `
  <div class="day-planner-time">
  <p>${elem}</p>
  <input  id=${idx} type="text" placeholder="..." value=${saveData} >
  </div>`;
  });
  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      // console.log(elem.value);
      dayPlanData[elem.id] = elem.value;
      console.log(dayPlanData);

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  let motivationQuote = document.querySelector(".motivation-2 h1");
  let motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();
    motivationQuote.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}
motivationalQuote();
