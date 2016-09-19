function Triangle(gl, shader_program,
                  vertex_a, vertex_b, vertex_c,
                  color_a, color_b, color_c) {
    /*
     * A class which represents a Triangle to be drawn with webgl.
     *
     * @param gl: The webgl object to draw this shape with.
     * @param shader_program: The shader program being used with the webgl object.
     * @param vertex_a: One of three vertices that make up this Triangle.
     * @param vertex_b: One of three vertices that make up this Triangle.
     * @param vertex_c: One of three vertices that make up this Triangle.
     * @param color_a: The color to apply to vertex_a.
     * @param color_b: The color to apply to vertex_b.
     * @param color_c: The color to apply to vertex_c.
     */
    this.vertex_size = 2;
    this.color_size = 4;
    Shape.call(
        this,
        gl, shader_program,
        [
            vertex_a[0], vertex_a[1],
            vertex_b[0], vertex_b[1],
            vertex_c[0], vertex_c[1]
        ],
        this.vertex_size,
        [
            color_a[0], color_a[1], color_a[2], color_a[3],
            color_b[0], color_b[1], color_b[2], color_b[3],
            color_c[0], color_c[1], color_c[2], color_c[3]
        ],
        this.color_size
    );
}
Triangle.prototype = Object.create(Shape.prototype); /* This object is a Shape */
Triangle.prototype.draw = function () {
    /*
     * Override the draw method to draw using webgl's TRIANGLES.
     */
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num_points);
};