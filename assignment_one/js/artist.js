function Artist(gl, shader_program) {
    this.gl = gl;
    this.shader_program = shader_program;
}
Artist.prototype.set_viewport = function (x, y, width, height) {
    this.gl.viewport(x, y, width, height);
};
Artist.prototype.draw_triangle = function (vertex_a, vertex_b, vertex_c, color_a, color_b, color_c) {
    var triangle = new Triangle(
        this.gl, this.shader_program,
        vertex_a, vertex_b, vertex_c,
        color_a, color_b, color_c
    );
    triangle.buffer();
    triangle.draw();
};
Artist.prototype.draw_square = function (vertex_a, vertex_b, vertex_c, vertex_d, color_a, color_b, color_c, color_d) {
    var square = new Square(
        this.gl, this.shader_program,
        vertex_a, vertex_b, vertex_c, vertex_d,
        color_a, color_b, color_c, color_d
    );
    square.buffer();
    square.draw(true);
};
Artist.prototype.draw_squares = function (vertex_a, vertex_b, vertex_c, vertex_d,
                                          color_a, color_b, color_c, color_d, recursion_depth) {

    if (recursion_depth > 1) {
        var scale = .025;
        this.draw_squares
        (
            [vertex_a[0] + scale, vertex_a[1] + scale, vertex_a[2] - scale],
            [vertex_b[0] - scale, vertex_b[1] + scale, vertex_b[2] - scale],
            [vertex_c[0] - scale, vertex_c[1] - scale, vertex_c[2] - scale],
            [vertex_d[0] + scale, vertex_d[1] - scale, vertex_d[2] - scale],
            color_a, color_b, color_c, color_d,
            recursion_depth - 1
        );
    }
    this.draw_square(
        [vertex_a[0], vertex_a[1], vertex_a[2]],
        [vertex_b[0], vertex_b[1], vertex_b[2]],
        [vertex_c[0], vertex_c[1], vertex_c[2]],
        [vertex_d[0], vertex_d[1], vertex_d[2]],
        color_a, color_b, color_c, color_d
    );
};