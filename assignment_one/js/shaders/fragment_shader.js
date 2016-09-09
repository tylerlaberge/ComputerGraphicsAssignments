function FragmentShader(gl){
    Shader.call(this, gl);
    this.source_code = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';
    this.gl_shader = this.gl.createShader(gl.FRAGMENT_SHADER);
}
FragmentShader.prototype = Object.create(Shader.prototype);
