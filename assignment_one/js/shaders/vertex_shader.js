function VertexShader(gl){
    Shader.call(this, gl);
    this.source_code = 'attribute vec2 coordinates;' +
        'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';
    this.gl_shader = this.gl.createShader(gl.VERTEX_SHADER);
}
VertexShader.prototype = Object.create(Shader.prototype);