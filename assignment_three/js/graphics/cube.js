function Cube(width, height, depth, center, texture){
    this.width = width;
    this.height = height;
    this.depth = depth;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = center[0];
    this.mesh.position.y = center[1];
    this.mesh.position.z = center[2];

    this.__ticks = 0;
}
Cube.prototype.add_to_scene = function (scene) {
    scene.add(this.mesh);
};
Cube.prototype.tick = function () {
    if (this.__ticks < 500){
        this.mesh.position.x += 1;
    }
    else {
        if (this.__ticks > 1000){
            this.__ticks = 0;
        }
        this.mesh.position.x -= 1;
    }
    this.__ticks++;
};


