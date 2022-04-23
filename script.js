initPage();

function clearStorage(key) {
    localStorage.setItem(key, null);
}

document.getElementById("add-task-button").addEventListener("click", () => {
    let input = document.getElementById("input-task");
    let inputText = input.value;
    if (inputText) {
        let ul = document.querySelector("ul#task-list");
        let li = document.createElement("li");
        li.classList.add('inner-flex');
        li.innerHTML = '<input type="checkbox">\n' +
            '<span class="task">'+inputText.toString()+'</span>\n' +
            '<button class="delete-btn">x</button>';
        li.children[2].addEventListener('click', event => {
            let parent = li.children[2].parentNode;
            parent.parentNode.removeChild(parent);
        });
        li.children[0].addEventListener('change', event => {
            li.children[1].classList.toggle('text-line-through');
        });

        addToLocalStorage(li);
        ul.appendChild(li);
        input.value = "";
    } else {
        alert("the field is empty");
    }
});

function addToLocalStorage(object) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(object.outerHTML);
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function removeFromLocalStorage(node) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.forEach((item, ind) => {
        if (node.parentNode.outerHTML === item) {
            taskList.splice(ind, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    return taskList;
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function removeElement(node) {
    let parent = node.parentNode;
    parent.parentNode.removeChild(parent);
}

function initPage() {

    let loadedTasks = loadFromLocalStorage("tasks");
    if (loadedTasks !== []) {
        let ul = document.querySelector("ul#task-list");
        for (let li of loadedTasks) {
            let shouldCheck = false;
            if (li.includes("text-line-through"))
                shouldCheck = true;
            ul.innerHTML += li;
            if (shouldCheck) {
                ul.children[ul.children.length-1].children[0].checked = true;
                shouldCheck = false;
            }
        }
    }
    document.querySelectorAll('.delete-btn').forEach(item => {
        item.addEventListener('click', event => {
            loadedTasks = removeFromLocalStorage(item);
            removeElement(item);
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(item => {
        item.addEventListener('change', event => {
            let parent = item.parentNode;
            parent.children[1].classList.toggle('text-line-through');

        });
    });
}

function replaceInLocalStorage(node) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.forEach((item, ind) => {
        if (node.parentNode.outerHTML === item) {
            taskList.splice(ind, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    return taskList;
}

window.onbeforeunload = () => {
    let ul = document.querySelector("ul#task-list");
    let taskList = [];
    for (let li of ul.children) {
        taskList.push(li.outerHTML);
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}