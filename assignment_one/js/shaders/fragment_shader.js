function FragmentShader(gl){
    Shader.call(this, gl);
    this.source_code =
        "precision mediump float;" +
        "varying vec4 vColor;" +
        "void main(void) {" +
        "gl_FragColor = vColor;" +
        "}";
    this.gl_shader = this.gl.createShader(gl.FRAGMENT_SHADER);
    this.init();
}
FragmentShader.prototype = Object.create(Shader.prototype);

