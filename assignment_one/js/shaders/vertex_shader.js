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
        "uniform float offset_x;" +
        "uniform float offset_y;" +
        "void main() {" +
        "gl_Position.x = vPosition.x + offset_x;" +
        "gl_Position.y = vPosition.y + offset_y;" +
        "gl_Position.z = 0.0;" +
        "gl_Position.w = 1.0;" +
        "vColor = aVertexColor;" +
        "}";
    this.gl_shader = this.gl.createShader(gl.VERTEX_SHADER);
    this.init();
}
VertexShader.prototype = Object.create(Shader.prototype); /* This object is a Shader */

