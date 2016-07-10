define ([ 'app/glcontext', 'app/shader_request', 'app/reference_counter', 'app/glprogram', 'app/glarraybuffer', 'app/widgets' ],
		
function (GLContext, shader_request, ReferenceCounter, Program, ArrayBuffer, widgets) {

	return function (queryArgs, application) {

		var titleEl = $('#page-title-id');
	       	titleEl.text ('WebGL');
		
		var headingEl = $('#page-heading-id');
	       	headingEl.text ('Sine Waves and WebGL');

		var gl = new GLContext ("canvas-element-id");
		gl.setClearColor (0.0, 0.0, 0.0, 1.0);
		gl.clearColor (); 

		application.getAndSetHtml ("floating-content-box-id", "html/startcontentbox.html", widgets.lowerRightFloatingContentBox);

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
			var lines = [];
			for (var i = 0.0; i < (4*pi2); i += 0.01) {
				lines.push (gl.adjustX (0.0));
				lines.push (0.0);
				lines.push (gl.adjustX (Math.sin (i)));
				lines.push (Math.cos (i));
				points.push (gl.adjustX(i/pi2));
				points.push (Math.sin (i));
				points.push (Math.cos (i));
			}	

			console.log (gl.aspectRatio, points);

			var vertices = new Float32Array (points);
			var angleLines = new Float32Array (lines);

			var a_Position = program.getAttribLocation ('a_Position');
			if (a_Position < 0) {
				console.log('Failed to get the storage location of a_Position');
				return -1;
			}
		
			var sl = [
				gl.adjustX (0.0), 0.0, gl.adjustX (1.0), 0.0
			];	
			var staticLine = new Float32Array (sl);

			var bufferPointsAndEnable = function () {
				var arrayBuffer = new ArrayBuffer (gl);
				arrayBuffer.data (vertices, gl.context.STATIC_DRAW);
				gl.vertexAttribPointer (a_Position, 3, gl.context.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray (a_Position);

				return arrayBuffer;
			}

			var bufferAngleLinesAndEnable = function () {
				var arrayBuffer = new ArrayBuffer (gl);
				arrayBuffer.data (angleLines, gl.context.STATIC_DRAW);
				gl.vertexAttribPointer (a_Position, 2, gl.context.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray (a_Position);

				return arrayBuffer;
			}

			var bufferStaticLineAndEnable = function () {
				var arrayBuffer = new ArrayBuffer (gl);
				arrayBuffer.data (staticLine, gl.context.STATIC_DRAW);
				gl.vertexAttribPointer (a_Position, 2, gl.context.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray (a_Position);

				return arrayBuffer;
			}


			var u_Translation = program.getUniformLocation ('u_Translation');

			if (!u_Translation) {
				console.error ('Failed to get the storage location of u_Translation');
				return;
			}

			console.log (u_Translation);

			var Tx = -1.5, Ty = 0.0, Tz = 0.0;
			gl.uniform4f (u_Translation, Tx, Ty, Tz, 0.75);

			
			if (queryArgs && queryArgs.selected) {
				console.log ('event', queryArgs.selected);
				switch (queryArgs.selected) {
					case 'complexsine':
						var menu = document.getElementById ('floating-menu-id');
						var menuClicked = false;
						menu.addEventListener ('click', function () {
							menuClicked = true;
						});
						var anim = function () { 
							gl.clearColor ();
						       	var arrayBuffer = bufferPointsAndEnable ();	
							gl.drawArrays (gl.context.POINTS, 0, points.length / 3);
							arrayBuffer.unbind ();

							if (!menuClicked) {
								requestAnimationFrame (anim);
							}

						};
						requestAnimationFrame (anim);
						break;
					case 'complexcircle':

						var menu = document.getElementById ('floating-menu-id');
						var menuClicked = false;
						menu.addEventListener ('click', function () {
							menuClicked = true;
						});
						var startIndex = 0;
						var incr = 9;
						var length = points.length / 3;
						var arrayBuffer = bufferPointsAndEnable ();	
						var anim = function () { 
							gl.clearColor ();
							gl.drawArrays (gl.context.POINTS, startIndex, incr / 3);
							if (startIndex + incr >= length) {
								startIndex = 0;
							} else {
								startIndex += incr;
							}

							
							if (!menuClicked) {
								requestAnimationFrame (anim);
							}

							arrayBuffer.unbind ();

						};

						requestAnimationFrame (anim);
						break;
					default:
						console.error ('unknown application selection', queryArgs.selected);
						break;

				}
			} else {
				gl.clearColor ();
			       	var arrayBuffer = bufferPointsAndEnable ();	
				gl.drawArrays (gl.context.POINTS, 0, points.length / 2);
				arrayBuffer.unbind ();
			}
				
		});	

		referenceCounter.incr (2);

		shader_request (gl, gl.context.VERTEX_SHADER, 'shader/settpos.vs', {
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


