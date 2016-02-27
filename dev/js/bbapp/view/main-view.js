"use strict";
(function() {


	// основной вид
	app.View.Main = Backbone.View.extend({



		el: "#page",


		activePage: false, 
		activePageHover: false, 
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
			this.imgSet().prallax().headerfix().fancy().masks().faders();
			setTimeout(function(){
				self.scroller();
			}, 1000)
			self.slidez();

			vent.on('pageHash', function(page, event){
				self.scroller(page)
			});

			$(window).resize(function(){
				self.prallax().imgSet();
			});	
			$(window).scroll(function(){
				self.headerfix().prallax()
			});

			// ОБРАБОТЧИК  покидания окна мышкой
			if(  $(window).width() > 1024 ){

				$(document).on('mouseenter', function(event) {
					self.activePageHover = true;
				});
				$(document).on('mouseleave', function(event) {
					if( !self.activePage && self.activePageHover){
						self.activePage = true;
						$('[href="#comeback"]').click();
					}
				});
			}
		},

		faders: function(){
	



			
			$('.block-3-item-num span').each(function(){
				(new CountUp($(this)[0], 0, $(this).text(), 0, 2, { useEasing : true,   separator : ' '} )).start();
			})
			$(window).scroll(function(){
				
				$('.scr-scr-scr-in-white-nike:not(.start-anim)').each(function(){
					var scrollTop = $(window).scrollTop(),
						wh = $(window).height(),
					prallaxItem = $(this).addClass('start-anim');
					if( (prallaxItem.offset().top - 10) < (scrollTop + wh) && (prallaxItem.offset().top + prallaxItem.height() ) > (scrollTop )  ){
						prallaxItem.find('.h1').addClass('animated fadeIn')
					}	
				})

			});


			return this;
		},

		slidez: function(){
			var self = this,
				fInit = function(){
					var perView = $(window).width() >= 1440 ? 5: (  $(window).width() < 1024 ? (  $(window).width()< 768 ? 1: 3 ) : 3 );
					
					perView = (perView  == 5  && $('.swiper-slide').length < 5) ? $('.swiper-slide').length : ((perView == 3 && $('.swiper-slide').length < 3 ) ? $('.swiper-slide').length  : perView)

					self.slidezItem = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        slidesPerView: perView,
				        loop: true,
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
				    });
				};
				
			fInit();
		    $(window).resize(function(){
				if(self.slidezItem) {
					self.slidezItem.destroy(true, false);
					self.slidezItem = undefined;
					fInit();
				}
			});	
		},

		fancy: function(){
			$('.fancybox').fancybox();
			$(document).on('click', '.close-fancy', function(e){
				e.preventDefault();
				$.fancybox.close();
			});
			return this;
		},

		masks: function(){
			var im = new Inputmask("+7 (999) 999 9999");
			im.mask( $('.phones')[0] )
			// im.mask('input.phones');
			return this;
		},

		/*
		 * скролл хедера
		 *
		 * @event - {object of event}
		 **/
		headerfix: function(){
			var
				scrollTop = $(window).scrollTop(),
				b2TOP = $('.block-2').offset().top - 100;
			$('.header')[(scrollTop>b2TOP)?'addClass':'removeClass']('fixed');
			
			return this;
		},

		/*
		 * запрещаем действия по дефу
		 *
		 * @event - {object of event}
		 **/
		preventDefault: function(event){
			event.preventDefault();
			if (event.currentTarget.hash.substr(1) == "lead" || event.currentTarget.hash.substr(1) ==  "linkprivacy"){
				return false
			}
			if( location.hash.substr(1) == event.currentTarget.hash.substr(1) ){

				this.scroller(location.hash.substr(1))
			}else{
				app.RouterMain.navigate(event.currentTarget.hash.substr(1) , {trigger: true, replace: false});
			}

			return this;
		},
			


		/*
		 * Скроллим до нужного блока
		 *
		 * @page - {string} - строка из события роута
		 **/
		scroller: function(page){
			var loc = window.location.hash.substr(1);
			page = page ? page : (loc?loc:"index")
		

			$('html, body').animate({"scrollTop" :  $("[data-id="+page+"]").offset().top - 60});
			$("header .active").removeClass("active");
			$("[href=#"+page+"]").addClass('active');
			var timer,
				f = function(){
					var 
						scrollTop = $(window).scrollTop(),
						wh = $(window).height(),
						ww = $(window).width();

					$("[data-id]").each(function(){
						var 
							// текущий элемент
							item  = $(this);
						if(scrollTop == 0){
							$("header .active").removeClass("active");
							$("[href=#index]").addClass('active');
						}else{
							if(  (item.offset().top ) < (scrollTop + wh/2) &&  (item.offset().top) > (scrollTop - wh/2 )){
								$("header .active").removeClass("active");
								$("[href=#"+$(this).data('id')+"]").addClass('active');
								$('.underline').css({
									"width": $(".header-table [href=#"+item.data('id')+"]").width()+2,
									"left": $(".header-table [href=#"+item.data('id')+"]").position().left,
									"top": 28,
								});
								if(timer)clearTimeout(timer);
								timer = setTimeout(function(){
									app.RouterMain.navigate(item.data('id') , {trigger: false, replace: false});
								}, 200);

							}
						}
					})
			}

			f();
			if($(window).width()>=1024){
				$(window).scroll(function(){ 
					if($(window).width()>=1024){
						f();
					}
				 });
			};

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
			}else if ( ww < 1440 &&  ww > 1024 ){
				type = "1024-1440";
			}else if ( ww <= 1024 &&  ww > 320 ){
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