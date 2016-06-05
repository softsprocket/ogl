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
		this.gl.conpileShader (this.shader);
	}

	Shader.prototype.attach = function () {
		this.gl.attachShader (this.shader);
	}

	Shader.prototype.detach = function () {
		this.gl.detachShader (this.shader);
	}

	return Shader;
});

