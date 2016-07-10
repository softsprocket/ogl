define (function () {
	
	var gen = function (config, z) {
		var htm = '<ul>';
		for (var i = 0; i < config.length; ++i) {
			var item = config[i];
			
			if (item.id) {	
				htm += ('<li id="' + item.id + '" style="z-index:' + z +';">' + item.text);
			} else {
				htm += ('<li' + ' style="z-index:' + z + ';">' + item.text);
			}

			if (Array.isArray (item.menu)) {
				htm += ' >>';
				htm += gen (item.menu, z + 1);
				
			}
			htm += '</li>';
		}

		htm += '</ul>';
		return htm;
	};

	var displayList = function (el, type) {
		var elements = el.children;
		for (var i = 0; i < elements.length; ++i) {
	       		elements[i].style.display = type;
			var children = elements[i].children;
			for (var j = 0; j < children.length; ++j) {
 				children[j].style.display = type;
				
			}
		}			
	};

	var addDisplayListeners = function (el, cursor) {
		var children = el.children;
		
		if (children.length > 0) {
			el.addEventListener ('mouseover', function (ev) {
				ev.srcElement.style.cursor = 'pointer';
				displayList (el, 'block');
			});			
			el.addEventListener ('mouseout', function (ev) {
				ev.srcElement.style.cursor = cursor;
				displayList (el, 'none');
			});
		}

		for (var i = 0; i < children.length; ++i) {
			addDisplayListeners (children[i], cursor);	
		}
			
	};

	var setListeners = function (config) {
		for (var i = 0; i < config.length; ++i) {
			var item = config[i];
			
			if (item.listeners) {	
				var el = document.getElementById (item.id);
				for (var key in item.listeners) {
					if (item.listeners.hasOwnProperty (key)) {
						console.log (el, key);
						el.addEventListener (key, item.listeners[key]);
					}
				}
			}
			if (item.menu) {
				setListeners (item.menu);
			}
		}
	};

	function Menu (el, config) {
		this.element = el;
		this.config = config;

		this.htm = gen (this.config, 1);

		el.innerHTML = this.htm;

		this.defaultCursor = el.parentElement.style.cursor;

		el.parentElement.addEventListener ('mouseover', function (ev) {
			ev.srcElement.style.cursor = 'pointer';
			displayList (el, 'block');

		}.bind (this));

		el.parentElement.addEventListener ('mouseout', function (ev) {
			ev.srcElement.style.cursor = this.defaultCursor;
			displayList (el, 'none');
		}.bind (this));

		addDisplayListeners (el, this.defaultCursor, 0);
		setListeners (this.config);
	}

	Menu.prototype.html = function () {
		return this.htm;
	}
		

	return Menu;
});
