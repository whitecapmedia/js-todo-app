var TaskView = function(model) {
	// Pass the model:
	this.model = model;
	
	this.addTaskEvent = new Event(this);
	this.selectTaskEvent = new Event(this);
	this.unselectTaskEvent = new Event(this);
	this.completeTaskEvent = new Event(this);
	this.deleteTaskEvent = new Event(this);


	// Initialize:
	this.init();

};


TaskView.prototype = {

	// Initialize Function:
	init: function() {
		this.createChildren().setupHandlers().enable();
	},

	createChildren: function() {
		// cache document object:
		this.$container = $('.js-container');
		this.$addTaskButton = this.$container.find('.js-add-task-button');
		this.$taskTextBox = this.$container.find('.js-task-textbox');
		this.$tasksContainer = this.$container.find('.js-tasks-container');

		return this;
	},

	setupHandlers: function() {
		// Bind all the events to EventDispatcher:
		this.addTaskButtonHandler = this.addTaskButton.bind(this);
		this.setSelectedStateHandler = this.setSelectedTaskState.bind(this);
		this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
		this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);


		/*
		Handlers from Event Dispatcher:
		*/
		this.addTaskHandler = this.addTask.bind(this);
		this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
		this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
		this.deleteTasksHandler = this.deleteTasks.bind(this);

		return this;
	},

	// Enable Click Events:
	enable: function() {

		this.$addTaskButton.click(this.addTaskButtonHandler);
		this.$container.on('click', '.js-task', this.setSelectedStateHandler);
		this.$container.on('click', '.js-complete-task-button', this.completeTaskButtonHandler);
		this.$container.on('click', '.js-delete-task-button', this.deleteTaskButtonHandler);

		/*
		Event Dispatcher
		*/
		this.model.addTaskEvent.attach(this.addTaskHandler);
		this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
		this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
		this.model.deleteTasksEvent.attach(this.deleteTaskButton);

		return this;
	},

	// Add Task Button:
	addTaskButton: function() {
		//console.log("ADD TASK", this.$taskTextBox.val());
		this.addTaskEvent.notify({
			task: this.$taskTextBox.val()
		});
		this.show();
	},

	// Complete Task Button:
	completeTaskButton: function() {
		this.completeTaskEvent.notify();
	},

	// Delete Task:
	deleteTaskButton: function() {
		this.deleteTaskEvent.notify();
		this.show();
	},

	// Set the Selected Task:
	setSelectedTaskState: function() {
		var taskIndex = $(event.target).attr('data-index');

		if ($(event.target).attr('data-task-selected') === false) {
			//console.log('update state' + $(event.target).attr('data-task-selected'));
			$(event.target).attr('data-task-selected', true);
			this.selectTaskEvent.notify({
				taskIndex: taskIndex
			});
		} else {
			$(event.target).attr('data-task-selected', false);
			this.unselectTaskEvent.notify({
				taskIndex: taskIndex
			});
		}

	},

	// Show the List:
	show: function() {
		this.buildList();
	},

	buildList: function() {
		var tasks = this.model.getTasks();
		var html = '';
		var $tasksContainer = this.$tasksContainer;
		console.log("TASKS TO ADD" + tasks);
		$tasksContainer.html('');

		var i = 0;
		for (var task in tasks) {
			console.log("COMPLETED TASKS>>" + task);
			console.log("STATUS: " +tasks[task].taskName + " >>> " +  tasks[task].taskStatus);
			if (tasks[task].taskStatus == 'completed') {
				html += '<div class="completed">';
			} else {
				html += '<div>';
			}
			
			$tasksContainer.append(html + '<label class="task"><input type="checkbox" class="js-task" data-index="'+i+'" data-task-selected='+tasks[task].taskStatus+'>' + tasks[task].taskName + '</label></div>');

			i++;
		}
	},

	/* ------------------------------------- HANDLERS FROM EVENT DISPATCHER ----------------------------------------------- */

	clearTaskTextBox: function() {
		this.$taskTextBox.val('');
	},

	addTask: function() {
		console.log("ADD EVENT DISPATCHER >> UPDATE LIST");
		this.show();
	},

	setTasksAsCompleted: function () {
		console.log("SET TASK AS COMPLETE");
		this.show();
	},

	deleteTasks: function() {
		this.show();
	}


	/* ------------------------------------- END HANDLERS FROM EVENT DISPATCHER ------------------------------------------- */
};