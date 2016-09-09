window.onload = function(){

    /* Step1: Prepare the canvas and get WebGL context */

    var canvas = document.getElementById('my_canvas');
    var gl = initWebGL(canvas);

    /* Step2: Define the geometry and store it in buffer objects */

    var triangle = new Triangle(gl, [-0.5, 0.5], [-0.5, 0], [0.7, 0]);
    triangle.buffer();

    /* Step3: Create and compile Shader programs */

    var vertex_shader = new VertexShader(gl);
    vertex_shader.init();

    var fragment_shader = new FragmentShader(gl);
    fragment_shader.init();

    var shader_program = new ShaderProgram(gl, vertex_shader, fragment_shader);
    shader_program.init();

    /* Step 4: Associate the shader programs to buffer objects */
    triangle.buffer_object.bind();
    initAttributes(gl, shader_program.gl_shader_program);

    /* Step5: Drawing the required object (triangle) */

    prepareToDraw(gl, canvas);
    triangle.draw();
};
