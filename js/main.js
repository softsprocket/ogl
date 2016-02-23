requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/glcontext' ],
		
function ($, glcontext) {
	var gl = new glcontext ("canvas-element-id");
	gl.setClearColor (0.3, 0.2, 0.7, 1.0);
	gl.clearColor (); 
	console.log (gl);
	
});


