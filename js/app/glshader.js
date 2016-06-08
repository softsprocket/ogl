define (function () {
	function Shader (ogl, type) {
		this.gl = ogl.context;
		this.shader = this.gl.createShader (type);
	}

	Shader.prototype.source = function (str) {
		this.gl.shaderSource (this.shader, str);
	}

	Shader.prototype.getSource = function () {
		return this.gl.getSource (this.shader);
	}

	Shader.prototype.compile = function () {
		this.gl.compileShader (this.shader);
	}

	Shader.prototype.getCompileStatus = function () { 
		return this.gl.getShaderParameter (this.shader, this.gl.COMPILE_STATUS);
	}

	Shader.prototype.getInfoLog = function () {
    		return this.gl.getShaderInfoLog (this.shader);
	}

	return Shader;
});

