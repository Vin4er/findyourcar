"use strict";

(function(){
	// Главный вид
	{	
		// инит вида.
		app.RouterMain = new app.Router.Main;


		app.mainView = new app.View.Main;

		// инит модели
		app.mainModel =  new app.Model.Main;

		Backbone.history.start()
		
	};

})();