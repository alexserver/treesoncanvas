//the global anonymous function to work with.
(function($){
	function randHex() {
		var num = Math.round(Math.random() * 255).toString(16);
		if (num.length == 1)
			num = "0"+num;
		return num;
	}

	$(function() {
		if (Modernizr.canvas === true)
			$("#canvas-warning").hide();

		// Convenience
		$canvas = $("#canvas");
		canvas = $canvas[0];
		context = canvas.getContext("2d");

		// Dimensions
		var width = $canvas.width();
		var height = $canvas.height();

		// Set actual canvas size to match css
		$canvas.attr("width", width);
		$canvas.attr("height", height);

		// Information
		$("#info-size").text("Size: "+canvas.width+"x"+canvas.height);

		// Frame rate
		var frame = 0;

		// Snakes
		var n = 2+Math.random()*3;

		var initialRadius = width/50;
		snakes = new SnakeCollection();
		for (var i=0 ; i<Math.floor(n) ; i++) {
			var snake = new Snake(canvas);
			snake.x = width/2 - initialRadius + i*initialRadius*2/n;
			snake.radius = initialRadius;
			snakes.add(snake);
		}

		// Frame drawer
		var interval = setInterval(function() {
			snakes.next();

			frame++;
		}, 0);

		// fps
		var fpsInterval = setInterval(function() {
			$("#info-fps").append("<br/>"+frame+" fps, "+snakes.snakes.length+" branches running");
			frame = 0;
			if (snakes.snakes.length === 0) {
				clearInterval(interval);
				clearInterval(fpsInterval);
/*
				var delay = 1500;
				$("#info-container").fadeOut(1500, function(){
					$("#info-container").html("Refresh for more delicious trees :)").fadeIn(delay, function() {
						setTimeout(function() {
							$("#info-container").fadeOut(delay);
						}, delay*3);
					});
				});
*/
			}
		}, 1000);
	});
})(jQuery);