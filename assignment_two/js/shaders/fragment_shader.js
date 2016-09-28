function FragmentShader(gl) {
    /*
     * A class which represents a Fragment Shader to be used with webgl.
     *
     * @param gl: The webgl object to use with this shader.
     */
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
FragmentShader.prototype = Object.create(Shader.prototype); /* This object is a Shader */

