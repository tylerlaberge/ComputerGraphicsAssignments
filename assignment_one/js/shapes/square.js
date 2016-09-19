function Square(gl,
                shader_program,
                vertex_a, vertex_b, vertex_c, vertex_d,
                color_a, color_b, color_c, color_d) {
    /*
     * A class which represents a Square to be drawn with webgl.
     *
     * @param gl: The webgl object to draw this shape with.
     * @param shader_program: The shader program being used with the webgl object.
     * @param vertex_a: One of four vertices that make up this Square.
     * @param vertex_b: One of four vertices that make up this Square.
     * @param vertex_c: One of four vertices that make up this Square.
     * @param vertex_d: One of four vertices that make up this Square.
     * @param color_a: The color to apply to vertex_a.
     * @param color_b: The color to apply to vertex_b.
     * @param color_c: The color to apply to vertex_c.
     * @param color_d: The color to apply to vertex_d.
     */
    this.vertex_size = 3;
    this.color_size = 4;
    Shape.call(
        this,
        gl, shader_program,
        [
            vertex_a[0], vertex_a[1], vertex_a[2],
            vertex_b[0], vertex_b[1], vertex_b[2],
            vertex_c[0], vertex_c[1], vertex_c[2],
            vertex_d[0], vertex_d[1], vertex_d[2]
        ],
        this.vertex_size,
        [
            color_a[0], color_a[1], color_a[2], color_a[3],
            color_b[0], color_b[1], color_b[2], color_b[3],
            color_c[0], color_c[1], color_c[2], color_c[3],
            color_d[0], color_d[1], color_d[2], color_d[3]
        ],
        this.color_size
    );
}
Square.prototype = Object.create(Shape.prototype); /* This object is a Shape */
Square.prototype.draw = function (fill) {
    /*
     * Override the draw method to use webgls TRIANGLE_FAN or LINE_LOOP depending on the fill param.
     *
     * @param fill: boolean for if this square should be solid. Defaults to hollow.
     */
    if (fill) {
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.num_points);
    }
    else {
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, this.num_points);
    }
};