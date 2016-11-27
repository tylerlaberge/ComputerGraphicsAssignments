function SceneManager() {
    /*
     * A class responsible for scene operations.
     */
    this.scene = new THREE.Scene();

    this.textures = null;
    this.room = null;
    this.teapot = null;
    this.cube = null;
    this.sphere = null;
    this.robot = null;

    this.ambient_light = new THREE.AmbientLight( 0x404040 );
    this.point_light = new THREE.PointLight({color: 0xffffff, intensity: 1, distance: 2000});
}
SceneManager.prototype.build_scene = function (callback) {
    /*
     * Builds the scene. Creates a room, cube, sphere, teapot, and robot.
     *
     * @param callback: A function to call when the scene is finished building.
     */
    (function (instance) {
        window.load_textures(function (textures) {
            instance.textures = textures;
            instance.room = new Room(2000, 500, [0, 0, 0], instance.textures['room']);
            instance.teapot = new Teapot(100, [-250, instance.room.floor.position.y + 100, 0], instance.textures['teapot']);
            instance.cube = new Cube(
                200, 200, 200,
                [-250, instance.room.floor.position.y + 100, instance.room.front_wall.position.z + 350],
                instance.textures['cube']
            );
            instance.sphere = new Sphere(
                50,
                [instance.room.right_wall.position.x - 350, instance.room.floor.position.y + 50, 0],
                instance.textures['sphere']
            );
            instance.robot = new Robot(200, 200, 200, [0, instance.room.floor.position.y, 0],
                instance.textures['robot_base'], instance.textures['robot_arm'], instance.textures['robot_joint']);

            instance.cube.add_to_scene(instance.scene);
            instance.room.add_to_scene(instance.scene);
            instance.teapot.add_to_scene(instance.scene);
            instance.sphere.add_to_scene(instance.scene);
            instance.robot.add_to_scene(instance.scene);

            instance.point_light.position.set(
                instance.room.left_wall.position.x + 50,
                instance.room.ceiling.position.y - 50,
                instance.room.back_wall.position.z - 50
            );
            instance.scene.add(instance.point_light);
            instance.scene.add(instance.ambient_light);
            callback();
        });
    })(this);
};

