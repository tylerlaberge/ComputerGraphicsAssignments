function RendererManager(width, height, scene_main, camera_main) {
    this.renderer = new THREE.WebGLRenderer();
    this.width = width;
    this.height = height;
    this.scene_main = scene_main;
    this.camera_main = camera_main;
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
    this.scene_main.cube.tick();
    this.renderer.render(this.scene_main.scene, this.camera_main.get_camera());
};


