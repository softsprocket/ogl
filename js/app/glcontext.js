define (['app/glfunctions'], function (glfunctions) {
	function ogl (id) {
		this.context = null;
		this.errors = [];

		var canvas = document.getElementById (id);
		if (canvas == null) {
			throw new Error ("Canvas id " + id + " not found");
		}

		var names = [
			"webgl",
			"experimental-webgl",
			"webkit-3d",
			"moz-webgl"
		];

		for (var i = 0; i < names.length; ++i) {
			try {
				this.context = canvas.getContext (names[i]);
			} catch(e) { console.error (e); }

			if (this.context) break;
		}

		if (this.context == null){
			throw new Error ("WebGL is not available");
		} else {
			this.canvas = this.context.canvas;
			this.viewport = this.context.viewport;
			this.resize ();
		}

	}

	glfunctions (ogl.prototype);

	return ogl;
});

