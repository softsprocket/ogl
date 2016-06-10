define (['app/glshader'], function (Shader) {
	return function (ogl, type, url, config) {
		$.ajax (url, {
			dataType: 'text',
			success: function (shaderType, ro, data, status, requestObj) {
				var shader = new Shader (ogl, shaderType);
			       	shader.source (data);
				shader.compile ();
				ro.success (shader);	
			}.bind (this, type, config),
			error: config.error 
		});
	}
});
