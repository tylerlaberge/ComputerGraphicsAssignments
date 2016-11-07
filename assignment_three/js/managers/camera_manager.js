function CameraManager(width, height, boundaries, fixed_y) {
    this.width = width;
    this.height = height;
    this.boundaries = boundaries;
    this.fixed_y = fixed_y;

    this.perspective_camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    this.ortho_camera = new THREE.OrthographicCamera(
        -this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 10000
    );

    this.camera_switch_control = new CameraSwitchControl(this.perspective_camera, this.ortho_camera);
    this.camera_walk_control = new CameraWalkControl(
        this.camera_switch_control.camera, this.fixed_y
    );
    this.init();
}
CameraManager.prototype.init = function () {
    this.camera_walk_control.front_boundary = this.boundaries['front'];
    this.camera_walk_control.back_boundary = this.boundaries['back'];
    this.camera_walk_control.left_boundary = this.boundaries['left'];
    this.camera_walk_control.right_boundary = this.boundaries['right'];

    this.camera_walk_control.register();

    (function(instance){
        instance.camera_switch_control.register(function () {
            if (instance.camera_switch_control.camera.type == "OrthographicCamera") {
                instance.camera_switch_control.camera.position.y = 0;
            }
            else {
                instance.camera_switch_control.camera.position.y = instance.fixed_y;
            }
            instance.camera_walk_control.camera = instance.camera_switch_control.camera;
            instance.camera_walk_control.register();
        });
    })(this);

    this.camera_switch_control.camera.position.y = this.fixed_y;
    this.camera_switch_control.camera.position.z = this.boundaries['back'] - 100;
};
CameraManager.prototype.get_camera = function () {
    return this.camera_switch_control.camera;
};


