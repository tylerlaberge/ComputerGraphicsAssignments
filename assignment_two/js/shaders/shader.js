function Shader(gl) {
    /*
     * Base shader class. Represents a Shader to be used with webgl.
     *
     * @param gl: The webgl object to use with this shader.
     */
    this.gl = gl;
    this.source_code = null; /* The source code for the shader */
    this.gl_shader = null; /* The webgl shader object */
}
Shader.prototype.init = function () {
    /*
     * Initialize this shader.
     *
     * Attaches this shader to its webgl object and compiles it.
     */
    if (this.source_code && this.gl_shader) {
        //Attach shader source code
        this.gl.shaderSource(this.gl_shader, this.source_code);

        //Compile the  shader
        this.gl.compileShader(this.gl_shader);
    }
};

