window.onload = function () {

    var canvas = document.getElementById('my_canvas');

    var gl = WebGLUtility.initWebGL(canvas);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);

    artist.set_canvas_color(0, 0, 0, 0);
    artist.clear_canvas();
    artist.set_drawing_zone(0, 0, canvas.width, canvas.height);

    var cube = artist.sketch_cube([0.0, 0.0, 0.0], .5);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    artist.draw([cube]);
};