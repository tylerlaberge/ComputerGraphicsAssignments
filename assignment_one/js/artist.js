function Artist(gl, shader_program) {
    /*
     * A class which is responsible for drawing shapes to the screen using webgl.
     *
     * @param gl: The webgl object to use to draw with.
     * @param shader_program: The ShaderProgram associated with the webgl object.
     */
    this.gl = gl;
    this.shader_program = shader_program;
}
Artist.prototype.draw = function(shapes){
    /*
     * Draw shapes to the screen.
     *
     * @param shapes: An array of Shape objects to draw to the screen.
     */
    for (var i = 0; i < shapes.length; i++){
        var shape = shapes[i];
        shape.render();
    }
    (function(instance){ /* Slightly hacky thing to keep the background from disappearing during animations */
        setInterval(function () {
            instance.clear_canvas();
        },1);
    })(this);
};
Artist.prototype.sketch_circle = function (center_vertex, color, radius) {
    /*
     * Create a Circle shape and buffer its data to the GPU, but don't actually draw it to the screen yet.
     *
     * @param center_vertex: The center vertex of the circle.
     * @param color: The color of the circle.
     * @param radius: The radius of the circle.
     * @return: return A new Circle object which has been buffered to the GPU.
     */
    var circle = new Circle(
        this.gl, this.shader_program,
        center_vertex, color, radius
    );
    circle.buffer();
    return circle;
};
Artist.prototype.sketch_triangle = function (vertex_a, vertex_b, vertex_c, color_a, color_b, color_c) {
    /*
     * Create a Triangle shape and buffer its data to the GPU, but don't actually draw it to the screen yet.
     *
     * @param vertex_a: One of three vertices for the Triangle.
     * @param vertex_b: One of three vertices for the Triangle.
     * @param vertex_c: One of three vertices for the Triangle.
     * @param color_a: The color to apply to vertex_a.
     * @param color_b: The color to apply to vertex_b.
     * @param color_c: The color to apply to vertex_c.
     * @return: return A new Triangle object which has been buffered to the GPU.
     */
    var triangle = new Triangle(
        this.gl, this.shader_program,
        vertex_a, vertex_b, vertex_c,
        color_a, color_b, color_c
    );
    triangle.buffer();
    return triangle;
};
Artist.prototype.sketch_square = function (vertex_a, vertex_b, vertex_c, vertex_d, color_a, color_b, color_c, color_d) {
    /*
     * Create a Square shape and buffer its data to the GPU, but don't actually draw it to the screen yet.
     *
     * @param vertex_a: One of four vertices for the Square.
     * @param vertex_b: One of four vertices for the Square.
     * @param vertex_c: One of four vertices for the Square.
     * @param vertex_d: One of four vertices for the Square.
     * @param color_a: The color to apply to vertex_a.
     * @param color_b: The color to apply to vertex_b.
     * @param color_c: The color to apply to vertex_c.
     * @param color_d: The color to apply to vertex_d.
     * @return: return A new Square object which has been buffered to the GPU.
     */
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
    /*
     * Create multiple square objects recursively and buffer their data to the GPU.
     *
     * @param vertex_a: One of four vertices for the outer Square.
     * @param vertex_b: One of four vertices for the outer Square.
     * @param vertex_c: One of four vertices for the outer Square.
     * @param vertex_d: One of four vertices for the outer Square.
     * @param color_a: The color to apply to vertex_a.
     * @param color_b: The color to apply to vertex_b.
     * @param color_c: The color to apply to vertex_c.
     * @param color_d: The color to apply to vertex_d.
     * @param recursion_depth: The number of squares to draw recursively.
     * @return: return A list of new Square objects which have been buffered to the GPU.
     */
    var sketched_squares = [];

    (function recurse(instance, vertex_a, vertex_b, vertex_c, vertex_d,
                     color_a, color_b, color_c, color_d, recursion_depth) {
        if (recursion_depth > 1) {
            var scale = .025; /* Each subsequent square is scaled down by a factor of .025 */
            var color_scale = .80; /* Each subsequent square has its color scaled down to 80% of the previous color  */
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
    /*
     * Set the background color to use when this artist's canvas is cleared.
     *
     * @param r: The red value of the color.
     * @param g: The green value of the color.
     * @param b: The blue value of the color.
     * @param a: The alpha value of the color.
     */
    this.gl.clearColor(r, g, b, a);
};
Artist.prototype.clear_canvas = function () {
    /*
     * Clear the artist's canvas, leaving only the background color.
     */
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
};
Artist.prototype.set_drawing_zone = function (x, y, width, height) {
    /*
     * Set the viewport for this artist to draw in.
     */
    this.gl.viewport(x, y, width, height);
};
