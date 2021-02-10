let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getParsedTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList==null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}





let todoList = getParsedTodoListFromLocalStorage();

let todosCount = todoList.length;



function createAndAppendTodo(todo) {
    let checkboxId = "checkboxInput" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    // creating a list item element and appending to ul
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    // creating an input element and appending to li
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.classList.add("checkbox-input");
    inputElement.id = checkboxId;
    inputElement.onclick = function () {
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle('checked');
    }
    todoElement.appendChild(inputElement);

    // creating an div element and appending to li
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    // creating a label element and appending it to previuosly created div
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    // creating a delete icon container element and appending it to label container div
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    // creating a delete icon element and appending it to delete icon container div
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        todoItemsContainer.removeChild(todoElement);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

function onSaveTodo(){
    let stringifiedTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringifiedTodoList);
}





for (let todo of todoList) {
    createAndAppendTodo(todo);
}

addTodoButton.onclick = function () {
    onAddTodo();
}

saveTodoButton.onclick = function () {
    onSaveTodo();
}