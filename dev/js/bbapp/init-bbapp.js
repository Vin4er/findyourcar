"use strict";

(function(){
	// Главный вид
	{	
		Backbone.history.start({ pushState: false })
		// инит вида.
		app.RouterMain = new app.Router.Main;


		app.mainView = new app.View.Main;

		// инит модели
		app.mainModel =  new app.Model.Main;


		
	};

})();