function Artist(gl, shader_program) {
    /*
     * A small wrapper around the webgl object for creating objects which can be rendered to the screen.
     *
     * @param gl: The webgl object to wrap in a nicer interface.
     * @param shader_program: The ShaderProgram associated with the webgl object.
     */
    this.gl = gl;
    this.shader_program = shader_program;
}
Artist.prototype.sketch_cube = function (center_vertex, radius) {
    /*
     * Create a Cube object which can be rendered to the screen.
     *
     * @param center_vertex: The center point of the cube.
     * @param radius: The radius of the circumscribing sphere contained by the cube.
     */
    var cube = new Cube(
        this.gl, this.shader_program,
        center_vertex, radius
    );
    cube.buffer();
    return cube;
};
Artist.prototype.enable_depth = function () {
    /*
     * Allow objects to be drawn in front of, and behind each other.
     */
    this.gl.enable(this.gl.DEPTH_TEST);
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
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};
Artist.prototype.set_drawing_zone = function (x, y, width, height) {
    /*
     * Set the viewport for this artist to draw in.
     */
    this.gl.viewport(x, y, width, height);
};
