requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/application', 'app/start' ],
		
function ($, Application, start) {

	var app = new Application ();
	app.query (function (args) {
		switch (args[app]) {
			case 'start': 
				start (args, app);	
				break;

			default:
				start (args, app);
				break;

		}

	});

});


