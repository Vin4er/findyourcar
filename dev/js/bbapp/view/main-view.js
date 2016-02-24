"use strict";
(function() {


	// основной вид
	app.View.Main = Backbone.View.extend({

		el: ".flex",

		template_items: window.template('flex-item'),

		template_info: window.template('flex-info'),

		initialize: function() {

			$('.flex-item').remove();

			// Создаем сцену
			app.array = [];

			// конец сортировки
			window.vent.on("event_bouble_start", this.event_bouble_start, this);

			// изменение элементов массива
			window.vent.on("event_bouble_change", this.event_bouble_change, this);

			// конец сортировки
			window.vent.on("event_bouble_end", this.event_bouble_end, this);

		},

		// начало сортировки
		event_bouble_start: function(eventdata) {

			var self = this;

			// запоминаем чтобы вываести
			self.original_array = eventdata.array

			// рендерим список айтемов
			for (item in eventdata.array)
				this.render_array_items(eventdata.array[item], item)

			// выводим на `console ` на странице
			$('.flex-console').append(self.template_info({
				text: ("Массив " + eventdata.array.join(' | ')),
				i: false
			}))

		},

		// изменение элементов массива
		event_bouble_change: function(eventdata) {
			this.changeItems({
				i: eventdata.j[0],
				j: eventdata.j[1],
				delay: eventdata.delay
			})
		},

		// рендерим каждый элемент
		render_array_items: function(text, i) {
			var el = $(this.template_items({
				text: text,
				i: i
			}))

			app.array[i] = el;

			this.$el.append(el);
		},

		// меняем местами.
		changeItems: function(data) {

			if (clone) {
				clone.prev.remove()
				clone.next.remove()
			}
			var self = this,
				// акутальный элементы что надо изменить 
				elems = {
					prev: app.array[data.i].addClass(app.sortClass).css({
						color: 'rgba(255,255,255,.0)' // гасим прозрачность цвета текста
					}),
					next: app.array[data.j].addClass(app.sortClass).css({
						color: 'rgba(255,255,255,.0)' // гасим прозрачность цвета текста
					})
				},
				// создаем клон
				clone = {
					prev: elems.prev.clone(true).addClass( app.cloneClass ).css({
						// присваеваем позицию актуального элемента
						left: elems.prev.position().left,
						top: elems.prev.position().top
					}).animate({
						// анимирую перемещение
						left: elems.next.position().left

					}, function() {

						// после анимации перемещения
						// устанавливаем на актуальном цвет текста
						$('.flex-item').css({
							color: ''
						})

						$(this).fadeOut(400, function() {
							// плавно скрываем и удаляем
							$(this).remove();
						})
					}),
					next: elems.next.clone(true).addClass(app.cloneClass).css({
						// присваеваем позицию актуального элемента
						left: elems.next.position().left,
						top: elems.next.position().top,
					}).animate({
						// анимирую перемещение
						left: elems.prev.position().left

					}, function() {
						// после анимации перемещения
						// устанавливаем на актуальном цвет текста
						$('.flex-item').css({
							color: ''
						})

						$(this).fadeOut(400, function() {
							// плавно скрываем и удаляем
							$(this).remove();
						})
					})
				},

				// функция для изменения позиции актуальных блоков
				changeItems = function() {

					$('.flex-boubles').append(clone.next, clone.prev);

					// идет завязка на Flexbox; меняем позицию  войством `order`
					// и удаяем классы для визуального перемещения
					app.array[data.i] = elems.next.css({
						order: data.i
					}).removeClass(app.sortClass);

					// идет завязка на Flexbox; меняем позицию  войством `order`
					// и удаяем классы для визуального перемещения
					app.array[data.j] = elems.prev.css({
						order: data.j
					}).removeClass(app.sortClass);


					$('.flex-console').append(self.template_info({
						text: " - Поменяли позиции",
						i: data.i,
						j: data.j
					}))

				};

			// меняем
			changeItems();

		},

		// конец сортировки
		event_bouble_end: function(eventdata) {
			var self = this;

			// пишем конечный массив
			$('.flex-console').append(self.template_info({
				text: ("Завершено " + eventdata.array.join(' | ')),
				i: false
			}));
			// завершаем
			$('.flex-item').addClass( app.sortCompletedClass )
		}

	});


})();