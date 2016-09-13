function Shader(gl) {
    this.gl = gl;
    this.source_code = null;
    this.gl_shader = null;
}
Shader.prototype.init = function () {
    if (this.source_code && this.gl_shader) {
        //Attach shader source code
        this.gl.shaderSource(this.gl_shader, this.source_code);

        //Compile the  shader
        this.gl.compileShader(this.gl_shader);
    }
};

