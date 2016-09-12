function ShaderProgram(gl, vertex_shader, fragment_shader){
    this.gl = gl;
    this.vertex_shader = vertex_shader;
    this.fragment_shader = fragment_shader;
    this.gl_shader_program = this.gl.createProgram();
    this.vertex_position_attribute = null;
    this.vertex_color_attribute = null;
    this.init();
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

    this.vertex_position_attribute = this.gl.getAttribLocation(this.gl_shader_program, "vPosition");
    this.vertex_color_attribute = this.gl.getAttribLocation(this.gl_shader_program, "aVertexColor");

    this.gl.enableVertexAttribArray(this.vertex_position_attribute);
    this.gl.enableVertexAttribArray(this.vertex_color_attribute);
};
