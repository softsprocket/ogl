define (function () { 
	return {
		lowerRightFloatingContentBox: function () { 
			var canvasEl = $("#canvas-element-id");
			var floatingBoxEl = $("#floating-content-box-id");

			var xOffset = canvasEl.width () - floatingBoxEl.width ();
			var yOffset = canvasEl.height () - floatingBoxEl.height ();

			var pos = canvasEl.offset ();
			var paddingStr = floatingBoxEl.css ('padding-right');
			var padding = paddingStr.match (/[1-9][0-9]*/)[0];

			var x = pos.left + xOffset - (2 * padding) - padding;
			var y = pos.top + yOffset - (2 * padding) - padding;


			floatingBoxEl.offset ({ left: x, top: y });
		},
       		
		upperLeftFloatingMenuBox: function () {
			var canvasEl = $("#canvas-element-id");
			var floatingBoxEl = $("#main-menu-id");

			var pos = canvasEl.offset ();
			var paddingStr = floatingBoxEl.css ('padding-left');
			var padding = paddingStr.match (/[1-9][0-9]*/)[0];

			var x = pos.left + 20;
			var y = pos.top + 20;


			floatingBoxEl.offset ({ left: x, top: y });
			
		}
	}

});


