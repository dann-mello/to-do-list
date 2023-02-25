//Seleção de elementos 
const todoForm = document.querySelector('#to-do--form');
const todoInput = document.querySelector('#to-do--input');
const todoList = document.querySelector('#to-do--list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit--btn');

let oldInputValue;

//Funções

function saveTodo(text){
    const todo = document.createElement('div');
    todo.classList.add('to-do');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish--to-do');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit--to-do');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove--to-do');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = '';
    todoInput.focus();//Vai focar o mouse no input
}


const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
}


function updateTodo(text){
    const todos = document.querySelectorAll('.to-do')

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })

}

//Eventos

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();//Cancela o envio do formulário
    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");//Retorna o ancestral mais próximo
    let todoTItle;

    if(parentEl && parentEl.querySelector('h3')){
        todoTItle = parentEl.querySelector('h3').innerText;
    }

    if(targetEl.classList.contains('finish--to-do')){
        parentEl.classList.toggle('done')
    }
    
    if(targetEl.classList.contains('edit--to-do')){
        toggleForms();
        editInput.value = todoTItle;
        oldInputValue = todoTItle;
    }
    
    if(targetEl.classList.contains('remove--to-do')){
       parentEl.remove();
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();//Cancela o envio do formulário

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();//Cancela o envio do formulário

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms();
})