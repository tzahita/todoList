class Todo {
    todoItems = {}
    completedItems = {}
    constructor() {
        this.todoItems = JSON.parse(localStorage.getItem('todos')) || []
        this.completedItems = JSON.parse(localStorage.getItem('Completed')) || []
    }

    addItem(content = '', isComplete = false) {
        this.todoItems.push({
            content,
            isComplete
        })
        localStorage.setItem("todos", JSON.stringify(this.todoItems))
    }

    addItemToCompleted(content = '', isComplete = true) {

        this.completedItems.push({
            content,
            isComplete
        })
        localStorage.setItem("Completed", JSON.stringify(this.completedItems))
    }

    removeFromTodo(contentToMark, isComplete) {
        console.log(contentToMark)
        this.todoItems = this.todoItems.filter(function (item) {
            return item['content'] !== contentToMark
        })

        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify(this.todoItems))

    }

    removeFromCompleted(contentToUnMark, isComplete) {
        console.log(contentToUnMark)
        this.completedItems = this.completedItems.filter(function (item) {
            return item['content'] !== contentToUnMark
        })
        localStorage.removeItem("Completed");
        localStorage.setItem("Completed", JSON.stringify(this.completedItems))
    }

    removeAllCompletedItems() {
        localStorage.removeItem("Completed");
    }

    removeItem(contentToRemove, isCompleted) {

    }

}