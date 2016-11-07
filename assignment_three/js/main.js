window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;
    var scene_main = new SceneMain();
    scene_main.build_scene(function () {
        var camera_main = new CameraMain(
            WIDTH, HEIGHT, {
                'front': scene_main.room.front_wall.position.z + 100,
                'back': scene_main.room.back_wall.position.z - 100,
                'left': scene_main.room.left_wall.position.x + 100,
                'right': scene_main.room.right_wall.position.x - 100
            }, scene_main.room.floor.position.y + 100);
        var renderer_main = new RendererMain(WIDTH, HEIGHT, scene_main, camera_main);
        renderer_main.render();
    });
};

