requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs ([ 'lib/jquery', 'app/glcontext', 'app/shader_request', 'app/reference_counter', 'app/glprogram', 'app/glarraybuffer' ],
		
function ($, glcontext, shader_request, ReferenceCounter, Program, ArrayBuffer) {
	var gl = new glcontext ("canvas-element-id");
	gl.setClearColor (0.3, 0.2, 0.7, 1.0);
	gl.clearColor (); 

	var referenceCounter = new ReferenceCounter ('shaderuploads', function (args) {
		console.log (args);
		var exit = false;
		if (!args.vertexShader.getCompileStatus ()) {
			console.error ('Vertex Shader', args.vertexShader.getInfoLog ());
			exit = true;
		}
		
		if (!args.fragmentShader.getCompileStatus ()) {
			console.error ('Fragment Shader', args.fragmentShader.getInfoLog ());
			exit = true;
		}

		if (exit) {
			return;
		}

		var program = new Program (gl);
		program.attachShader (args.vertexShader);
		program.attachShader (args.fragmentShader);
		program.link ();

		if (!program.getLinkStatus ()) {
			console.error ('Program', program.getInfoLog ());
			return;
		}

		var vertices = new Float32Array([
    			0, 0.5, -0.5, -0.5, 0.5, -0.5
  		]);

		var arrayBuffer = new ArrayBuffer (gl);
		arrayBuffer.data (vertices, gl.context.STATIC_DRAW);
		
		gl.vertexAttribPointer (a_Position, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray (a_Position);

		var a_Position = program.getAttribLocation ('a_Position');
  		if (a_Position < 0) {
    			console.log('Failed to get the storage location of a_Position');
    			return -1;
  		}

	       	var u_Translation = program.getUniformLocation ('u_Translation');

  		if (!u_Translation) {
    			console.log('Failed to get the storage location of u_Translation');
    			return;
  		}

		var Tx = 0.5, Ty = 0.5, Tz = 0.0;
  		gl.uniform4f (u_Translation, Tx, Ty, Tz, 0.0);
		gl.drawArrays (gl.TRIANGLES, 0, vertices.length);

			
	});	

	referenceCounter.incr (2);

	shader_request (gl, gl.context.VERTEX_SHADER, 'shader/setpos.vs', {
		success: function (vshader) {
			var args = referenceCounter.getArgs ();
			args.vertexShader = vshader;
			referenceCounter.decr ();

		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error ('ERROR', textStatus, errorThrown);
		}
	});

	shader_request (gl, gl.context.FRAGMENT_SHADER, 'shader/defcolor.fs', {
		success: function (fshader) {
			var args = referenceCounter.getArgs ();
			args.fragmentShader = fshader;
			referenceCounter.decr ();
		},
		error: function () {
			console.error (arguments);
		}
	});
});


