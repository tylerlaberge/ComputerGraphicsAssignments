function Teapot(size, center, texture) {
    /*
     * A class which wraps a Teapots geometry, material, and mesh.
     *
     * @param size: The size of the teapot. (int)
     * @param center: The center vertex of the teapot. [x, y, z]
     * @param texture: The texture of the teapot. (THREE.Texture)
     */
    this.size = size;
    this.geometry = new THREE.TeapotBufferGeometry(this.size, 15, true, true, true, false, false);
    this.material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = center[0];
    this.mesh.position.y = center[1];
    this.mesh.position.z = center[2];
}
Teapot.prototype.add_to_scene = function (scene) {
    /*
     * Add this teapot to a scene.
     *
     * @param scene: The scene to add the teapot to. (THREE.Scene)
     */
    scene.add(this.mesh);
};