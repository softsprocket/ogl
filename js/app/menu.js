define (function () {
	
	var gen = function (config, endtag, htm) {
		if (!endtag) {
			htm = '<ul>';
			htm += gen (config, '</ul>', htm);
		} else {

			for (var i = 0; i < config.length; ++i) {
				var item = config[i];
				
				htm += ('<li>' + item.text);
				
				if (Array.isArray (item.menu)) {
					htm += gen (item.menu, '</li>', htm);
					
				} else {
					htm += gen ([], '</li>', htm);
				}	
				
			}
		}

		if (endtag) {
			htm += endtag;
		}

		return htm;
	};

	function Menu (el, config) {
		this.element = el;
		this.config = config;

		this.htm = gen (this.config);
	}

	Menu.prototype.html = function () {
		return this.htm;
	}
		

	return Menu;
});
