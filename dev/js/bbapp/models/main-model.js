"use strict";

(function() {

	app.Model.Main = Backbone.Model.extend({

		defaults: {
			array: []
		},

		initialize: function() {

			// генерируем, и сразу начниаем сортировку
			this.generate().boublingStart();

			return this;
		},

		// генерация 10 случайных чисел
		generate: function() {

			for (var i = 1; i <= 10; i++) this.get('array').push(Math.floor(Math.random() * 100));

			return this;
		},

		// сортировка
		boublingStart: function() {

			var self = this,
				i, j,                   // переменные для циклов 
				m = this.get('array'),  // берем массив из модели
				count = m.length - 1;   // количетсво элементов (быстрее работает)


			// Стартуем.!
			window.vent.trigger("event_bouble_start", {
				array: m
			})

			// зажержка для отправки событий
			var delay = 0;

			// метод пузырька
			for (var i = 0; i < count; i++) {
				for (var j = 0; j < (count - i); j++) {
					//  сравниваем соседние элементы последовательно
					if (m[j] > m[j + 1]) {

						var max = m[j],
							j_inc = j + 1;

						// сетчик итераций, для задержки
						delay++;

						// Сортируем, если левый больше правого
						m[j] = m[j_inc];
						m[j_inc] = max;

						// обрабатываем
						self.sendEvent({
							j: [j, j_inc],
							array: m,
							delay: delay * app.delay
						});
					}
				}
			}

			// Конец сортировки.
			setTimeout(function() {
				window.vent.trigger("event_bouble_end", {
					array: m
				});
			}, (delay + 2) * app.delay); // зажержка для анимации


		},
		sendEvent: function(data, event) {
			var bouble_change = function() {
				window.vent.trigger("event_bouble_change", data);
			}
			setTimeout(bouble_change, data.delay);
		},


	});

})();