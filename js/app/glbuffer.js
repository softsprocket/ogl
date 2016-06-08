define (function () {
	function Buffer (ogl, target) {
		this.gl = ogl.context;
		this.target = target;
		this.buffer = this.gl.createBuffer ();
		this.bind ();
	}

	Buffer.prototype.bind = function () {
		this.gl.bindBuffer (this.target, this.buffer);
	}

	Buffer.prototype.delete = function () {
		this.gl.deleteBuffer (this.buffer);
	}

	Buffer.prototype.is = function () {
		return this.gl.isBuffer (this.buffer);
	}

	Buffer.prototype.data = function (data, type) {
		this.gl.bufferData (this.target, data, type);
	}

	Buffer.prototype.size = function (size, type) {
		this.gl.bufferData (this.target, size, type);
	}



	return Buffer;
});
