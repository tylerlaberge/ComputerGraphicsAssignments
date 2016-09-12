function WebGLUtility() {}
WebGLUtility.initWebGL = function initWebGL(canvas) {
    var gl = null;
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }
    return gl;
};
WebGLUtility.prepareToDraw = function prepareToDraw(gl, canvas){
    // Clear the canvas
    gl.clearColor(0,0,0,0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0,0,canvas.width,canvas.height);
};