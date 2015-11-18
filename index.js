//the global anonymous function to work with.
/*eslint quotes: [2, "double"]*/
/*eslint-env es6*/
/*eslint vars-on-top: 0*/
(function($, Modernizr, SnakeCollection, Snake) {

  $(function() {
    if (Modernizr.canvas === true) {
      $("#canvas-warning").hide();
    }

    // Convenience
    $canvas = $("#canvas");
    var canvas = $canvas[0];

    // Dimensions
    var width = $canvas.width();
    var height = $canvas.height();

    // Set actual canvas size to match css
    $canvas.attr("width", width);
    $canvas.attr("height", height);

    // Information
    $("#info-size").text("Size: " + canvas.width + "x" + canvas.height);

    // Frame rate
    var frame = 0;

    // Snakes
    var n = 2 + Math.random() * 3;

    var initialRadius = width / 50;
    var snakes = new SnakeCollection();
    var i, snake;
    for (i = 0; i < Math.floor(n); i++) {
      snake = new Snake(canvas);
      snake.x = width / 2 - initialRadius + i * initialRadius * 2 / n;
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
      $("#info-fps")
        .append("<br/>" + frame + " fps, " + snakes.snakes.length + " branches running");
      frame = 0;
      if (snakes.snakes.length === 0) {
        clearInterval(interval);
        clearInterval(fpsInterval);

      }
    }, 1000);
  });
})(window.jQuery, window.Modernizr, window.SnakeCollection, window.Snake);