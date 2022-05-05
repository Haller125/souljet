function onPageLoaded() {
  const input = document.querySelector("input[type='text']");
  const ul = document.querySelector("ul.todos");
  const saveButton = document.querySelector("button.save");
  const clearButton = document.querySelector("button.clear");

  saveButton.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });
  clearButton.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem('todos', ul.innerHTML);
  });

  function createTodo() {
      const li = document.createElement("li");
      const textSpan = document.createElement("span");
      const icon = document.createElement("i");

      const newTodo = input.value;
      input.value = "";

      icon.classList.add("fas", "fa-trash-alt");
      textSpan.append(icon);
      ul.appendChild(li).append(textSpan, newTodo);

      listenDeleteTodo(textSpan);
  }

    function listenDeleteTodo(element) {
      element.addEventListener("click", (event) => {
          element.parentElement.remove();
          event.stopPropagation();
      });
  }

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll("span");
    for (const button of deleteButtons) {
        listenDeleteTodo(button);
    }
  }

  function onClickTodo(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
}

input.addEventListener("keypress", (keyPressed) => {
  const keyEnter = 13;
  if (keyPressed.which == keyEnter) {
      createTodo();
  }
  });
  ul.addEventListener("click", onClickTodo);
  loadTodos();
}

onPageLoaded();