Challenge 5
Structure Overview
	1.	HTML (Structure):
	•	The page layout includes:
	•	A header with the title and description of the task board.
	•	A button to open a modal for adding new tasks.
	•	Three swimlanes: To Do, In Progress, and Done, each represented as Bootstrap cards.
	•	A modal form for users to create new tasks with fields for title, description, and deadline.
	•	External Resources:
	•	Bootstrap: Provides styles and modal functionality.
	•	Font Awesome: For icons.
	•	jQuery UI: For drag-and-drop and the datepicker.
	•	Day.js: For date manipulations.

	2.	JavaScript (Functionality):
	•	Task Management:
	•	Tasks are stored in localStorage as a list (taskList) with unique IDs (nextId).
	•	Functions:
	•	generateTaskId(): Generates unique task IDs.
	•	createTaskCard(): Builds the HTML for a task card.
	•	renderTaskList(): Populates tasks into the appropriate swimlanes.
	•	handleAddTask(): Adds a new task from the modal form.
	•	handleDeleteTask(): Deletes a task based on its ID.
	•	Drag-and-Drop:
	•	Tasks are draggable between swimlanes (to-do, in-progress, done).
	•	Task status is updated when dropped into a new swimlane.
	•	Dynamic Styling:
	•	Tasks due on the current day are styled with a yellow background (bg-warning).
	•	Overdue tasks are styled red (bg-danger).
	•	Datepicker: Implements a datepicker for task deadlines.
	•	Initialization:
	•	When the page loads:
	•	renderTaskList() displays saved tasks from localStorage.
	•	Swimlanes are made droppable.

	3.	CSS (Styling):
	•	Uses the Open Sans font for a clean appearance.
	•	Swimlanes and cards are styled to visually separate tasks.
	•	The .bg-light class ensures a consistent minimum height for swimlanes.
	•	Hover effects and visual cues (e.g., cursor: grab) are added for a better user experience.

Functionality in Action
	•	Adding a Task:
	•	Users click the “Add Task” button, fill out the modal form, and click “Save Task.”
	•	The new task is added to the To Do lane and saved in localStorage.
	•	Moving a Task:
	•	Drag and drop tasks between swimlanes to update their status.
	•	Deleting a Task:
	•	Click the “Delete” button on a task to remove it from the board and localStorage.
	•	Date Handling:
	•	Tasks are highlighted based on their deadlines.

Areas for Improvement
	1.	Error Handling:
	•	Add validation to ensure task details are complete and deadlines are valid.
	2.	Responsive Design:
	•	Enhance mobile responsiveness for a better user experience on smaller screens.
	3.	Accessibility:
	•	Improve accessibility with ARIA labels and keyboard navigation support.
	4.	Sorting and Filtering:
	•	Enable sorting tasks by deadline or filtering tasks by priority.

This project is licensed under the MIT License.