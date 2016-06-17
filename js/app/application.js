define (function () {
	function Application () {
		this.locationObj = window.location;
	}

	Application.prototype.query = function (callback) {
		var args = this.searchToDict ();
		callback (args);
	}


	Application.prototype.searchToDict = function () {
		var search = this.locationObj.search.substring (1);

		var elements = search.split ('&');

		var dict = {}
		for (var i = 0; i < elements.length; ++i) {
			var kv = elements[i].split ('=');
			dict[kv[0]] = kv[1];
		}	

		return dict;
	}

	Application.prototype.getAndSetHtml = function (id, url) {
		$.ajax (url, {
                        dataType: 'html',
                        success: function (data) {
				$(id).html (data);	
                        },
                        error: function () {
				console.error (arguments);
			} 
                });
	
	}

	return Application;

});
