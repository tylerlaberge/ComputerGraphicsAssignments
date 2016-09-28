function WebGLUtility() {
}
WebGLUtility.initWebGL = function (canvas) {
    /*
     * initialize a webgl object.
     */
    var gl = null;
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }
    return gl;
};
