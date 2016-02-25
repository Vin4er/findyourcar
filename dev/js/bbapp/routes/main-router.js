"use strict";

(function() {
	/**
	 * Роуты
	 */
	app.Router.Main = Backbone.Router.extend({
		routes: {
			"": "changeRoute",
			":type": "changeRoute",			
		},
		changeRoute: function(page){
			vent.trigger('pageHash', (  page == undefined ) ? 'index' : page )
		}
	});

})();
