function Shader(gl){
    this.gl = gl;
    this.source_code = null;
    this.gl_shader = null;
}
Shader.prototype.init = function () {
    if(this.source_code && this.gl_shader){
        //Attach shader source code
        this.gl.shaderSource(this.gl_shader, this.source_code);

        //Compile the  shader
        this.gl.compileShader(this.gl_shader);
    }
};

function VertexShader(gl){
    Shader.call(this, gl);
    this.source_code = 'attribute vec2 coordinates;' +
        'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';
    this.gl_shader = this.gl.createShader(gl.VERTEX_SHADER);
}
VertexShader.prototype = Object.create(Shader.prototype);

function FragmentShader(gl){
    Shader.call(this, gl);
    this.source_code = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';
    this.gl_shader = this.gl.createShader(gl.FRAGMENT_SHADER);
}
FragmentShader.prototype = Object.create(Shader.prototype);



function ShaderProgram(gl, vertex_shader, fragment_shader){
    this.gl = gl;
    this.vertex_shader = vertex_shader;
    this.fragment_shader = fragment_shader;
    this.gl_shader_program = this.gl.createProgram();
}
ShaderProgram.prototype.init = function () {
    // Attach a vertex shader
    this.gl.attachShader(this.gl_shader_program, this.vertex_shader.gl_shader);

    // Attach a fragment shader
    this.gl.attachShader(this.gl_shader_program, this.fragment_shader.gl_shader);

    // Link both programs
    this.gl.linkProgram(this.gl_shader_program);

    // Use the combined shader program object
    this.gl.useProgram(this.gl_shader_program);
};
