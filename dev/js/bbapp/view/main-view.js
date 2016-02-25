"use strict";
(function() {


	// основной вид
	app.View.Main = Backbone.View.extend({



		el: "#page",



		events: {
			// клик по ссылке, действие которой надо отменить
			"click .scroll-link": "preventDefault"
		},



		/*
		 * инит приложэухи
		 *
		 **/
		initialize: function() {
			var self = this;
			this.imgSet().prallax();


			vent.on('pageHash', function(page, event){
				self.scroller(page)
			});

			$(window).resize(function(){
				self.prallax().imgSet();
			});	
			$(window).scroll(function(){
				self.prallax();
			});
		},



		/*
		 * запрещаем действия по дефу
		 *
		 * @event - {object of event}
		 **/
		preventDefault: function(event){
			event.preventDefault();
			app.RouterMain.navigate(event.currentTarget.hash.substr(1) , {trigger: true, replace: false});

			return this;
		},
			


		/*
		 * Скроллим до нужного блока
		 *
		 * @page - {string} - строка из события роута
		 **/
		scroller: function(page){
			$('html, body').animate({"scrollTop" :  $("[data-id="+page+"]").offset().top - 60});
			return this;
		},




		/*
		 * Праласк
		 *
		 **/
		prallax: function(){
			var
				scrollTop = $(window).scrollTop(),
				wh = $(window).height(),
				ww = $(window).width(),
				// возвращает норм транслейт
				translate3d = function(param){
					return "translate3d(0px,"+ param +"px, 0px)";
				},
				translate3dCSS = function(param){
					return {
						"-moz-transform": 	param,
						"-ms-transform": 	param,
						"-webkit-transform":param,
						"-o-transform": 	param,
						"transform": 		param
					}
				};
			// если меньше 1024, то отключаем пралаксину
			if(ww>=1024){
				$('.prallax').each(function(){
					var 
						// текущий элемент
						prallaxItem  = $(this),
						// коэффициент для пралакса
						sh = prallaxItem.offset().top - scrollTop;

					// если блок попадает во вьюпорт - то юзаем пралаксину
					if( (prallaxItem.offset().top - 10) < (scrollTop + wh) && (prallaxItem.offset().top + prallaxItem.height() ) > (scrollTop )  ){
						
						sh=sh*.2;
						
						$(this).css( translate3dCSS( translate3d(sh) ) );
					}
				});
			}else{
				// для мобилок - отключаем пралакс
				$('.prallax').find('img').css( translate3dCSS( translate3d("") ) );
			};
			
			return this;

		},



		/*
		 * устанавливаем картиночки

		 * @ATTRIBUTES FOR HTML
		 * { data-imgset="true" }                            - означает что картинку надо менять
		 * { data-path="/assets/img/" }                      - путь до картинки
		 * { data-1024-1440="Desktop (1024-1440)/MacBook" }  - название картинки и папка с нужным разрешением
		 * { data-1440="Desktop HD (1440+)/MacBook" }        - название картинки и папка с нужным разрешением
		 * { data-768-1024="Tablet (768-1024)/MacBook" }     - название картинки и папка с нужным разрешением
		 * { data-320-768="Mobile (320-768)/MacBook" }       - название картинки и папка с нужным разрешением
		 * { data-ext="png" }                                - разрешение картинки
		 *
		 **/
		imgSet: function() {
			var 
				// Определеям dpi
				dpi = window.devicePixelRatio = window.devicePixelRatio || Math.round(window.screen.availWidth / document.documentElement.clientWidth),
				dpi_name = dpi>1? ( dpi == 2 ? "@2x" : "@2x" ) :"",
				// ширина окна
				ww = $(window).outerWidth(),
				// тип (для нужной папки)
				type = "";

			if ( ww >= 1440){
				type = "1440";
			}else if ( ww < 1440 &&  ww >= 1024 ){
				type = "1024-1440";
			}else if ( ww < 1024 &&  ww > 320 ){
				type = "768-1024";
			} else  if ( ww <= 320  ){
				type = "320-768";
			};

			// идем по картинкм. если див - то бг, если имг - то src
			$("[data-imgset]").each(function(){
				var self = $(this),
					filename =  self.data('path') +  self.data(type) + dpi_name + "." + self.data('ext');

				if( this.tagName.toUpperCase() == "IMG"){
					this.src = filename
				}else{
					self.css({
						'background-image' : 'url("'+filename+'")',
						'background-size' : 'cover'
					})
				}
			});

			return this;

		}

	});


})();