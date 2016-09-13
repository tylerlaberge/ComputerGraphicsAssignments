function Triangle(gl, shader_program,
                  vertex_a, vertex_b, vertex_c,
                  color_a, color_b, color_c) {
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
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.draw = function () {
    this.prepare_to_draw();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num_points);
    this.finish_drawing();
};