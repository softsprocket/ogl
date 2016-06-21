define (function () {
	
	var gen = function (config) {
		var htm = '<ul>';
		for (var i = 0; i < config.length; ++i) {
			var item = config[i];
			
			htm += ('<li>' + item.text + '</li>');
			
			if (Array.isArray (item.menu)) {
				htm += gen (item.menu);
				
			}
		}

		htm += '</ul>';
		return htm;
	};

	function Menu (el, config) {
		this.element = el;
		this.config = config;

		this.htm = gen (this.config);

		el.innerHTML = this.htm;

		this.defaultCursor = el.parentElement.style.cursor;

		el.parentElement.addEventListener ('mouseover', function (ev) {
			console.log (ev.srcElement.style);
			ev.srcElement.style.cursor = 'pointer';

		});

		el.parentElement.addEventListener ('mouseout', function (ev) {
			console.log (ev.srcElement.style);
			ev.srcElement.style.cursor = this.defaultCursor;

		});
	}

	Menu.prototype.html = function () {
		return this.htm;
	}
		

	return Menu;
});
