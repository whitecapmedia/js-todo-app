var TaskModel = function() {

	this.tasks = [];
	this.selectedTasks = [];
	
	// Add all the events via EventDispatcher.js
	this.addTaskEvent = new Event(this);
	this.removeTaskEvent = new Event(this);
	this.setTasksAsCompletedEvent = new Event(this);
	this.deleteTasksEvent = new Event(this);

};


TaskModel.prototype = {

	// Add a new task and assign a default status and priority.
	// TODO: Style later (priority)
	addTask: function(task) {
		this.tasks.push({
			taskName: task,
			taskStatus: 'uncompleted',
			taskPriority: 0 // 0: default, 1: high, 2: medium
		})

		console.log(this.tasks);
	},

	// Get all tasks:
	getTasks: function() {
		return this.tasks;
	},

	// Set selected Task:
	setSelectedTask: function(taskIndex) {
		this.selectedTasks.push(taskIndex);
	},

	// Unselect Task:
	unselectTask: function(taskIndex) {
		this.selectedTasks.splice(taskIndex, 1);
	},

	// Set selected Task as completed:
	setTasksAsCompleted: function() {
		var selectedTasks = this.selectedTasks;

		console.log("SELECTED TASKS COMPLETED");
		for (var i in selectedTasks) {
			this.tasks[selectedTasks[i]].taskStatus = 'completed';
			console.log("COMPLETE TASK: " + this.tasks[selectedTasks[i]]);
		}

		this.setTasksAsCompletedEvent.notify();

		this.selectedTasks = [];
	},

	// Remove Tasks
	deleteTasks: function() {
		console.log("DELETE TASK");
		var selectedTasks = this.selectedTasks.sort();

		console.log(selectedTasks);

		for (var i=selectedTasks.length-1; i >= 0; i--) {
			this.tasks.splice(this.selectedTasks[i], 1);
		}

		// clear the selected Task:
		this.selectedTasks = [];

		// Fire Event:
//		this.deleteTasksEvent.notify();

	}

};