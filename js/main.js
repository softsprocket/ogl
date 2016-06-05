requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/glcontext', 'app/shader_request', 'app/reference_counter' ],
		
function ($, glcontext, shader_request, ReferenceCounter) {
	var gl = new glcontext ("canvas-element-id");
	gl.setClearColor (0.3, 0.2, 0.7, 1.0);
	gl.clearColor (); 

	var referenceCounter = new ReferenceCounter ('shaderuploads', function (args) {
		console.log (args);
	});	

	referenceCounter.incr (2);

	shader_request (gl, gl.context.VERTEX_SHADER, 'shader/setpos.vs', {
		success: function (vshader) {
			var args = referenceCounter.getArgs ();
			args.vertexShader = vshader;
			referenceCounter.decr ();

			shader_request (gl, gl.context.FRAGMENT_SHADER, 'shader/defcolor.fs', {
				success: function (fshader) {
					var args = referenceCounter.getArgs ();
					args.fragmentShader = fshader;
					referenceCounter.decr ();
				},
				error: function () {
					console.error (arguments);
				}
			})

		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error ('ERROR', textStatus, errorThrown);
		}
	});
});


