define (function () {
	function ReferenceCounter (id, callback, args) {
		this.event = new Event (id);
		this.refs = 0;
		this.args = args;
		this.id = id;

		var f = function (callback) {
			this.refs--;
			if (this.refs <= 0) {
				document.removeEventListener (this.id, f);
				callback (this.args);
			}			
		}.bind (this, callback);

		document.addEventListener (this.id, f);
	};

	ReferenceCounter.prototype.incr = function (n) {
		if (n) {
			this.refs += n;
		} else {
			this.refs++;
		}
	};

	ReferenceCounter.prototype.decr = function () {
		document.dispatchEvent (this.event);		
	};

	ReferenceCounter.prototype.getArgs = function () {
		if (!this.args) {
			this.args = {};
		}

		return this.args;
	};

	return ReferenceCounter;
});

