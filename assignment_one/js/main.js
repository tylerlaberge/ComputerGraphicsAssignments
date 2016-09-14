window.onload = function () {
    var canvas = document.getElementById('my_canvas');
    var gl = WebGLUtility.initWebGL(canvas);
    WebGLUtility.setClearColor(gl, 0, 0, 0, 1);
    WebGLUtility.clearScreen(gl);
    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);
    artist.set_viewport(0, 0, canvas.width, canvas.height);


    var triangle = artist.sketch_triangle(
        [-0.75, -0.75], [-0.25, -.75], [-.5, -.25],
        [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0], [1.0, 0.0, 0.0, 1.0]
    );
    var triangle_animation = artist.sketch_animation(triangle, 0.001, 0.0);

    var squares = artist.sketch_squares([-0.25, -0.25, 0.0], [0.25, -0.25, 0.0], [0.25, 0.25, 0.0], [-0.25, 0.25, 0.0],
        [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
        10);
    var square_animations = [];
    for (var i = 0; i < squares.length; i++){
        var square_animation = artist.sketch_animation(squares[i], 0.0, 0.001);
        square_animations.push(square_animation);
    }
    var circle = artist.sketch_circle([0.5, 0.5], [1.0, 0.0, 0.0, 1.0], .25);
    var circle_animation = artist.sketch_animation(circle, 0.0, -0.001);

    var animations = [triangle_animation, circle_animation].concat(square_animations);

    artist.draw(animations);


 /*   artist.draw_squares(
        [-0.25, -0.25, 0.0], [0.25, -0.25, 0.0], [0.25, 0.25, 0.0], [-0.25, 0.25, 0.0],
        [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
        10
    );*/
};