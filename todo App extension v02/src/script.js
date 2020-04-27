let counter = 0;

function createNewTaskElement(content = '', isComplete = false) {
    if (localStorage == null) {
        counter = 0;
    }
    const newTask = $('<li></li>', {
            class: 'task'
        })
        .prepend(
            $(
                `<input type="checkbox" id=${counter} class="is-complete " ${isComplete ? "checked":""}/>`
            )
        );
    $(`<label for=${counter}>`).addClass("task-content").html(content).appendTo(newTask).prepend(
        // `<img class="delete-icon"
        // src="https://cdn3.iconfinder.com/data/icons/basic-interface/100/delete-512.png"
        // alt="remove">`
    )
    counter++;
    return newTask
}

function addNewTask() {
    if ($('#task-input').val().trim() != '') {
        const newTask = new createNewTaskElement($('#task-input').val().trim());
        saveToLocal(newTask);
        $('#task-input').val('')
        $('#task-list').prepend(newTask)
        $("#task-input").focus();
    }
}

function addTask(content, isComplete) {
    const newTask = new createNewTaskElement(content, isComplete);
    $('#task-list').prepend(newTask)
}

function addCompletedTask(content, isComplete) {
    const newTask = new createNewTaskElement(content, isComplete);
    newTask.toggleClass('checked')
    $('#completed-task-list').prepend(newTask)
}

function removeCompleted() {
    const newTodo = new Todo()
    let $elem = $('#tasks-container input.is-complete:checked').parent()
    newTodo.removeAllCompletedItems();
    $elem.remove()
}

function saveToLocal(newTask) {
    const newTodo = new Todo()
    // console.log(newTask[0].children[0].checked)
    if (newTask[0].children[0].checked) {
        newTodo.addItemToCompleted(newTask[0].textContent, newTask[0].children[0].checked)
    } else {
        newTodo.addItem(newTask[0].textContent, newTask[0].children[0].checked)
    }
}


function getTodoFromLocal() {
    let tasks = JSON.parse(localStorage.getItem("todos"));

    for (const taskElement of tasks) {
        addTask(taskElement.content, taskElement.isComplete)
    }
}


function getCompletedFromLocal() {
    let completed = JSON.parse(localStorage.getItem("Completed"));
    for (const completedElement of completed) {
        addCompletedTask(completedElement.content, completedElement.isComplete)
    }
}

function updateLocalStorageToCompleted(content, isCompleted) {
    const newTodo = new Todo()
    newTodo.removeFromTodo(content, isCompleted)
    newTodo.addItemToCompleted(content, isCompleted)
}

function updateLocalStorageToTodo(content, isCompleted) {
    const newTodo = new Todo()
    newTodo.removeFromCompleted(content, isCompleted)
    newTodo.addItem(content, isCompleted)
}

function todoInLocal() {
    if (localStorage.getItem('todos')) {
        return true
    } else {
        return false
    }
}

function completedInLocal() {
    if (localStorage.getItem('Completed')) {
        return true
    } else {
        return false
    }
}


function init() {
    if (todoInLocal()) {
        getTodoFromLocal();
    }
    if (completedInLocal()) {
        getCompletedFromLocal();
    }
    $("#task-input").focus();
    $('#add-task-container').click(addNewTask)
    $('#task-input').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addNewTask()
        }
    });
    $('#tasks-container').on('change', 'input.is-complete:checkbox', function () {
        tasksStatusChange(this)
    })
    $('#remove-completed').click(removeCompleted)

}

$(init);

function tasksStatusChange(element) {

    let $elem = $(element).parent()
    if ($elem.find('.is-complete').is(':checked')) {
        $elem.toggleClass('checked')
        updateLocalStorageToCompleted($elem.find('.task-content').text(), $elem.find('.is-complete').is(':checked'))
        $elem.detach().appendTo('#completed-task-list');
    } else {
        $elem.toggleClass('checked')
        updateLocalStorageToTodo($elem.find('.task-content').text(), $elem.find('.is-complete').is(':checked'))
        $elem.detach().appendTo('#task-list');
    }
}