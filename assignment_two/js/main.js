window.onload = function () {

    var canvas = document.getElementById('my_canvas');

    var gl = WebGLUtility.initWebGL(canvas);

    var shader_program = new ShaderProgram(gl, new VertexShader(gl), new FragmentShader(gl));

    var artist = new Artist(gl, shader_program);

    artist.enable_depth();
    artist.set_canvas_color(0, 0, 0, 0);
    artist.set_drawing_zone(0, 0, canvas.width, canvas.height);
    artist.clear_canvas();

    var cube = artist.sketch_cube([0.0, 0.0, 0.0], 0.25);
    cube.rotate('x', 10.0);
    artist.draw([cube]);

    document.onkeydown = function(event) {
        switch (event.keyCode) {
            case 33:
                cube.translate(0.0, 0.0, 0.01);
                artist.draw([cube]);
                break;
            case 34:
                cube.translate(0.0, 0.0, -0.01);
                artist.draw([cube]);
                break;
            case 37:
                cube.translate(-0.01, 0.0, 0.0);
                artist.draw([cube]);
                break;
            case 38:
                cube.translate(0.0, 0.01, 0.0);
                artist.draw([cube]);
                break;
            case 39:
                cube.translate(0.01, 0.0, 0.0);
                artist.draw([cube]);
                break;
            case 40:
                cube.translate(0.0, -0.01, 0.0);
                artist.draw([cube]);
                break;
            case 66:
                if(event.shiftKey){
                    cube.reset();
                    cube.rotate('x', 10.0);
                    artist.draw([cube]);
                }
                break;
            case 83:
                if(event.shiftKey){
                    cube.scale(1.1, 1.1, 1.1);
                }
                else{
                    cube.scale(0.9, 0.9, 0.9);
                }
                artist.draw([cube]);
                break;
        }
    };

    var mouseDown = false;
    var lastMouseX = null;
    var lastMouseY = null;
    document.onmousedown = function (event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    };
    document.onmouseup = function (event) {
        mouseDown = false;
    };
    document.onmousemove = function (event) {
        if (!mouseDown) {
            return;
        }
        var newX = event.clientX;
        var newY = event.clientY;

        var deltaX = newX - lastMouseX;
        cube.rotate('y', deltaX/10);

        var deltaY = newY - lastMouseY;
        cube.rotate('x', deltaY/10);

        lastMouseX = newX;
        lastMouseY = newY;

        artist.draw([cube]);
    };
};