// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("taskboard")) ||[]
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random() * 1000)

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    var taskCard = `<div class="card task-card draggable p-2 m-3"  id="${task.id}" style="width: 18rem;">
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
        const taskCard = createTaskCard(element)
        if (element.status == "to-do") {
            $("#todo-cards").append(taskCard)
        }
        else if (element.status == "in-progress") {
            $("#in-progress-cards").append(taskCard)
        }
        else if (task.status == "done"){
            $("#done-cards").append(taskCard)
        } 
        else{
            console.error("unknown task status:", task)
        }
    });
}
    // Make the taks draggable
    $(".draggable").draggable ({ 
        opacity:0.7,
        zIndex:100,
        helper: function(e){
            const original = $(e.target).hasClass("ui-draggable") ? $(e.target) : $(e.target).closest(".ui-draggable");
            return original.clone().css({
                maxWidth: original.outerWidth()
            })
        }
    });


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
    const id = $(event.target).closest('.task-card').attr('id');
    taskList = taskList.filter((task) => task.id !== parseInt(id,10));
    localStorage.setItem("taskboard", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const id = ui.item.data('id');
    const newState = $(this).closest('.lane').attr('id');
    console.log(newState, id, "UI",ui,taskList)
    taskList = taskList.map((task) => {
        return task.id ===  parseInt(id,10) ? { ...task, status: newState } : task;
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
    $('.lane').droppable ({
       accept:'.draggable',
       drop:handleDrop
    })

    // Make a date picker for task date
    $('#taskDate').datepicker({ dateFormat: 'mm-dd-yyyy' });

});


$(document).on('click', '.delete-task', handleDeleteTask);


