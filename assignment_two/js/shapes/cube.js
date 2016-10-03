function Cube(gl, shader_program, center_vertex, radius) {
    /*
     * A class which represents a 3D Cube to be drawn with Webgl.
     *
     * @param gl: The webgl object to draw with.
     * @param shader_program: The Shader Program object associated with the Webgl object.
     * @param center_vertex: The center point of the cube.
     * @param radius: The radius of the circumscribing sphere contained by the cube.
     */
    Shape.call(
        this, gl, shader_program,
        this.calculate_vertices(center_vertex, radius),
        4,
        [].concat(
            this.generate_colors([1.0, 0.0, 1.0, 1.0]),     /* magenta */
            this.generate_colors([1.0, 1.0, 0.0, 1.0]),     /* yellow */
            this.generate_colors([0.0, 0.0, 1.0, 1.0]),     /* blue */
            this.generate_colors([1.0, 0.0, 0.0, 1.0]),     /* red */
            this.generate_colors([0.0, 1.0, 0.0, 1.0]),     /* green */
            this.generate_colors([0.0, 0.0, 0.0, 1.0])      /* black */
        ),
        4
    )

}
Cube.prototype = Object.create(Shape.prototype); /* This object is a Shape */
Cube.prototype.calculate_vertices = function (center_vertex, radius) {
    /*
     * Calculate all the vertices of the cube given a center vertex and radius.
     *
     * @param center_vertex: The center point of the cube.
     * @param radius: The radius of the circumscribing sphere contained by the cube.
     */
    var center_x = center_vertex[0];
    var center_y = center_vertex[1];
    var center_z = center_vertex[2];

    var front_top_left_corner = [center_x-radius, center_y+radius, center_z+radius, 1.0];
    var front_top_right_corner = [center_x+radius, center_y+radius, center_z+radius, 1.0];
    var front_bottom_left_corner = [center_x-radius, center_y-radius, center_z+radius, 1.0];
    var front_bottom_right_corner = [center_x+radius, center_y-radius, center_z+radius, 1.0];

    var back_top_left_corner = [center_x-radius, center_y+radius, center_z-radius, 1.0];
    var back_top_right_corner = [center_x+radius, center_y+radius, center_z-radius, 1.0];
    var back_bottom_left_corner = [center_x-radius, center_y-radius, center_z-radius, 1.0];
    var back_bottom_right_corner = [center_x+radius, center_y-radius, center_z-radius, 1.0];

    return [].concat(
        front_bottom_left_corner, front_top_left_corner, front_top_right_corner,
        front_bottom_left_corner, front_bottom_right_corner, front_top_right_corner,
        front_bottom_right_corner, front_top_right_corner, back_top_right_corner,
        front_bottom_right_corner, back_bottom_right_corner, back_top_right_corner,
        back_bottom_right_corner, back_top_right_corner, back_top_left_corner,
        back_bottom_right_corner, back_bottom_left_corner, back_top_left_corner,
        back_bottom_left_corner, back_top_left_corner, front_top_left_corner,
        back_bottom_left_corner, front_bottom_left_corner, front_top_left_corner,
        front_bottom_left_corner, front_bottom_right_corner, back_bottom_right_corner,
        front_bottom_left_corner, back_bottom_left_corner, back_bottom_right_corner,
        front_top_left_corner, front_top_right_corner, back_top_right_corner,
        front_top_left_corner, back_top_left_corner, back_top_right_corner
    );
};
Cube.prototype.generate_colors = function(color){
    /*
     * Generate 6 identical colors to be used for each vertex of a face of the cube.
     */
    var colors = [];
    for(var i = 0; i < 6; i++){
        colors = colors.concat(color);
    }
    return colors;
};
Cube.prototype.draw = function () {
    /*
     * Draw this shape to the screen using weblgl TRIANGLES
     */
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num_points);
};