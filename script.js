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
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
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

function pomoDoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-fullpage .session");

  let timerInterval = null;
  let totalSeconds = 60 * 60;
  let isWorkSession = true;
  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds,
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "60:60";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 60 * 60;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 60 * 60;
    updateTimer();
  }

  pauseBtn.addEventListener("click", pauseTimer);
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomoDoroTimer();

function weatherFunctionality() {
  var time = document.querySelector(".header1 h1");
  var dateh2 = document.querySelector(".header1 h2");
  var headerh2Temp = document.querySelector(".header2 h2");
  var headerh4Temp = document.querySelector(".header2 h4");
  var cityh4 = document.querySelector(".header1 h4");
  var presi = document.querySelector(".header2 .preci");
  var humidity = document.querySelector(".header2 .humi");
  var wind = document.querySelector(".header2 .wind");
  var data = null;
  async function weatherAPICall() {
    var key = "d17f0cebf61d4f47a7353806261701";
    var city = "Visnagar";
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`,
    );
    data = await response.json();
    console.log(data);

    headerh2Temp.innerHTML = `${data.current.temp_c}°C`;
    headerh4Temp.innerHTML = `${data.current.condition.text}`;

    cityh4.innerHTML = `${city}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    presi.innerHTML = `Precipitation: ${data.current.heatindex_c}%`;
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfweek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayofweek = totalDaysOfweek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var odate = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    dateh2.innerHTML = `${odate} ${month}, ${year}`;

    if (hours > 12) {
      time.innerHTML = `${dayofweek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM `;
    } else {
      time.innerHTML = `${dayofweek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM `;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}
weatherFunctionality();

function changeTheme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;
  var flag = 0;

  theme.addEventListener("click", function () {
    // --pri: #f8f4e1;
    // --sec: #381c0a;
    // --tri1: #feba17;
    // --tri2: #72512d;

    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#222831");
      rootElement.style.setProperty("--tri1", "#948979");
      rootElement.style.setProperty("--tri2", "#393E46");

      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#40534C");
      rootElement.style.setProperty("--tri1", "#677D6A");
      rootElement.style.setProperty("--tri2", "#D6BD98");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#ECFAE5");
      rootElement.style.setProperty("--sec", "#DDF6D2");
      rootElement.style.setProperty("--tri1", "#CAE8BD");
      rootElement.style.setProperty("--tri2", "#B0DB9C");
      flag = 3;
    } else if (flag == 3) {
      rootElement.style.setProperty("--pri", "#f8f4e1");
      rootElement.style.setProperty("--sec", "#381c0a");
      rootElement.style.setProperty("--tri1", "#feba17");
      rootElement.style.setProperty("--tri2", "#72512d");
      flag = 0;
    }
  });
}

changeTheme();
