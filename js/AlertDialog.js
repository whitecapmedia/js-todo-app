var AlertDialog = function() {

	this.showAlertEvent = new Event(this);

	this.$msg = "Default Message";

	this.init();

};

AlertDialog.prototype = {

	init: function() {
		this.createChildren().hide();

		return this;
	},

	createChildren: function() {
		this.$dialog = $('.alert');
	
		return this;
	},

	show: function() {
		this.showAlertEvent.notify(this);
		this.$dialog.css('display', 'block');
	},

	hide: function() {
		this.$msg = '';
		this.$dialog.css('display', 'none');
	},

	message: function(msg) {
		console.log("MESSAGE" + msg);
		this.$msg = msg;
		this.$dialog.html(this.$msg)

		this.show();
	}

};