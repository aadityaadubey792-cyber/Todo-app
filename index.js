
let input = document.querySelector(".taskInput");
let btn = document.querySelector(".addBtn");
let ul = document.querySelector(".taskList");

/* ---------------- LOCAL STORAGE HELPERS ---------------- */
function saveTask(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTodo() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

/* DOM se data utha ke storage update karega */
function updateStorageFromDom() {
  const tasks = [];
  document.querySelectorAll(".listClass").forEach(li => {
    const span = li.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: li.classList.contains("completed"),
    })
  })
  saveTask(tasks);
}

/* ---------------- ADD TASK ---------------- */
btn.addEventListener("click", function() {
  const value = input.value.trim();
  if(value === "") return;

  const li = document.createElement("li");
  li.classList.add("listClass");

  const span = document.createElement("span");
  span.innerText = value;
  
  const dltBtn = document.createElement("button");
  dltBtn.innerText = "X";
  dltBtn.classList.add("dltClass");

  dltBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    li.remove();
    updateStorageFromDom();
  })
  
  li.appendChild(span);
  li.appendChild(dltBtn);
  ul.appendChild(li);
  input.value = "";
  updateStorageFromDom();
});

/*---------------------------enter key support------------*/
input.addEventListener("keydown", function(e) {
  if(e.key === "Enter") {
    btn.click();
  }
})

/* ---------------- COMPLETE / UNCOMPLETE ---------------- */
ul.addEventListener("click", function(e) {
  if(e.target.classList.contains("listClass") || e.target.closest(".listClass")) {
    const li = e.target.classList.contains("listClass") ? e.target : e.target.closest(".listClass");
    if(!e.target.classList.contains("dltClass")) {
      li.classList.toggle("completed");
      updateStorageFromDom();
    }
  }
})

/* ---------------- LOAD TASKS ON PAGE LOAD ---------------- */
window.addEventListener("load", function() {
  const tasks = getTodo();
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("listClass");
    
    const span = document.createElement("span");
    span.innerText = task.text;
    
    if(task.completed) {
      li.classList.add("completed");
    }
    
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "X";
    dltBtn.classList.add("dltClass");

    dltBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      li.remove();
      updateStorageFromDom();
    })
    
    li.appendChild(span);
    li.appendChild(dltBtn);
    ul.appendChild(li);
  })
});









