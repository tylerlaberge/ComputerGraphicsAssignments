function RendererManager(width, height, scene_manager, camera_manager) {
    this.renderer = new THREE.WebGLRenderer();
    this.width = width;
    this.height = height;
    this.scene_manager = scene_manager;
    this.camera_manager = camera_manager;
    this.init();
}
RendererManager.prototype.init = function () {
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);
};
RendererManager.prototype.render = function () {
    var instance = this;
    requestAnimationFrame(function() {
        instance.render();
    });
    this.scene_manager.cube.tick();
    this.scene_manager.sphere.tick();
    this.renderer.render(this.scene_manager.scene, this.camera_manager.get_camera());
};


