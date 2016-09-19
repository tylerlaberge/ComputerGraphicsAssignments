window.onload = function () {
    var canvas = document.getElementById('my_canvas');

    var gl = WebGLUtility.initWebGL(canvas);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);

    artist.set_canvas_color(0, 0, 0, 1); /* Sets the background color */
    artist.clear_canvas();
    artist.set_drawing_zone(0, 0, canvas.width, canvas.height); /* Sets the viewport */

    var triangle = artist.sketch_triangle(
        [-0.75, -0.75], [-0.25, -.75], [-.5, -.25], /* vertices */
        [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0], [1.0, 0.0, 0.0, 1.0] /* colors */
    );
    triangle.prepare_animation(0.001, 0.0); /* Each frame move .001 units to the the right */

    var squares = artist.sketch_squares(
        [-0.25, -0.25, 0.0], [0.25, -0.25, 0.0], [0.25, 0.25, 0.0], [-0.25, 0.25, 0.0], /* vertices of outer square */
        [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], /* colors */
        10); /* recursion depth */
    for (var i = 0; i < squares.length; i++){
        squares[i].prepare_animation(-0.001, 0.001); /* Each frame move .001 units to the left and .001 units up */
    }
    var circle = artist.sketch_circle(
        [0.5, 0.5], /* Center vertex */
        [1.0, 0.0, 0.0, 1.0], /* colors */
        .25); /* radius */

    circle.prepare_animation(0.0, -0.001); /* Each frame move .001 units down */

    var shapes = [triangle, circle].concat(squares);
    artist.draw(shapes); /* Draw each shape to the screen */
};