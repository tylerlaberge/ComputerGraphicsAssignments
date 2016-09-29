function Cube(gl, shader_program, center_vertex, radius) {
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
Cube.prototype = Object.create(Shape.prototype);
Cube.prototype.calculate_vertices = function (center_vertex, radius) {

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
    var colors = [];
    for(var i = 0; i < 6; i++){
        colors = colors.concat(color);
    }
    return colors;
};
Cube.prototype.draw = function () {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num_points);
};