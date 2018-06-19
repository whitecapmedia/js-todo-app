var TaskController = function (model, view) {
	this.model = model;
	this.view = view;

	this.init();
};

TaskController.prototype = {

	// Initialize Controller:
	init: function() {
		this.createChildren().setupHandlers().enable();
	},

	// Create the Children:
	createChildren: function() {
		// No need to create children inside the controller.
		// This is abstracted to the TaskView.
		return this;
	},

	setupHandlers: function() {

		this.addTaskHandler = this.addTask.bind(this);
		this.selectTaskHandler = this.selectTask.bind(this);
		this.unselectTaskHandler = this.unselectTask.bind(this);
		this.completeTaskHandler = this.completeTask.bind(this);
		this.deleteTaskHandler = this.deleteTask.bind(this);

		return this;
	},

	enable: function() {

		this.view.addTaskEvent.attach(this.addTaskHandler);
		this.view.completeTaskEvent.attach(this.completeTaskHandler);
		this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
		this.view.selectTaskEvent.attach(this.selectTaskHandler);
		this.view.unselectTaskEvent.attach(this.unselectTaskHandler);

		return this;

	},

	// Update the model that is passed to the view!
	addTask: function(sender, args) {
		console.log("ADD TASK >> " + args.task);
		this.model.addTask(args.task);
	},

	selectTask: function(sender, args) {
		this.model.setSelectedTask(args.taskIndex);
	},

	unselectTask: function(sender, args) {
		this.model.unselectTask(args.taskIndex);
	},

	completeTask: function() {
		this.model.setTasksAsCompleted();
	},

	deleteTask: function() {
		this.model.deleteTasks();
	}
};