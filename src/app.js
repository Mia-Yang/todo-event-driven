// save and get history from localStorage
const saveListToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getPersistedListFromLocalStorage = (key) => {
    if (localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key));
    }
    return [];
}

// initialize history
const initialize = () => {
    getPersistedListFromLocalStorage("my-todoList").forEach(item => renderItem(item))
}
window.addEventListener('load', initialize)

// add todos
const addItemIntoTodos = (item) => {
    const todos = getPersistedListFromLocalStorage("my-todoList");
    let newTodos = [...todos, item]
    saveListToLocalStorage("my-todoList", newTodos);
}

const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-btn");
const inputText = document.querySelector(".inputbox");
addButton.addEventListener('click', addItem)

function renderItem(item) {
    const todoItem = document.createElement("li");
    let isChecked = item.completed ? "checked" : "";

    todoItem.innerHTML =
        `<input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
    <span contenteditable id="text-${item.id}"> ${item.text} </span>
    <button class="del" onclick="removeTodo(${item.id})">✖️</button>`;
    todoList.appendChild(todoItem);
}

function addItem(e) {
    e.preventDefault();
    const textContent = inputText.value.trim();
    inputText.value = '';
    let newTodo = {
        id: new Date().getTime(),
        text: textContent,
        completed: false,
    }
    if (textContent.length !== 0) {
        renderItem(newTodo);
        addItemIntoTodos(newTodo);
    }
}

//delete todos

//toggle todos

//clear todos
const clearButton = document.querySelector(".clear")
clearButton.onclick = function() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    localStorage.clear();
}