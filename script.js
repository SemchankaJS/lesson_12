'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    btnHeader = document.querySelector('.header-button');
    btnHeader.disabled = true;




let todoData = [];

// 3) Пустые дела добавляться не должны
function emp() {
    if (headerInput.value !== '' && headerInput.value.trim() !== '') {
        btnHeader.disabled = false;
    } else {
        btnHeader.disabled = true;
    } 
}


const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        if (item.completed !== undefined && item.value !== undefined) {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"</button>' +
                '<button class="todo-complete"</button>' +
                '</div>';

            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            const btnTodoComplete = li.querySelector('.todo-complete');



            // 5) Удаление дел на кнопку КОРЗИНА.
            const rub = li.querySelector('.todo-remove');
            rub.addEventListener('click', function (event) {
                delete item.value;
                delete item.completed;
                li.remove();
            });

            btnTodoComplete.addEventListener('click', function () {
                item.completed = !item.completed;
                render();

            });

            // 4) Поле ввода после добавления дела должно очищаться
            headerInput.value = '';
        }
        // 6) Сохранять данные о делах в localStorage (советую в виде массива)
        localStorage.setItem('todo' , JSON.stringify(todoData));

    });
};
todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    render();
    emp();
});
headerInput.addEventListener('input', emp);

// 7) Дела из localStorage подгружаться должны автоматически при загрузки странице
if (localStorage.getItem('todo')) {
    todoData = JSON.parse(localStorage.getItem('todo'));
    render();
}
