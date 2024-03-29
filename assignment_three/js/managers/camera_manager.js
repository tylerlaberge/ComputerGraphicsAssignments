function CameraManager(width, height, boundaries, initial_position) {
    /*
     * A class responsible for managing camera operations.
     *
     * @param width: The width for cameras to use. (int)
     * @param height: The height for cameras to use. (int)
     * @param boundaries: The boundaries the camera can operate in. {'left', 'right', 'front', 'back'}
     * @param initial_position: The initial position of the camera. [x, y, z]
     */
    this.width = width;
    this.height = height;
    this.boundaries = boundaries;
    this.perspective_camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    this.ortho_camera = new THREE.OrthographicCamera(
        -this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 10000
    );
    this.perspective_camera.position.x = initial_position[0];
    this.perspective_camera.position.y = initial_position[1];
    this.perspective_camera.position.z = initial_position[2];
    this.ortho_camera.position.x = initial_position[0];
    this.ortho_camera.position.y = initial_position[1];
    this.ortho_camera.position.z = initial_position[2];
    this.camera_switch_control = new CameraSwitchControl(this.perspective_camera, this.ortho_camera);
    this.camera_walk_control = new CameraWalkControl(this.camera_switch_control.camera);
    this.init();
}
CameraManager.prototype.init = function () {
    /*
     * Initialize this object.
     *
     * Sets up boundaries and turns on camera controls.
     */
    this.camera_walk_control.front_boundary = this.boundaries['front'];
    this.camera_walk_control.back_boundary = this.boundaries['back'];
    this.camera_walk_control.left_boundary = this.boundaries['left'];
    this.camera_walk_control.right_boundary = this.boundaries['right'];

    this.camera_walk_control.register();

    (function(instance){
        instance.camera_switch_control.register(function () {
            if (instance.camera_switch_control.camera.type == "OrthographicCamera") {
                instance.camera_switch_control.camera.translateY(instance.height/2 - 100);
            }
            else {
                instance.camera_switch_control.camera.translateY(-instance.height/2 + 100);
            }
            instance.camera_walk_control.un_register();
            instance.camera_walk_control.camera = instance.camera_switch_control.camera;
            instance.camera_walk_control.register();
        });
    })(this);
};
CameraManager.prototype.get_camera = function () {
    /*
     * Get the current camera being used by this manager.
     */
    return this.camera_switch_control.camera;
};


