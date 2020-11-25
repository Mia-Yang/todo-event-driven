// save and get history from localStorage
const saveListToLocalStorage = (value) => {
    localStorage.setItem("my-todoList", JSON.stringify(value));
}

const getPersistedListFromLocalStorage = () => {
    if (localStorage.getItem("my-todoList") !== null) {
        return JSON.parse(localStorage.getItem("my-todoList"));
    }
    return [];
}

// initialize history
const initialize = () => {
    getPersistedListFromLocalStorage().forEach(item => renderItem(item))
}
window.addEventListener('load', initialize)

// add todos
const addItemIntoStorage = (item) => {
    let newTodos = [...getPersistedListFromLocalStorage(), item]
    saveListToLocalStorage(newTodos);
}

const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-btn");
const inputText = document.querySelector(".inputbox");
addButton.addEventListener('click', addItem)

function renderItem(item) {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("id", item.id)
    let isChecked = item.completed ? "checked" : "";

    todoItem.innerHTML =
        `<input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
    <span id="text-${item.id}" onfocus="editTodo(${item.id})" class="single-line" contenteditable > ${item.text} </span>
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
        addItemIntoStorage(newTodo);
    }
}

//delete todos
window.removeTodo = removeTodo;

function removeTodo(id) {
    saveListToLocalStorage(getPersistedListFromLocalStorage().filter(todo => todo.id !== id));
    todoList.removeChild(document.getElementById(id));
}

//toggle todos
window.toggleTodo = toggleTodo;

function toggleTodo(id) {
    saveListToLocalStorage(getPersistedListFromLocalStorage().map(item => item.id === id ? {...item, completed: !item.completed } : item));
    document.getElementById(id).classList.toggle("finished")
}

//edit todos
window.editTodo = editTodo;

function editTodo(id) {
    const textSpan = document.getElementById("text-" + id);
    const originalText = textSpan.innerText;
    textSpan.addEventListener('blur', function() {
        const newText = textSpan.innerText
        if (newText.trim().length) {
            const editedTodo = getPersistedListFromLocalStorage().map(item => item.id === id ? {...item, text: newText.trim() } : item);
            saveListToLocalStorage(editedTodo);
        } else {
            textSpan.innerText = originalText;
        }
    })
}

//clear todos
const clearButton = document.querySelector(".clear")
clearButton.onclick = function() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    localStorage.clear();
}