function ShaderProgram(gl, vertex_shader, fragment_shader) {
    /*
     * A class which represents a Shader Program to be used with webgl.
     *
     * @param gl: The webgl object to use with this ShaderProgram.
     * @param vertex_shader: The vertex shader to be part of this ShaderProgram.
     * @param fragment_shader: The fragment shader to be part of this ShaderProgram.
     */
    this.gl = gl;
    this.vertex_shader = vertex_shader;
    this.fragment_shader = fragment_shader;
    this.gl_shader_program = this.gl.createProgram();
    this.vertex_position_attribute = null;
    this.vertex_color_attribute = null;
    this.offset_x_uniform = null;
    this.offset_y_uniform = null;
    this.init();
}
ShaderProgram.prototype.init = function () {
    /*
     * Initialize this ShaderProgram.
     */
    this.gl.attachShader(this.gl_shader_program, this.vertex_shader.gl_shader);

    // Attach a fragment shader
    this.gl.attachShader(this.gl_shader_program, this.fragment_shader.gl_shader);

    // Link both programs
    this.gl.linkProgram(this.gl_shader_program);

    // Use the combined shader program object
    this.gl.useProgram(this.gl_shader_program);

    this.vertex_position_attribute = this.gl.getAttribLocation(this.gl_shader_program, "vPosition");
    this.vertex_color_attribute = this.gl.getAttribLocation(this.gl_shader_program, "aVertexColor");

    this.gl.enableVertexAttribArray(this.vertex_position_attribute);
    this.gl.enableVertexAttribArray(this.vertex_color_attribute);

    this.offset_x_uniform = this.gl.getUniformLocation(this.gl_shader_program, 'offset_x');
    this.offset_y_uniform = this.gl.getUniformLocation(this.gl_shader_program, 'offset_y');
};
