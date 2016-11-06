function Cube(width, height, depth, center){
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.center = center;
    this.mesh = this.__build_cube();
    this.__ticks = 0;
}
Cube.prototype.__build_cube = function () {
    var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

    var red = new THREE.Color(1, 0, 0);
    var green = new THREE.Color(0, 1, 0);
    var blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i + 1].color = colors[i];
        geometry.faces[4 * i + 2].color = colors[i];
        geometry.faces[4 * i + 3].color = colors[i];
    }

    var cube_material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
    var cube = new THREE.Mesh( geometry, cube_material);
    cube.position.x = this.center[0];
    cube.position.y = this.center[1];
    cube.position.z = this.center[2];

    return cube;
};
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



