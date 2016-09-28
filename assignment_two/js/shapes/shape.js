function Shape(gl, shader_program, vertices, vertex_size, colors, color_size) {
    /*
     * A base class for representing Shapes with webgl.
     *
     * @param gl: The webgl object to draw shapes with.
     * @param shader_program: The shader_program being used with the webgl object.
     * @param vertices: A list of vertex points that make up this shape.
     * @param vertex_size: The number of elements that make up each vertex.
     * @param colors: A list of color values for each vertex.
     * @param color_size: The number of elements that make up each color.
     */
    this.gl = gl;
    this.vertex_buffer = new Buffer(this.gl);
    this.color_buffer = new Buffer(this.gl);
    this.shader_program = shader_program;
    this.vertices = vertices;
    this.vertex_size = vertex_size;
    this.colors = colors;
    this.color_size = color_size;
    this.num_points = this.vertices.length / this.vertex_size;
    this.animation = null;
    this.transforms = mat4();
}
Shape.prototype.buffer = function () {
    /*
     * Buffer the data that describes this shape onto the GPU.
     */
    this.vertex_buffer.buffer_data(this.vertices);
    this.color_buffer.buffer_data(this.colors);
};
Shape.prototype.prepare_to_draw = function () {
    /*
     * Get ready to buffer data to the GPU by binding buffers and pointing to the appropriate shader attributes.
     */
    this.vertex_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_position_attribute, this.vertex_size, this.gl.FLOAT, false, 0, 0);
    this.color_buffer.bind();
    this.gl.vertexAttribPointer(this.shader_program.vertex_color_attribute, this.color_size, this.gl.FLOAT, false, 0, 0);
    this.gl.uniformMatrix4fv(this.shader_program.matrix_location, false, flatten(this.transforms));
};
Shape.prototype.render = function () {
    /*
     * Draw the shape to the screen along with its animation.
     */
    this.prepare_to_draw();
    this.draw();
    this.finish_drawing();
};
Shape.prototype.draw = function () {
    /*
     * Draw this shape to the screen using webgl's POINTS.
     */
    this.gl.drawArrays(this.gl.POINTS, 0, this.num_points);
};
Shape.prototype.finish_drawing = function () {
    /*
     * When you are finished drawing you should call this to unbind buffers.
     */
    this.vertex_buffer.unbind();
    this.color_buffer.unbind();
};
Shape.prototype.rotate_x = function (theta) {
    this.transforms = mult(this.transforms, rotateX(theta));
};
Shape.prototype.rotate_y = function (theta) {
    this.transforms = mult(this.transforms, rotateY(theta));
};
Shape.prototype.translate = function (x, y, z) {
    this.transforms = mult(this.transforms, translate(x, y, z));
};