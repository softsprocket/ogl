define (['app/glbuffer'], function (Buffer) {
	function ArrayBuffer (ogl) {
		Buffer.call (this, ogl, ogl.context.ARRAY_BUFFER); 
	}

	ArrayBuffer.prototype = Object.create (Buffer.prototype);

	ArrayBuffer.prototype.constructor = ArrayBuffer;

	return ArrayBuffer;

});
