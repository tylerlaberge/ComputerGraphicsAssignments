function Square(
    gl,
    shader_program,
    vertex_a, vertex_b, vertex_c, vertex_d,
    color_a, color_b, color_c, color_d
){
    this.gl = gl;
    this.shader_program = shader_program;
    this.vertex_buffer = new Buffer(this.gl);
    this.color_buffer = new Buffer(this.gl);
    this.vertex_a = vertex_a;
    this.vertex_b = vertex_b;
    this.vertex_c = vertex_c;
    this.vertex_d = vertex_d;
    this.color_a = color_a;
    this.color_b = color_b;
    this.color_c = color_c;
    this.color_d = color_d;
}
Square.prototype.buffer = function () {
    this.vertex_buffer.buffer_data([
        this.vertex_a[0], this.vertex_a[1], this.vertex_a[2],
        this.vertex_b[0], this.vertex_b[1], this.vertex_b[2],
        this.vertex_c[0], this.vertex_c[1], this.vertex_c[2],
        this.vertex_d[0], this.vertex_d[1], this.vertex_d[2]
    ]);
    this.color_buffer.buffer_data([
        this.color_a[0], this.color_a[1], this.color_a[2], this.color_a[3],
        this.color_b[0], this.color_b[1], this.color_b[2], this.color_b[3],
        this.color_c[0], this.color_c[1], this.color_c[2], this.color_c[3],
        this.color_d[0], this.color_d[1], this.color_d[2], this.color_d[3]
    ]);
};
Square.prototype.setViewport = function (x, y, width, height) {
    this.gl.viewport(x, y, width, height);
};
Square.prototype.draw = function (hollow) {
    this.vertex_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_position_attribute, 3, this.gl.FLOAT, false, 0, 0);
    this.color_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_color_attribute, 4, this.gl.FLOAT, false, 0, 0);

    if(hollow){
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }
    else {
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
    }
    this.vertex_buffer.unbind();
    this.color_buffer.unbind();
};