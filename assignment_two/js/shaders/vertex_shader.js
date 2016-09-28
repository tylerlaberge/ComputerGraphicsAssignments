function VertexShader(gl) {
    /*
     * A class which represents a Vertex Shader to be used with webgl.
     *
     * @param gl: The webgl object to use with this shader.
     */
    Shader.call(this, gl);
    this.source_code =
        "attribute vec4 vPosition;" +
        "attribute vec4 aVertexColor;" +
        "varying vec4 vColor;" +
        "uniform mat4 uMatrix;" +
        "void main() {" +
        "gl_Position = uMatrix*vPosition;" +
        "vColor = aVertexColor;" +
        "}";
    this.gl_shader = this.gl.createShader(gl.VERTEX_SHADER);
    this.init();
}
VertexShader.prototype = Object.create(Shader.prototype); /* This object is a Shader */

