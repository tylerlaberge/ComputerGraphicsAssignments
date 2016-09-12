function Square(
    gl,
    shader_program,
    vertex_a, vertex_b, vertex_c, vertex_d,
    color_a, color_b, color_c, color_d
){
    Shape.call(
        this,
        gl,
        shader_program,
        [
            vertex_a[0], vertex_a[1], vertex_a[2],
            vertex_b[0], vertex_b[1], vertex_b[2],
            vertex_c[0], vertex_c[1], vertex_c[2],
            vertex_d[0], vertex_d[1], vertex_d[2]
        ],
        3,
        [
            color_a[0], color_a[1], color_a[2], color_a[3],
            color_b[0], color_b[1], color_b[2], color_b[3],
            color_c[0], color_c[1], color_c[2], color_c[3],
            color_d[0], color_d[1], color_d[2], color_d[3]
        ],
        4
    );
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.draw = function (hollow) {
    this.prepare_to_draw();
    if(hollow){
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }
    else {
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
    }
    this.finish_drawing();
};