function Buffer(gl){
    this.gl = gl;
    this.gl_buffer = this.gl.createBuffer();
}
Buffer.prototype.buffer_vertices = function (vertices) {
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.unbind();
};
Buffer.prototype.bind = function () {
    // Bind an empty array buffer to it
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl_buffer);
};
Buffer.prototype.unbind = function () {
    // Unbind the buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
};