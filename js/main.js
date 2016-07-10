requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/application', 'app/start', 'app/widgets', 'app/menu', 'app/sinusoid' ],
		
function ($, Application, start, widgets, Menu, sinusoid) {

	var app = new Application ();
	app.query (function (args) {
		var menuItems = [
			{
				text: 'Sine, Cosine Circle',
				enabled: true,
				menu: [
					{
						text: 'Points',
						enabled: true,
						id: 'sinepoints_menu_el',
						listeners: {
							click: function (ev) {
								start ({ selected: 'sinepoints' }, app);
							}
						}
					},
					{
						text: 'Points Animated',
						enabled: true,
						id: 'sinepointsanimated_menu_el',
						listeners: {
							click: function (ev) {
								start ({ selected: 'sinepointsanimated' }, app);
							}
						}
					},
					{
						text: 'Angles Revealed',
						enabled: true,
						id: 'sinepointsangles_menu_el',
						listeners: {
							click: function (ev) {
								start ({ selected: 'sinepointsangle' }, app);
							}
						}
					}		
				]
				
			},
			{
				text: 'Complex Sinusoids',
				enabled: true,
				menu: [
					{
						text: '3D Sine Wave',
						enabled: true,
						id: 'complexsine_menu_el',
						listeners: {
							click: function () {
								console.log (arguments);
								sinusoid ({ selected: 'complexsine' }, app); 
							}
						}

					},
					{
						text: 'Circle In Time',
						enabled: true,
						id: 'complexcircle_menu_el',
						listeners: {
							click: function () {
								console.log (arguments);
								sinusoid ({ selected: 'complexcircle' }, app); 
							}
						}
					}
				]
			}

		];


		var menu = new Menu (document.getElementById ('floating-menu-id'), menuItems);
		widgets.upperLeftFloatingMenuBox ();
		switch (args[app]) {
			case 'start': 
				start (args, app);	
				break;
			case 'sinusoid':
				sinusoid (args, app);
			default:
				start (args, app);
				break;

		}

	});

});


