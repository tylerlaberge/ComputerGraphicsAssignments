function Shape(gl, shader_program, vertices, vertex_size, colors, color_size) {
    this.gl = gl;
    this.vertex_buffer = new Buffer(this.gl);
    this.color_buffer = new Buffer(this.gl);
    this.shader_program = shader_program;
    this.vertices = vertices;
    this.vertex_size = vertex_size;
    this.colors = colors;
    this.color_size = color_size;
    this.num_points = this.vertices.length / this.vertex_size;
}
Shape.prototype.buffer = function () {
    this.vertex_buffer.buffer_data(this.vertices);
    this.color_buffer.buffer_data(this.colors);
};
Shape.prototype.prepare_to_draw = function () {
    this.vertex_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_position_attribute, this.vertex_size, this.gl.FLOAT, false, 0, 0);
    this.color_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_color_attribute, this.color_size, this.gl.FLOAT, false, 0, 0);
};
Shape.prototype.animate = function (offset_x, offset_y) {
    this.gl.uniform1f(this.shader_program.offset_x_uniform, offset_x);
    this.gl.uniform1f(this.shader_program.offset_y_uniform, offset_y);
};
Shape.prototype.draw = function () {
    this.prepare_to_draw();
    this.animate(0, 0);
    this.gl.drawArrays(this.gl.POINTS, 0, this.num_points);
    this.finish_drawing();
};
Shape.prototype.finish_drawing = function () {
    this.vertex_buffer.unbind();
    this.color_buffer.unbind();
};