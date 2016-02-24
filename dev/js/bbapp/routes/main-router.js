"use strict";

(function() {

	app.Router.Main = Backbone.Router.extend({

		routes: {
			"": "changeRoute",    // #help
			":type": "changeRoute",    // #help
			
		},

		changeRoute: function(page){
			if(  page == undefined ){
				console.log('главная')
			}
		}

	});

})();
