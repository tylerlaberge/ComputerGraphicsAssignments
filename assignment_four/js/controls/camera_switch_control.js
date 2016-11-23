function CameraSwitchControl(camera, next_camera) {
    /*
     * A class which handles switching between two cameras.
     *
     * @param camera: The default camera to use.
     * @param next_camera: The camera to switch to next.
     */
    this.camera = camera;
    this.next_camera = next_camera;
    this.switch_camera_key = 32;
}
CameraSwitchControl.prototype.register = function (callback) {
    /*
     * Enable this controller.
     *
     * @param callback: A callback function to call each time the camera is switched.
     */
    (function (instance) {
        document.addEventListener('keydown', function (event) {
            if (event.keyCode == instance.switch_camera_key) {
                var prev_camera = instance.camera;
                instance.switch_camera(instance.next_camera);
                instance.next_camera = prev_camera;
                callback();
            }
        });
    })(this);
};
CameraSwitchControl.prototype.switch_camera = function (camera) {
    /*
     * Switch from the current camera to the next camera.
     */
    camera.position.x = this.camera.position.x;
    camera.position.y = this.camera.position.y;
    camera.position.z = this.camera.position.z;

    camera.rotation.x = this.camera.rotation.x;
    camera.rotation.y = this.camera.rotation.y;
    camera.rotation.z = this.camera.rotation.z;

    camera.updateProjectionMatrix();

    this.camera = camera;
};