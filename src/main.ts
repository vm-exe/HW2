// Define Todo item type
interface Todo {
  id: number; //identifier of the task
  text: string; //task's description
  completed: boolean; //boolean which indicates that the taks is completed or not 
}

//Global variables
const todoList: Todo[] = []; //array that hold all the tastk following the todo structure
let nextId = 1; //counter that generates unique if for each task

//Get DOM elements
const todoInput = document.getElementById("newTodoInput") as HTMLInputElement;
const addTodoButton = document.getElementById("addTodoButton") as HTMLButtonElement;
const todoListElement = document.getElementById("todoList") as HTMLUListElement;

// Add new todo
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return; //trim any extra spaces and check if it is empty

  const newTodo: Todo = { //if is not empty, creates a new object
      id: nextId++,
      text,
      completed: false,
  };

  todoList.push(newTodo);//tak is added to the array
  renderTodos();
  todoInput.value = "";//clears the imput field
}

// Render todos
function renderTodos() {
  todoListElement.innerHTML = ""; //clears the current content

  for (const todo of todoList) {
      const li = document.createElement("li");
      li.classList.toggle("completed", todo.completed);

      const textSpan = document.createElement("span");
      textSpan.textContent = todo.text;
      li.appendChild(textSpan);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      const completeButton = document.createElement("button");
      completeButton.textContent = todo.completed ? "Undo" : "Complete";
      completeButton.onclick = () => toggleComplete(todo.id);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteTodo(todo.id);

      actionsDiv.appendChild(completeButton);
      actionsDiv.appendChild(deleteButton);
      li.appendChild(actionsDiv);

      todoListElement.appendChild(li);
  }
}

// Toggle completion
function toggleComplete(id: number) { //search for element with matchin id
  const todo = todoList.find((t) => t.id === id);
  if (todo) {
      todo.completed = !todo.completed;//if found change status 
      renderTodos();
  }
}

// Delete todo
function deleteTodo(id: number) {//search the matching element
  const index = todoList.findIndex((t) => t.id === id);
  if (index !== -1) {
      todoList.splice(index, 1); //deletes the element
      renderTodos();
  }
}

// Event listeners
addTodoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});
