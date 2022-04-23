initPage();

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
            // taskList.splice(taskList.indexOf(parent), 1);
            // localStorage.setItem('tasks', JSON.stringify(taskList));
            parent.parentNode.removeChild(parent);
        });
        li.children[0].addEventListener('change', event => {
            li.children[1].classList.toggle('text-line-through');
            // taskList[taskList.indexOf(li)] = item;
            // localStorage.setItem('tasks', JSON.stringify(taskList));
        });

        addToLocalStorage(li);
        ul.appendChild(li);

        // taskList.push(li);
        // localStorage.setItem('tasks', JSON.stringify(taskList));

        input.value = "";
    } else {
        alert("the field is empty");
    }
});

function addToLocalStorage(object) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(object);
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function changeInLocalStorage(object) {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList[taskList.indexOf(object)] = object;
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function initPage() {

    document.querySelectorAll('.delete-btn').forEach(item => {
        item.addEventListener('click', event => {
            let parent = item.parentNode;
            parent.parentNode.removeChild(parent);
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(item => {
        item.addEventListener('change', event => {
            item.parentNode.children[1].classList.toggle('text-line-through');
        });
    });

}