define (function () {
	function Matrix (r, c) {
		this.r = r;
		this.c = c;
		this.s = r * c;
		this.buf = new Float32Array (this.s);
	}

	Matrix.prototype.valueOf = function () {
		return this.buf;
	}
	
	Matrix.prototype.toString = function () {
		var str = '';
		for (var i = 0; i < this.s; ++i) {
			str += this.buf[i];
			if ((i + 1) % this.r == 0) {
			       str += '\n';
			} else {
		 		str += ' ';
			}
		}

		return str;
	}


	Matrix.prototype.setValue = function (r, c, value) {
		if (r >= this.r || c >= this.c) {
			throw "Invalid Row/Column";
		}

		var pos = (r * 4) + c;
		this.buf[pos] = value;
	}

	Matrix.prototype.setValues = function (values) {
		if (values.length != this.r * this.c) {
			throw "Invalid Initializer";
		}

		var pos = 0;
		for (var i = 0; i < this.s; ++i) {
   			this.buf[i] = values[i];
		}	
	}

	Matrix.addMatrix = function (m1, m2) {
		if (m1.r != m2.r && m2.c != m2.c) {
			throw "Mismatched matrice sizes";
		}

		var n = new Matrix (m1.r, m1.c);
		for (var i = 0; i < m1.s; ++i) {
			n.buf[i] = m1.buf[i] + m2.buf[i];
		}

		return n;
	}

	Matrix.subtractMatrix = function (m1, m2) {
		if (m1.r != m2.r && m2.c != m2.c) {
			throw "Mismatched matrice sizes";
		}

		var n = new Matrix (m1.r, m1.c);
		for (var i = 0; i < m1.s; ++i) {
			n.buf[i] = m1.buf[i] - m2.buf[i];
		}

		return n;
	}	

	Matrix.multiplyMatrix = function (m1, m2) {
		if (m1.c != m2.r) {
			throw "Mismatched matrice sizes";
		}

		var n = new Matrix (m1.r, m2.c);
		var pos = 0;
		for (var i = 0; i < m1.r; ++i) {
			for (var j = 0; j < m2.c; ++j) {
				n.buf[pos] = m1.buf[i] * m2.buf[j];
				++pos;
			}
		}

		return n;
	}

	Matrix.multiplyScalar = function (m, s) {
		var n = new Matrix (m.r, m.c);
		for (var i = 0; i < m1.s; ++i) {
			n.buf[i] = m.buf[i] * m2.s;
		}

		return n;
	}

	return Matrix;
});

