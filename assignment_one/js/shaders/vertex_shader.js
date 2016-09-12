function VertexShader(gl){
    Shader.call(this, gl);
    this.source_code =
        "attribute vec4 vPosition;" +
        "attribute vec4 aVertexColor;" +
        "varying vec4 vColor;" +
        "void main(void) {" +
        "gl_Position = vPosition;" +
        "vColor = aVertexColor;" +
        "}";
    this.gl_shader = this.gl.createShader(gl.VERTEX_SHADER);
    this.init();
}
VertexShader.prototype = Object.create(Shader.prototype);

