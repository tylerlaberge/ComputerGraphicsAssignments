window.onload = function () {

    var canvas = document.getElementById('my_canvas');

    var gl = WebGLUtility.initWebGL(canvas);

    gl.enable(gl.DEPTH_TEST);
    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);

    artist.set_canvas_color(0, 0, 0, 0);
    artist.clear_canvas();
    artist.set_drawing_zone(0, 0, canvas.width, canvas.height);

    var cube = artist.sketch_cube([0.0, 0.0, 0.0], 0.25);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    artist.draw([cube]);

    document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 33:
            cube.translate(0.0, 0.0, -.25);
            artist.draw([cube]);
            break;
        case 34:
            cube.translate(0.0, 0.0, 0.25);
            artist.draw([cube]);
            break;
        case 37:
            cube.rotate_y(-2.0);
            artist.draw([cube]);
            break;
        case 38:
            cube.rotate_x(-2.0);
            artist.draw([cube]);
            break;
        case 39:
            cube.rotate_y(2.0);
            artist.draw([cube]);
            break;
        case 40:
            cube.rotate_x(2.0);
            artist.draw([cube]);
            break;
    }
};
};