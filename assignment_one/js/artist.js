function Artist(gl, shader_program) {
    this.gl = gl;
    this.shader_program = shader_program;
}
Artist.prototype.draw = function(shapes){
    for (var i = 0; i < shapes.length; i++){
        var shape = shapes[i];
        shape.render();
    }
    (function(instance){
        setInterval(function () {
            instance.clear_canvas();
        },1);
    })(this);
};
Artist.prototype.sketch_circle = function (center_vertex, color, radius) {
    var circle = new Circle(
        this.gl, this.shader_program,
        center_vertex, color, radius
    );
    circle.buffer();
    return circle;
};
Artist.prototype.sketch_triangle = function (vertex_a, vertex_b, vertex_c, color_a, color_b, color_c) {
    var triangle = new Triangle(
        this.gl, this.shader_program,
        vertex_a, vertex_b, vertex_c,
        color_a, color_b, color_c
    );
    triangle.buffer();
    return triangle;
};
Artist.prototype.sketch_square = function (vertex_a, vertex_b, vertex_c, vertex_d, color_a, color_b, color_c, color_d) {
    var square = new Square(
        this.gl, this.shader_program,
        vertex_a, vertex_b, vertex_c, vertex_d,
        color_a, color_b, color_c, color_d
    );
    square.buffer();
    return square
};
Artist.prototype.sketch_squares = function (vertex_a, vertex_b, vertex_c, vertex_d,
                                          color_a, color_b, color_c, color_d, recursion_depth) {

    var sketched_squares = [];
    (function recurse(instance, vertex_a, vertex_b, vertex_c, vertex_d,
                     color_a, color_b, color_c, color_d, recursion_depth) {
        if (recursion_depth > 1) {
            var scale = .025;
            var color_scale = .80;
            recurse
            (
                instance,
                [vertex_a[0] + scale, vertex_a[1] + scale, vertex_a[2] - scale],
                [vertex_b[0] - scale, vertex_b[1] + scale, vertex_b[2] - scale],
                [vertex_c[0] - scale, vertex_c[1] - scale, vertex_c[2] - scale],
                [vertex_d[0] + scale, vertex_d[1] - scale, vertex_d[2] - scale],
                [color_a[0] * color_scale, color_a[1] * color_scale, color_a[2] * color_scale, color_a[3]],
                [color_b[0] * color_scale, color_b[1] * color_scale, color_b[2] * color_scale, color_b[3]],
                [color_c[0] * color_scale, color_c[1] * color_scale, color_c[2] * color_scale, color_c[3]],
                [color_d[0] * color_scale, color_d[1] * color_scale, color_d[2] * color_scale, color_d[3]],
                recursion_depth - 1
            );
        }
        var square = instance.sketch_square(
            [vertex_a[0], vertex_a[1], vertex_a[2]],
            [vertex_b[0], vertex_b[1], vertex_b[2]],
            [vertex_c[0], vertex_c[1], vertex_c[2]],
            [vertex_d[0], vertex_d[1], vertex_d[2]],
            color_a, color_b, color_c, color_d
        );
        sketched_squares.push(square);

    })(this, vertex_a, vertex_b, vertex_c, vertex_d,
        color_a, color_b, color_c, color_d, recursion_depth);

    return sketched_squares;
};
Artist.prototype.set_canvas_color = function(r, g, b, a){
    this.gl.clearColor(r, g, b, a);
};
Artist.prototype.clear_canvas = function () {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
};
Artist.prototype.set_drawing_zone = function (x, y, width, height) {
    this.gl.viewport(x, y, width, height);
};