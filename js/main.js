requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/application', 'app/start', 'app/widgets', 'app/menu' ],
		
function ($, Application, start, widgets, Menu) {

	var menuItems = [
		{
			text: 'Sine, Cosine Circle',
			enabled: true,
	  		menu: [
				{
					text: 'Points',
					enabled: true
				},
	  			{
		  			text: 'Points Animated',
					enabled: true
				},
	  			{
					text: 'Angles Revealed',
					enabled: true
				}		
			]
			
		},
		{
			text: 'Complex Sinusoids',
			enabled: true,
			menu: [
				{
					text: '3D Sine Wave',
					enabled: true

				},
				{
					text: 'Circle In Time',
					enabled: true
				}
			]
		}

	];


	var menu = new Menu (document.getElementById ('floating-menu-id'), menuItems);

	console.log (menu.html ());

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

	widgets.upperLeftFloatingMenuBox ();
});


