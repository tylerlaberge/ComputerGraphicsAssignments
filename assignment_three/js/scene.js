function SceneMain() {
    this.scene = new THREE.Scene();
    this.textures = null;
    this.room = null;
    this.teapot = null;
    this.cube = null;
}
SceneMain.prototype.build_scene = function (callback) {
    (function (instance) {
        window.load_textures(function (textures) {
            instance.textures = textures;
            instance.room = new Room(2000, 500, [0, 0, 0], instance.textures['room']);
            instance.teapot = new Teapot(100, [-250, instance.room.floor.position.y + 50, 0], instance.textures['teapot']);
            instance.cube = new Cube(
                200, 200, 200,
                [-250, instance.room.floor.position.y + 100, instance.room.front_wall.position.z + 350],
                instance.textures['cube']
            );

            instance.cube.add_to_scene(instance.scene);
            instance.room.add_to_scene(instance.scene);
            instance.teapot.add_to_scene(instance.scene);
            callback();
        });
    })(this);
};

