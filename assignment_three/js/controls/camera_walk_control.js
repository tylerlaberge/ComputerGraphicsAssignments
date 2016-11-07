function CameraWalkControl(camera){
    /*
     * A class which handles camera walking controls.
     *
     * @param camera: The camera to add walking controls to.
     */
    this.camera = camera;

    this.move_forward_key = 87;
    this.move_backward_key = 83;
    this.move_left_key = 65;
    this.move_right_key = 68;

    this.look_up_key = 38;
    this.look_down_key = 40;
    this.look_left_key = 37;
    this.look_right_key = 39;

    this.front_boundary = null;
    this.back_boundary = null;
    this.left_boundary = null;
    this.right_boundary = null;

    this.rotation_x = 0;

    this.keyboard_listener = null;

}
CameraWalkControl.prototype.un_register = function () {
    /*
     * Disable this controller. Call this before switching cameras.
     */
    document.removeEventListener('keydown', this.keyboard_listener);
};
CameraWalkControl.prototype.register = function () {
    /*
     * Enable this controller.
     */
    (function (instance) {
        instance.keyboard_listener = function (event) {
            switch (event.keyCode) {
                case instance.move_forward_key:
                    instance.move_forward();
                    if (!instance.within_boundaries()) {
                        instance.move_backward();
                    }
                    break;
                case instance.move_backward_key:
                    instance.move_backward();
                    if (!instance.within_boundaries()) {
                        instance.move_forward();
                    }
                    break;
                case instance.move_left_key:
                    instance.move_left();
                    if (!instance.within_boundaries()) {
                        instance.move_right();
                    }
                    break;
                case instance.move_right_key:
                    instance.move_right();
                    if (!instance.within_boundaries()) {
                        instance.move_left();
                    }
                    break;
                case instance.look_up_key:
                    instance.look_up();
                    break;
                case instance.look_down_key:
                    instance.look_down();
                    break;
                case instance.look_left_key:
                    instance.look_left();
                    break;
                case instance.look_right_key:
                    instance.look_right();
                    break;
            }
        };
    })(this);
    document.addEventListener('keydown', this.keyboard_listener);
};
CameraWalkControl.prototype.within_boundaries = function () {
    /*
     * Check whether or not the camera is within specified boundaries.
     *
     * @return True if within boundaries, else False. (boolean)
     */
    return (
        this.camera.position.x > this.left_boundary
        && this.camera.position.x < this.right_boundary
        && this.camera.position.z < this.back_boundary
        && this.camera.position.z > this.front_boundary
    );
};
CameraWalkControl.prototype.move_left = function () {
    /*
     * Move the camera -10 units along the x-axis.
     */
    this.camera.translateX(-10);
};
CameraWalkControl.prototype.move_right = function () {
    /*
     * Move the camera 10 units along the x-axis.
     */
    this.camera.translateX(10);
};
CameraWalkControl.prototype.move_forward = function () {
    /*
     * Move the camera -10 units along the z-axis.
     */
    this.camera.rotateX(-degrees_to_radians(this.rotation_x));
    this.camera.translateZ(-10);
    this.camera.rotateX(degrees_to_radians(this.rotation_x));
};
CameraWalkControl.prototype.move_backward = function () {
    /*
     * Move the camera 10 units along the z-axis.
     */
    this.camera.rotateX(-degrees_to_radians(this.rotation_x));
    this.camera.translateZ(10);
    this.camera.rotateX(degrees_to_radians(this.rotation_x));
};
CameraWalkControl.prototype.look_left = function () {
    /*
     * Rotate the camera 2 degrees along the y-axis.
     */
    this.camera.rotateX(-degrees_to_radians(this.rotation_x));
    this.camera.rotateY(degrees_to_radians(2));
    this.camera.rotateX(degrees_to_radians(this.rotation_x));
};
CameraWalkControl.prototype.look_right = function () {
    /*
     * Rotate the camera -2 degrees along the y-axis.
     */
    this.camera.rotateX(-degrees_to_radians(this.rotation_x));
    this.camera.rotateY(degrees_to_radians(-2));
    this.camera.rotateX(degrees_to_radians(this.rotation_x));
};
CameraWalkControl.prototype.look_up = function () {
    /*
     * Rotate the camera 2 degrees along the x-axis.
     */
    this.camera.rotateX(degrees_to_radians(2));
    this.rotation_x += 2;
};
CameraWalkControl.prototype.look_down = function () {
    /*
     * Rotate the camera -2 degrees along the axis.
     */
    this.camera.rotateX(degrees_to_radians(-2));
    this.rotation_x -= 2;
};