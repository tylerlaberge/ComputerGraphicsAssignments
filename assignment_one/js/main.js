window.onload = function(){

    /* Step1: Prepare the canvas and get WebGL context */

    var canvas = document.getElementById('my_canvas');
    var gl = WebGLUtility.initWebGL(canvas);

    /* Step2: Create and compile Shader programs */
    var vertex_shader = new VertexShader(gl);
    vertex_shader.init();

    var fragment_shader = new FragmentShader(gl);
    fragment_shader.init();

    var shader_program = new ShaderProgram(gl, vertex_shader, fragment_shader);
    shader_program.init();

    /* Step3: Define the geometry and store it in buffer objects */

    var triangle = new Triangle(
        gl, shader_program,
        [-0.5, 0.5, 0.0], [-0.5, 0, 0.0], [0.7, 0, 0.0],
        [1.0, 0.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0]
    );
    triangle.buffer();

    /* Step4: Drawing the required object (triangle) */

    WebGLUtility.prepareToDraw(gl, canvas);
    triangle.draw();
};
