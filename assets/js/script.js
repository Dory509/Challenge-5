// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("taskboard")) ||[]
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random() * 1000)
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    var taskCard = `<div class="card task-card p-2 m-3"  id="${task.id}" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Title:${task.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Description: ${task.description}</h6>
    <p class="card-text">Due Date:${task.deadline}</p>
    <button class="btn btn-danger delete-task" data-id=${task.id}>Delete task<button>
  </div>
</div>`
    return taskCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    var previousTaskList = JSON.parse(localStorage.getItem("taskboard")) || []
    $("#todo-cards").html("")
    $("#in-progress-cards").html("")
    $("#done-cards").html("")

    previousTaskList.forEach(element => {
        var taskCard = createTaskCard(element)
        if (element.status == "to-do") {
            $("#todo-cards").append(taskCard)
        }
        else if (element.staus == "in-progress") {
            $("#in-progress-cards").append(taskCard)
        }
        else {
            $("#done-cards").append(taskCard)
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    var newtask = {
        id: generateTaskId(),
        title: $("#taskTitle").val(),
        description: $("#taskDescription").val(),
        deadline: $("#taskDeadline").val(),
        status: "to-do"
    };
    var previousTaskList = JSON.parse(localStorage.getItem("taskboard")) || []
    previousTaskList.push(newtask)
    localStorage.setItem("taskboard", JSON.stringify(previousTaskList))
    alert("Added task")
    $("#taskTitle").val("");
    $("#taskDescription").val("");
    $("#taskDeadline").val("");
    renderTaskList()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskList = JSON.parse(localStorage.getItem("taskboard")) ||[]
    const id = event.target.closest('.task-card').attr('id');
    taskList = taskList.filter((task) => task.id !== id);
    localStorage.setItem("taskboard", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const id = ui.item.data('id');
    const newState = $(this).closest('.lane').attr('id');
    console.log(newState, id, "UI",ui,taskList)
    taskList = taskList.map((task) => {
        return task.id === id ? { ...task, state: newState } : task
    }
    );
    console.log(taskList)
    localStorage.setItem("taskboard", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#saveTask").on("click", handleAddTask)
    renderTaskList()
    // Make task lanes sortable
    $('.lane .card-body').sortable({
        connectWith: '.lane .card-body',
        receive: handleDrop,
    }).disableSelection();

    // Make a date picker for task date
    $('#taskDate').datepicker({ dateFormat: 'yy-mm-dd' });

});
$(document).on('click', '.delete-task', handleDeleteTask);


