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
			console.log(page)
			if (page == "lead" || page ==  "linkprivacy"){
				return false
			}else{
				vent.trigger('pageHash', (  page == undefined ) ? 'index' : page )
			}
		}
	});

})();
