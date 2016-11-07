function Sphere(radius, center, texture){
    this.radius = radius;

    this.geometry = new THREE.SphereGeometry(this.radius, 100, 100);
    this.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x = center[0];
    this.mesh.position.y = center[1];
    this.mesh.position.z = center[2];

    this.__ticks = 0;
}
Sphere.prototype.add_to_scene = function (scene) {
    scene.add(this.mesh);
};
Sphere.prototype.tick = function () {
    if (this.__ticks < 500){
        this.mesh.position.z += 1;
    }
    else {
        if (this.__ticks > 1000){
            this.__ticks = 0;
        }
        this.mesh.position.z -= 1;
    }
    this.__ticks++;
};



