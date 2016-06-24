define (function () {
	
	var gen = function (config) {
		var htm = '<ul>';
		for (var i = 0; i < config.length; ++i) {
			var item = config[i];
			
			htm += ('<li>' + item.text);
			
			if (Array.isArray (item.menu)) {
				htm += ' >>';
				htm += gen (item.menu);
				
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
		console.log (el, 'Children', children);
		
		if (children.length > 0) {
			console.log ('add listener to el', el);	
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
			console.log ('recurse', children[i]);	
			addDisplayListeners (children[i], cursor);	
		}
			
	};

	function Menu (el, config) {
		this.element = el;
		this.config = config;

		this.htm = gen (this.config);

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

		addDisplayListeners (el, this.defaultCursor);
	}

	Menu.prototype.html = function () {
		return this.htm;
	}
		

	return Menu;
});
