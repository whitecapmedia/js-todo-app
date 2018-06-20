# js-todo-app
JavaScript based MVC Todo App

Overview
Okay, so what is going on in each file!

Index.html - Not much new here. Including the jQuery CDN, setting up some basic HTML, and loading the JavaScript files that we will be using in this project. Wow! That was easy!

EventDispatcher.js - This is a class with two methods, attach() and notify(). The attach() method accepts a function as a parameter. You can call attach() as many times as you want, and the function you pass can contain whatever code inside you want. Once you call the notify method on that Event object, each function you attached to that Event will be ran.

TaskModel.js - This class has some basic methods for adding and deleting actual task objects from the tasks array. Setting up three Event objects inside the constructor function, allows the model to call the notify() method on each event object after a task has been added, marked as complete, or deleted. This, in turn, passes on the responsibility to the view to re-render the HTML to show the updated list of tasks. The main thing to recognize is that the Model passes off responsibility to the View. Model -> View.

TaskView.js - This is the largest file in this project and could have been abstracted into multiple views. But for simplicity’s sake, I put everything into one class. The constructor function sets up five Event objects. This allows the view to call the notify() method on each Event object, thus passing the responsibility onto the controller. Next, you see that the constructor calls the init() method. This init method uses method chaining to set up the backbone of this class.

createChildren() - Caches the $('.js-container') DOM element in a this.$container variable, then refers to that variable for each element thereafter it needs to find(). This is merely a performance thing, and allows jQuery to pull any elements from the variable instead of requerying/crawling the DOM. Notice the use of return this. This allows for the method chaining inside the previous init() call.

setupHandlers() - This part can be a little tricky to wrap your head around for the first time. This method is setting up the event handlers and changing the scope of the this keyword inside that handler. Basically, whenever you run into a JavaScript event handler and plan to use the ever so famous this keyword inside that callback function, then this is going to reference the actual object or element the event took place on. This is not desirable in many cases, as in the MVC case when you want this to reference the actual class itself. Here, you are calling the bind(this) method on a JavaScript callback function. This changes the this keyword scope to point to that of the class instead of the object or element that initialized that event. Mozilla Foundation has a good tutorial explaining how to use scope bound functions.

enable() - This method sets up any DOM events and attaches any functions to the Event Dispatcher that were created by the Model. Look at this line of code:

this.model.addTaskEvent.attach(this.addTaskHandler);

What is actually happening here? When the model calls addTaskEvent.notify() your view will run the this.addTaskHandler() method. Sweet! You're actually seeing how the EventDispatcher works! This allows your classes to talk to each other while also staying decoupled. The addTaskHandler() method then calls the show() method which in turn calls the buildList() method and re-renders the HTML list.

So what should you take from all of this? Basically, once the model passes responsibility to the view, the view then re-renders the HTML to show the most up-to-date task objects. Also, whenever a user manipulates the view through a DOM event the view then passes off responsibility to the controller. The view does not work directly with the model.

TaskController.js - This class sits between the view and the model and acts as the glue that binds them together. It allows for easy decoupling of your model and view. Whenever the view uses the EventDispatcher, the controller will be there to listen and then update the model. Besides that, all the method declarations inside this file should look relatively similar to the View and Model.

App.js - This file is responsible for kicking off the app. An instance of the Model-View-Controller gets created here.
