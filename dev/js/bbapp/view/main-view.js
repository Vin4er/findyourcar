"use strict";
(function() {


	// основной вид
	app.View.Main = Backbone.View.extend({

		el: "#page",

		// template_items: window.template('flex-item'),

		// template_info: window.template('flex-info'),

		initialize: function() {
			var self = this;
			this.imgSet();
			this.prallax();

			$(window).resize(function(){
				self.prallax();
				self.imgSet();
			});	
			$(window).scroll(function(){
				self.prallax();
			});
		},

		prallax: function(){
			scrollTop = $(window).scrollTop(),
			wh = $(window).height(),
			ww = $(window).width();
			if(ww>=1024){
				$('.prallax').each(function(){
					var prallaxItem  = $(this);
					var sh = prallaxItem.offset().top - scrollTop
					if( (prallaxItem.offset().top - 10) < (scrollTop + wh) && (prallaxItem.offset().top + prallaxItem.height() ) > (scrollTop )  ){
						sh=sh*.2
						$(this).css({
							"-moz-transform": 	"translateY("+ sh +"px)",
							"-ms-transform": 	"translateY("+ sh +"px)",
							"-webkit-transform":"translateY("+ sh +"px)",
							"-o-transform": 	"translateY("+ sh +"px)",
							"transform": 		"translateY("+ sh +"px)"
						})
					}
				});
			}else{
				$('.prallax').find('img').css({
					"-moz-transform": 	"",
					"-ms-transform": 	"",
					"-webkit-transform":"",
					"-o-transform": 	"",
					"transform": 		""
				})
			}
			

		},

		// конец сортировки
		imgSet: function() {
			var dpi = window.devicePixelRatio = window.devicePixelRatio || Math.round(window.screen.availWidth / document.documentElement.clientWidth);
			var dpi_name = dpi>1? ( dpi == 2 ? "@2x" : "@2x" ) :"";
			var ww = $(window).width();
			var type = ""

			if ( ww >= 1440){
				type = "1440"
			}else if ( ww < 1440 &&  ww >= 1024 ){
				type = "1024-1440"
			}else if ( ww < 1024 &&  ww > 320 ){
				type = "768-1024"
			} else  if ( ww <= 320  ){
				type = "320-768"
			}


			$("[data-imgset]").each(function(){
				var filename =  $(this).data('path') +  $(this).data(type) + dpi_name + "." + $(this).data('ext');
				if( !$(this).parent().hasClass('prallax')){
					this.src = filename
				}else{
					$(this).parent().css({
						'background-image' : 'url("'+filename+'")',
						'background-size' : 'cover'
					})
				}
			});




		}

	});


})();