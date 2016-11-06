function Teapot(size, center, texture) {
    this.size = size;
    this.geometry = new THREE.TeapotBufferGeometry(this.size, 15, true, true, true, false, false);
    this.material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = center[0];
    this.mesh.position.y = center[1];
    this.mesh.position.z = center[2];
}
Teapot.prototype.add_to_scene = function (scene) {
    scene.add(this.mesh);
};