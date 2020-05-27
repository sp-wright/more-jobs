const task = document.querySelector("#task");
const type = document.querySelector("#type");
const importance = document.querySelector("#importance");
const inputForm = document.querySelector("#input-form");
const output = document.querySelector("#output");

class Job {
  constructor(task, type, importance) {
    this.task = task;
    this.type = type;
    this.importance = importance;
  }
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (task.value === "") {
    task.placeholder = "You need to enter a task!";
    task.classList.add("highlight");
  }
  if (type.value === "none") {
    type.classList.add("highlight");
  }
  if (importance.value === "none") {
    importance.classList.add("highlight");
  } else {
    newJob = new Job(task.value, type.value, importance.value);
    jobToPage(newJob);
    task.placeholder = "Enter in the task";
    importance.classList.remove("highlight");
    type.classList.remove("highlight");
    task.classList.remove("highlight");
    importance.value = "none";
    type.value = "none";
  }
});

output.addEventListener("click", (e) => {
  if (e.srcElement.classList[0] === "trash") {
    deleteJob(e);
  }
});

let jobToPage = (job) => {
  let div = document.createElement("div");
  div.classList.add("output-info");

  div.innerHTML = `
  <div><h3>${jobs.length + 1}</h3></div>
  <div><h3>${job.task}</h3></div>
  <div><h3>${job.type}</h3></div>
  <div class="color-code"><h3>${job.importance}</h3></div>
  <div><i class="trash far fa-lg fa-trash-alt"></i></div>
  <hr/>
  `;

  colorCode(job.importance, div.children[3]);
  output.appendChild(div);
  saveToLocal(job);
  task.value = "";
};

let deleteJob = (e) => {
  let sourceIndex = e.target.parentElement.parentElement.children[0].innerText;
  let source = e.target.parentNode.parentNode;
  removeFromLocalStorage(sourceIndex);
  source.classList.add("deleted");
  source.addEventListener("transitionend", () => {
    source.remove();
  });
};

let colorCode = (i, d) => {
  switch (i) {
    case "normal":
      d.classList.add("normal");
      break;
    case "important":
      d.classList.add("important");
      break;
    case "asap":
      d.classList.add("asap");
      break;

    default:
      console.log("not working");
      break;
  }
};

let filterType = (e) => {
  let jobs = output.childNodes;
  for (i = 0; i < jobs.length; i++) {
    let j = output.childNodes[i].children[2].textContent;
    switch (e) {
      case "all":
        jobs[i].classList.remove("hidden-type");
        break;
      case "living room":
        if (e === j) {
          jobs[i].classList.remove("hidden-type");
        } else {
          jobs[i].classList.add("hidden-type");
        }
        break;
      case "bedroom":
        if (e === j) {
          jobs[i].classList.remove("hidden-type");
        } else {
          jobs[i].classList.add("hidden-type");
        }
        break;
      case "bathroom":
        if (e === j) {
          jobs[i].classList.remove("hidden-type");
        } else {
          jobs[i].classList.add("hidden-type");
        }
        break;
      case "kitchen":
        if (e === j) {
          jobs[i].classList.remove("hidden-type");
        } else {
          jobs[i].classList.add("hidden-type");
        }
        break;
      case "misc.":
        if (e === j) {
          jobs[i].classList.remove("hidden-type");
        } else {
          jobs[i].classList.add("hidden-type");
        }
        break;

      default:
        break;
    }
  }
};

document.querySelector("#type-output").addEventListener("change", (e) => {
  filterType(e.target.value);
});

let filterImportance = (e) => {
  let jobs = output.childNodes;
  for (i = 0; i < jobs.length; i++) {
    let j = output.childNodes[i].children[3].textContent;
    switch (e) {
      case "all":
        jobs[i].classList.remove("hidden-importance");
        break;
      case "normal":
        if (e === j) {
          jobs[i].classList.remove("hidden-importance");
        } else {
          jobs[i].classList.add("hidden-importance");
        }
        break;
      case "important":
        if (e === j) {
          jobs[i].classList.remove("hidden-importance");
        } else {
          jobs[i].classList.add("hidden-importance");
        }
        break;
      case "asap":
        if (e === j) {
          jobs[i].classList.remove("hidden-importance");
        } else {
          jobs[i].classList.add("hidden-importance");
        }
        break;

      default:
        break;
    }
  }
};

document.querySelector("#importance-output").addEventListener("change", (e) => {
  filterImportance(e.target.value);
});

let localCheck = () => {
  let jobs;
  if (localStorage.getItem("jobs") === null) {
    jobs = [];
  } else {
    jobs = JSON.parse(localStorage.getItem("jobs"));
  }
  return jobs;
};

let saveToLocal = (j) => {
  jobs = localCheck();
  jobs.push(j);
  localStorage.setItem("jobs", JSON.stringify(jobs));
};

let printFromLocalStorage = () => {
  jobs = localCheck();
  for (i = 0; i < jobs.length; i++) {
    let div = document.createElement("div");
    div.classList.add("output-info");

    div.innerHTML = `
    <div><h3>${i + 1}</h3></div>
    <div><h3>${jobs[i].task}</h3></div>
    <div><h3>${jobs[i].type}</h3></div>
    <div class="color-code"><h3>${jobs[i].importance}</h3></div>
    <div><i class="trash far fa-lg fa-trash-alt"></i></div>
    <hr/>
    `;
    colorCode(jobs[i].importance, div.children[3]);
    output.appendChild(div);
  }
};

document.addEventListener("DOMContentLoaded", printFromLocalStorage);

let removeFromLocalStorage = (e) => {
  let jobs = localCheck();
  let jobIndex = e - 1;
  jobs.splice(jobIndex, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
};
