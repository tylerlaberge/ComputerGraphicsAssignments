window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;
    var scene_manager= new SceneManager();
    scene_manager.build_scene(function () {
        var camera_manager = new CameraManager(
            WIDTH, HEIGHT, {
                'front': scene_manager.room.front_wall.position.z + 100,
                'back': scene_manager.room.back_wall.position.z - 100,
                'left': scene_manager.room.left_wall.position.x + 100,
                'right': scene_manager.room.right_wall.position.x - 100
            }, [0, scene_manager.room.floor.position.y + 100, scene_manager.room.back_wall.position.z - 100]);
        var renderer_manager = new RendererManager(WIDTH, HEIGHT, scene_manager, camera_manager);
        renderer_manager.render();
    });
};

