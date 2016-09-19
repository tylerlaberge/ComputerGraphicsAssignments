function Circle(gl, shader_program,
                center_vertex, color, radius) {
    /*
     * A class which represents a Circle to be drawn with webgl.
     *
     * @param gl: The webgl object to draw this shape with.
     * @param shader_program: The shader program being used with the webgl object.
     * @param center_vertex: The center vertex for this Circle.
     * @param color: The color for this Circle.
     * @param radius: The radius for this Circle.
     */
    this.vertex_size = 2;
    this.color_size = 4;
    this.vertices = this.compute_vertices(center_vertex, radius);
    this.colors = this.compute_colors(color, this.vertices.length / this.vertex_size);
    Shape.call(
        this,
        gl, shader_program,
        this.vertices,
        this.vertex_size,
        this.colors,
        this.color_size
    );
}
Circle.prototype = Object.create(Shape.prototype); /* This object is a Shape */
Circle.prototype.draw = function () {
    /*
     * Override the draw method to use webgl's TRIANGLE_FAN.
     */
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.num_points);
};
Circle.prototype.compute_vertices = function (center_vertex, radius) {
    /*
     * Compute the vertices that make up this circle.
     *
     * @param center_vertex: The center vertex of this circle.
     * @param radius: The radius of this circle.
     */
    var vertices = [center_vertex[0], center_vertex[1]];
    var step_size = 2*Math.PI/200;
    for (var i = 0; i <= (2*Math.PI); i+=step_size){
        var next_vertex_x = radius*Math.sin(i) + center_vertex[0];
        var next_vertex_y = radius*Math.cos(i) + center_vertex[1];
        vertices.push(next_vertex_x, next_vertex_y);
    }
    return vertices;
};
Circle.prototype.compute_colors = function (base_color, num_vertices) {
    /*
     * Compute the colors to be applied to each vertex.
     *
     * Algorithm is set to lower the red value as goes and at the halfway point start raising it back to normal.
     *
     * @param base_color: The base color to compute the rest of the colors from.
     * @param num_vertices: The number of vertices to compute colors for.
     */
    var colors = [base_color[0], base_color[1], base_color[2], base_color[3]];
    var next_color = base_color[0];
    var color_scale = .99;
    for (var i = 0; i < num_vertices; i++){
        colors.push(next_color, base_color[1], base_color[2], base_color[3]);
        if(i%2){
            if (i < num_vertices/2){
                next_color = next_color*color_scale;
                color_scale -= .005;
            }
            else{
                next_color = next_color/color_scale;
                color_scale += .005;
            }
        }
    }
    return colors;
};