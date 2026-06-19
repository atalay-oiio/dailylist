let input = document.getElementById("input");
let btn = document.getElementById("btn");
let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadData);

btn.addEventListener('click', addTask);

function addTask() {
    let taskText = input.value.trim();
    
    if (taskText === "") {
        alert("please enter something");
        return;
    }

    createTaskElement(taskText, false);

    input.value = "";
    saveData();
}

function createTaskElement(taskText, isCompleted) {
    const li = document.createElement("li");
    if (isCompleted) {
        li.classList.add("completed");
    }
    
    const span = document.createElement("span");
    span.className = "task-text"; 
    span.textContent = taskText;

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = isCompleted ? "Undo" : "Complete";

    const deletbtn = document.createElement("button");
    deletbtn.className = "delet-btn";
    deletbtn.textContent = "Delete";

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deletbtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    taskList.appendChild(li);

    deletbtn.addEventListener("click", function() {
        taskList.removeChild(li);
        saveData();
        checkAllCompleted(); 
    });

    completeBtn.addEventListener("click", function() {
        li.classList.toggle("completed");
        
        if(li.classList.contains("completed")) {
            completeBtn.textContent = "Undo";
        } else {
            completeBtn.textContent = "Complete";
        }

        saveData();
        checkAllCompleted();
    });
}

function checkAllCompleted() {
    const allTasks = taskList.querySelectorAll("li");
    
    if (allTasks.length === 0) return;

    let allDone = true;
    allTasks.forEach(task => {
        if (!task.classList.contains("completed")) {
            allDone = false;
        }
    });

    if (allDone) {
        setTimeout(() => {
            alert("Tebrikler! Günlük tüm işleri bitirdiniz. Liste baştan başlıyor.");
            allTasks.forEach(task => {
                task.classList.remove("completed");
                const compBtn = task.querySelector(".complete-btn");
                if(compBtn) compBtn.textContent = "Complete";
            });
            saveData();
        }, 600);
    }
}

function saveData() {
    const tasks = [];
    const allTasks = taskList.querySelectorAll("li");
    
    allTasks.forEach(task => {
        tasks.push({
            text: task.querySelector(".task-text").textContent,
            completed: task.classList.contains("completed")
        });
    });
    
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadData() {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}
