window.onload = function(){
    var canvas = document.getElementById('my_canvas');
    var gl = WebGLUtility.initWebGL(canvas);

    WebGLUtility.setClearColor(gl, 0, 0, 0, 1);
    WebGLUtility.clearScreen(gl);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var triangle = new Triangle(
        gl, shader_program,
        [-0.75, -0.75], [-0.25, -.75], [-.5, -.25],
        [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0], [1.0, 0.0, 0.0, 1.0]
    );

    var squares = createSquares(
        gl, shader_program,
        [-0.25, -0.25, 0.0], [0.25, -0.25, 0.0], [0.25, 0.25, 0.0], [-0.25, 0.25, 0.0],
        [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
        10
    );

    triangle.buffer();
    triangle.setViewport(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < squares.length; i++){
        squares[i].buffer();
        squares[i].setViewport(0, 0, canvas.width, canvas.height);
        squares[i].draw(true);
    }
    triangle.draw();
};
function createSquares(
    gl, shader_program,
    vertex_a, vertex_b, vertex_c, vertex_d,
    color_r, color_g, color_b, color_a,
    recursion_depth
){
    var squares = [];
    (function recurse(squares, gl, shader_program, vertex_a, vertex_b, vertex_c, vertex_d, color_r, color_g, color_b, color_a, recursion_depth)
    {
        if (recursion_depth > 1) {
            var scale = .025;
            recurse
            (
                squares, gl, shader_program,
                [vertex_a[0] + scale, vertex_a[1] + scale, vertex_a[2] - scale],
                [vertex_b[0] - scale, vertex_b[1] + scale, vertex_b[2] - scale],
                [vertex_c[0] - scale, vertex_c[1] - scale, vertex_c[2] - scale],
                [vertex_d[0] + scale, vertex_d[1] - scale, vertex_d[2] - scale],
                color_r, color_g, color_b, color_a,
                recursion_depth - 1
            );
        }
        squares.push(new Square(
            gl, shader_program,
            [vertex_a[0], vertex_a[1], vertex_a[2]],
            [vertex_b[0], vertex_b[1], vertex_b[2]],
            [vertex_c[0], vertex_c[1], vertex_c[2]],
            [vertex_d[0], vertex_d[1], vertex_d[2]],
            color_r, color_g, color_b, color_a
        ));
    })(squares, gl, shader_program, vertex_a, vertex_b, vertex_c, vertex_d, color_r, color_g, color_b, color_a, recursion_depth);

    return squares;
}


