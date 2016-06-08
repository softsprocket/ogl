define (function () {
	function Program (ogl) {
		this.gl = ogl.context;
		this.program = this.gl.createProgram ();
	}

	Program.prototype.attachShader  = function (shader) {
		this.gl.attachShader (this.program, shader.shader);
	}
	
	Program.prototype.detachShader  = function (shader) {
		this.gl.detachShader (this.program, shader.shader);
	}

	Program.prototype.link = function () {
		this.gl.linkProgram (this.program);
	}

	Program.prototype.getLinkStatus = function () {
		return this.gl.getProgramParameter (this.program, this.gl.LINK_STATUS);
	}

	Program.prototype.getInfoLog = function () {
		return this.gl.getProgramInfoLog (this.program);
	}

	Program.prototype.getUniformLocation = function (location) {
		return this.gl.getUniformLocation (this.program, 'u_Translation');
	}

	Program.prototype.getAttribLocation = function (location) {
		return this.gl.getAttribLocation (this.program, location);
	}

	return Program;
});
