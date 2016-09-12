window.onload = function(){
    var canvas = document.getElementById('my_canvas');
    var gl = WebGLUtility.initWebGL(canvas);

    WebGLUtility.setClearColor(gl, 0, 0, 0, 1);
    WebGLUtility.clearScreen(gl);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var triangle = new Triangle(
        gl, shader_program,
        [-0.75, -0.75, 0.0], [-0.25, -.75, 0.0], [-.5, -.25, 0.0],
        [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0], [1.0, 0.0, 0.0, 1.0]
    );
    var square = new Square(
        gl, shader_program,
        [-0.25, -0.25, 0.0], [0.25, -0.25, 0.0], [0.25, 0.25, 0.0], [-0.25, 0.25, 0.0],
        [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0]
    );

    triangle.buffer();
    square.buffer();

    triangle.setViewport(0, 0, canvas.width, canvas.height);
    square.setViewport(0, 0, canvas.width, canvas.height);

    triangle.draw();
    square.draw(true);
};
