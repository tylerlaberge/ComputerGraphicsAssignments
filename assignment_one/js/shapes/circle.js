function Circle(gl, shader_program,
                center_vertex, color, radius) {
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
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.compute_colors = function (base_color, num_vertices) {
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
Circle.prototype.compute_vertices = function (center_vertex, radius) {
    var vertices = [center_vertex[0], center_vertex[1]];
    var step_size = 2*Math.PI/200;
    for (var i = 0; i <= (2*Math.PI); i+=step_size){
        var next_vertex_x = radius*Math.sin(i) + center_vertex[0];
        var next_vertex_y = radius*Math.cos(i) + center_vertex[1];
        vertices.push(next_vertex_x, next_vertex_y);
    }
    return vertices;
};
Circle.prototype.draw = function () {
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.num_points);
};