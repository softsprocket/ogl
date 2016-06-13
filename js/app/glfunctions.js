define (function () {
	return function (prototype) {
		prototype.resize = function () {
			var displayWidth  = this.canvas.clientWidth;
			var displayHeight = this.canvas.clientHeight;
				
			this.aspectRatio = displayHeight / displayWidth;

			if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight) {                        

				this.canvas.width  = displayWidth;
				this.canvas.height = displayHeight;
				this.viewport (0, 0, this.canvas.width, this.canvas.height);

			}
		};

		prototype.adjustX = function (x) {
			return x * this.aspectRatio;
		}

		prototype.setClearColor = function (red, green, blue, alpha) {
			this.context.clearColor(red, green, blue, alpha);
		};

		prototype.clear = function (bitmask) {
			this.context.clear (bitmask);
		};

		prototype.clearColor = function () {
			this.context.clear (this.context.COLOR_BUFFER_BIT);
		}

		prototype.drawArrays = function (mode, first, count) {
			this.context.drawArrays (mode, first, count);
		}

		prototype.drawElements = function (mode, count, type, offset) {
			this.context.drawElements (mode, count, type, offset);
		}

		prototype.uniform4f  = function (location, v0, v1, v2, v3) {
			this.context.uniform4f (location, v0, v1, v2, v3);
		}

  		prototype.vertexAttribPointer = function (index, size, type, normalized, stride, offset) {
  			this.context.vertexAttribPointer (index, size, type, normalized, stride, offset);
		}

		prototype.enableVertexAttribArray = function (index) {
			this.context.enableVertexAttribArray (index);
		}

		prototype.useProgram = function  (program) {
		       this.context.useProgram (program.program);
		}	       

	};
});

