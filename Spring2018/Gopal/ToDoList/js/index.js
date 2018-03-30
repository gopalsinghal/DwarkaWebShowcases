let todos = [];
let todoList;

$(document).ready(function () {
  todoList = $('#list');
  let inp = $("#task");
  let btn = $("#add");
  refreshList(true)
  btn.click(function () {
    todos.push({
      task: inp.val(),
      done: false
    });
    refreshList();
    inp.val("");
  })
});

function refreshList(firstPageLoad = false) {
  if (!firstPageLoad) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  todoList.empty();
  let savedTodos = localStorage.getItem("todos");
  if (savedTodos && firstPageLoad) {
    todos = JSON.parse(savedTodos);
  }
  for (i in todos) {
    let todoItem = createItem(i);
    todoList.append(todoItem);
  }
}

function createItem(i) {
  let todoItem = $(`<li></li>`)
  let contentDiv = $(`<div class="task"></div>`)
  let checkBoxDiv = $(`<div class="checkbox"></div>`)
  let task = $(`<div>${todos[i].task}</div>`)
  let check = $(`<input type="checkbox">`).click(function () {
    todos[i].done = !todos[i].done;
    refreshList();
  })
  if (todos[i].done) {
    task.css("text-decoration", "line-through");
    check.prop("checked", "true");
  }
  let removeButton = $(`<div class="del"><i class="fa fa-trash"></i></div>`)
    .click(() => { 
      todos.splice(i, 1);
      refreshList(); 
    })
  contentDiv.append(checkBoxDiv.append(check)).append(task).append(removeButton);
  todoItem.append(contentDiv)
  return todoItem;
}
