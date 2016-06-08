define (['app/glshader'], function (glshader) {
	return function (ogl, type, url, config) {
		$.ajax (url, {
			dataType: 'text',
			success: function (data, status, requestObj) {
				console.log (data);
				var shader = new glshader (ogl, type);
			       	shader.source (data);
				shader.compile ();
				config.success (shader);	
			},
			error: config.error 
		});
	}
});
