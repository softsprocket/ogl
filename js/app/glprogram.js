define (function () {
	function Program (ogl) {
		this.gl = ogl;
		this.program = this.gl.getProgram ();
	}

	Program.prototype.attachShader  = function (shader) {
		this.gl.attachShader (this.program, shader);
	}

	Program.prototype.link = function () {
		this.gl.linkProgram (this.program);
	}

	Program.prototype.getParameter = function (pname) {
		return this.gl.getProgramParameter (this.program, pname);
	}

	Program.prototype.getInfoLog = function () {
		return this.gl.getProgramInfoLog (this.program);
	}

	return Program;
});
