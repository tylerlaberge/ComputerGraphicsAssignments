function Triangle(gl, vertex_a, vertex_b, vertex_c){
    this.gl = gl;
    this.buffer_object = new Buffer(this.gl);
    this.vertex_a = vertex_a;
    this.vertex_b = vertex_b;
    this.vertex_c = vertex_c;
}
Triangle.prototype.buffer = function () {
    this.buffer_object.buffer_vertices([
        this.vertex_a[0], this.vertex_a[1],
        this.vertex_b[0], this.vertex_b[1],
        this.vertex_c[0], this.vertex_c[1]
    ]);
};
Triangle.prototype.draw = function () {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
};