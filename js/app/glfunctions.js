define (function () {
	return function (prototype) {
		prototype.resize = function () {
			var displayWidth  = this.canvas.clientWidth;
			var displayHeight = this.canvas.clientHeight;

			if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight) {                        

				this.canvas.width  = displayWidth;
				this.canvas.height = displayHeight;
				this.viewport (0, 0, this.canvas.width, this.canvas.height);
			}
		};

		prototype.setClearColor = function (red, green, blue, alpha) {
			this.context.clearColor(red, green, blue, alpha);
		};

		prototype.clear = function (bitmask) {
			this.context.clear (bitmask);
		};

		prototype.clearColor = function () {
			this.context.clear (this.context.COLOR_BUFFER_BIT);
		};	
	};
});

