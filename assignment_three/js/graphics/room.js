function Room(width, height, center){
    this.width = width;
    this.height = height;
    this.center = center;

    this.floor_material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.wall_material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
    this.ceiling_material = new THREE.MeshBasicMaterial( {color: 0xcc7116, side: THREE.DoubleSide} );

    this.floor = this.__build_floor();
    this.left_wall = this.__build_left_wall();
    this.right_wall = this.__build_right_wall();
    this.front_wall = this.__build_front_wall();
    this.back_wall = this.__build_back_wall();
    this.ceiling = this.__build_ceiling();
}
Room.prototype.__build_plane = function (center, rotation, width, height, material) {
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);

    plane.position.x = center[0];
    plane.position.y = center[1];
    plane.position.z = center[2];

    plane.rotation.x = rotation[0] * (Math.PI / 180);
    plane.rotation.y = rotation[1] * (Math.PI / 180);
    plane.rotation.z = rotation[2] * (Math.PI / 180);

    return plane;
};
Room.prototype.__build_floor = function () {
    return this.__build_plane(
        [this.center[0], this.center[1] - this.height/2, this.center[2]],
        [90, 0, 0],
        this.width,
        this.width,
        this.floor_material
    );
};
Room.prototype.__build_left_wall = function () {
    return this.__build_plane(
        [this.center[0]-this.width/2, this.center[1], this.center[2]],
        [0, 90, 0],
        this.width,
        this.height,
        this.wall_material
    );
};
Room.prototype.__build_right_wall = function () {
    return this.__build_plane(
        [this.center[0]+this.width/2, this.center[1], this.center[2]],
        [0, 90, 0],
        this.width,
        this.height,
        this.wall_material
    );
};
Room.prototype.__build_front_wall = function () {
    return this.__build_plane(
        [this.center[0], this.center[1], this.center[2] - this.width/2],
        [0, 0, 0],
        this.width,
        this.height,
        this.wall_material
    );
};
Room.prototype.__build_back_wall = function () {
    return this.__build_plane(
        [this.center[0], this.center[1], this.center[2] + this.width/2],
        [0, 0, 0],
        this.width,
        this.height,
        this.wall_material
    );
};
Room.prototype.__build_ceiling = function () {
    return this.__build_plane(
        [this.center[0], this.center[1] + this.height/2, this.center[2]],
        [90, 0, 0],
        this.width,
        this.width,
        this.ceiling_material
    );
};
Room.prototype.add_to_scene = function (scene) {
    scene.add(this.floor);
    scene.add(this.left_wall);
    scene.add(this.right_wall);
    scene.add(this.front_wall);
    scene.add(this.back_wall);
    scene.add(this.ceiling);
};
