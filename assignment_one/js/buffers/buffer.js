function Buffer(gl) {
    this.gl = gl;
    this.gl_buffer = this.gl.createBuffer();
}
Buffer.prototype.buffer_data = function (data) {
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    this.unbind();
};
Buffer.prototype.bind = function () {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl_buffer);
};
Buffer.prototype.unbind = function () {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
};