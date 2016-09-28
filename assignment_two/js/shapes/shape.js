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
};
Shape.prototype.offset = function (offset_x, offset_y) {
    /*
     * Offset where this shape is to be drawn.
     *
     * @param offset_x: The amount in the x direction to offset the shape by.
     * @param offset_y: The amount in the y direction to offset the shape by.
     */
    this.prepare_to_draw();
    this.gl.uniform1f(this.shader_program.offset_x_uniform, offset_x);
    this.gl.uniform1f(this.shader_program.offset_y_uniform, offset_y);
    this.draw();
    this.finish_drawing();
};
Shape.prototype.prepare_animation = function (x_inc, y_inc) {
    /*
     * Prepare an animation for this shape.
     *
     * @param x_inc: The amount in the x direction this shape should move each frame.
     * @param y_inc: The amount in the y direction this shape should move each frame.
     */
    var offset_x = 0;
    var offset_y = 0;
    var instance = this;
    var ticks = 0;
    var animation_func = function() {
        requestAnimationFrame(animation_func);
        instance.offset(offset_x, offset_y);
        if (ticks < 500){
            offset_x += x_inc;
            offset_y += y_inc;
        }
        else {
            if (ticks > 1000){
                ticks = 0;
            }
            offset_x -= x_inc;
            offset_y -= y_inc;
        }
        ticks++;
    };
    this.animation = animation_func;
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