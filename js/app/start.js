define ([ 'app/glcontext', 'app/shader_request', 'app/reference_counter', 'app/glprogram', 'app/glarraybuffer' ],
		
function (GLContext, shader_request, ReferenceCounter, Program, ArrayBuffer) {
	return function (app) {

		var titleEl = $('#page-title-id');
	       	titleEl.text ('Sine Waves and WebGL');

		var gl = new GLContext ("canvas-element-id");
		gl.setClearColor (0.0, 0.0, 0.0, 1.0);
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

			console.log ('Shaders compiled', args.vertexShader, args.fragmentShader);

			var program = new Program (gl);
			program.attachShader (args.vertexShader);
			program.attachShader (args.fragmentShader);
			program.link ();

			if (!program.getLinkStatus ()) {
				console.error ('Program', program.getInfoLog ());
				return;
			}

			console.log ('Program attached and linked', program);

			gl.useProgram (program);


			var pi2 = 2 * Math.PI;

			var points = [];
			for (var i = 0.0; i < pi2; i += 0.01) {
				points.push (gl.adjustX (Math.sin (i)));
				points.push (Math.cos (i));
			}	

			console.log (gl.aspectRatio, points);

			var vertices = new Float32Array (points);

			var arrayBuffer = new ArrayBuffer (gl);
			arrayBuffer.data (vertices, gl.context.STATIC_DRAW);
			
			console.log ('data buffered', arrayBuffer);

			var a_Position = program.getAttribLocation ('a_Position');
			if (a_Position < 0) {
				console.log('Failed to get the storage location of a_Position');
				return -1;
			}
			
			gl.vertexAttribPointer (a_Position, 2, gl.context.FLOAT, false, 8, 0);
			gl.enableVertexAttribArray (a_Position);



			var u_Translation = program.getUniformLocation ('u_Translation');

			if (!u_Translation) {
				console.log('Failed to get the storage location of u_Translation');
				return;
			}

			console.log (u_Translation);

			var Tx = 0.0, Ty = 0.0, Tz = 0.0;
			gl.uniform4f (u_Translation, Tx, Ty, Tz, 0.75);


			gl.clearColor (); 
			gl.drawArrays (gl.context.POINTS, 0, points.length / 2);

				
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
		
	}
});

