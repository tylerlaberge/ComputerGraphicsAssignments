window.onload = function () {

    var canvas = document.getElementById('my_canvas');

    var gl = WebGLUtility.initWebGL(canvas);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);

    artist.enable_depth();
    artist.set_canvas_color(0, 0, 0, 0);
    artist.set_drawing_zone(0, 0, canvas.width, canvas.height);
    artist.clear_canvas();

    var cube = artist.sketch_cube([0.0, 0.0, 0.0], 0.25);
    cube.rotate('x', 10.0);
    artist.draw([cube]);

    var keydown_event_handler = new KeyDownEventHandler();

    keydown_event_handler.attach_callback(33, false, function () {cube.translate(0.0, 0.0, 0.01);artist.draw([cube]);});
    keydown_event_handler.attach_callback(34, false, function () {cube.translate(0.0, 0.0, -0.01);artist.draw([cube]);});
    keydown_event_handler.attach_callback(37, false, function () {cube.translate(-0.01, 0.0, 0.0);artist.draw([cube]);});
    keydown_event_handler.attach_callback(38, false, function () {cube.translate(0.0, 0.01, 0.0);artist.draw([cube]);});
    keydown_event_handler.attach_callback(39, false, function () {cube.translate(0.01, 0.0, 0.0);artist.draw([cube]);});
    keydown_event_handler.attach_callback(40, false, function () {cube.translate(0.0, -0.01, 0.0);artist.draw([cube]);});
    keydown_event_handler.attach_callback(66, true, function () {cube.reset();cube.rotate('x', 10.0);artist.draw([cube]);});
    keydown_event_handler.attach_callback(83, true, function () {cube.scale(1.1, 1.1, 1.1);artist.draw([cube]);});
    keydown_event_handler.attach_callback(83, false, function () {cube.scale(0.9, 0.9, 0.9);artist.draw([cube]);});

    keydown_event_handler.init();

    var mouseDown = false;
    var lastMouseX = null;
    var lastMouseY = null;
    document.onmousedown = function (event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    };
    document.onmouseup = function (event) {
        mouseDown = false;
    };
    document.onmousemove = function (event) {
        if (!mouseDown) {
            return;
        }
        var newX = event.clientX;
        var newY = event.clientY;

        var deltaX = newX - lastMouseX;
        cube.rotate('y', deltaX/10);

        var deltaY = newY - lastMouseY;
        cube.rotate('x', deltaY/10);

        lastMouseX = newX;
        lastMouseY = newY;

        artist.draw([cube]);
    };
};