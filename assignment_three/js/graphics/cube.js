function Cube(width, height, depth, center, texture){
    /*
     * A class which wraps the creation of a cubes geometry, material, and mesh.
     *
     * @param width: The width of the cube. (int)
     * @param height: The height of the cube. (int)
     * @param depth: The depth of the cube. (int)
     * @param center: The center vertex of the cube. [x, y, z]
     * @param texture: The texture to apply to the cube (THREE.Texture)
     */
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
    /*
     * Add this cube to a scene.
     *
     * @param scene: The scene to add the cube to. (THREE.Scene)
     */
    scene.add(this.mesh);
};
Cube.prototype.tick = function () {
    /*
     *  Move the cube 1 unit along the x-axis.
     *
     *  Call this method in render to animate this cube.
     */
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



