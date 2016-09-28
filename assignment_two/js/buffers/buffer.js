function Buffer(gl) {
    /*
     * A class which represents a webgl buffer object.
     *
     * @param gl: The webgl object to create and use buffers with.
     */
    this.gl = gl;
    this.gl_buffer = this.gl.createBuffer();
}
Buffer.prototype.buffer_data = function (data) {
    /*
     * Buffer data on the GPU.
     *
     * @param data: A list of vertices to buffer.
     */
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    this.unbind();
};
Buffer.prototype.bind = function () {
    /*
     * Bind this buffer so that data can be sent to it.
     */
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl_buffer);
};
Buffer.prototype.unbind = function () {
    /*
     * Unbind this buffer.
     */
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
};