window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;

    var scene_manager = new SceneManager();

    //Create the room, sphere, cube, and teapot. When finished create the camera and render managers.
    scene_manager.build_scene(function () {

        //Create the Perspective and Orthographic camera's complete with functioning keyboard control and boundaries.
        var camera_manager = new CameraManager(
            WIDTH, HEIGHT, {
                'front': scene_manager.room.front_wall.position.z + 100,
                'back': scene_manager.room.back_wall.position.z - 100,
                'left': scene_manager.room.left_wall.position.x + 100,
                'right': scene_manager.room.right_wall.position.x - 100
            }, [0, scene_manager.room.floor.position.y + 100, scene_manager.room.back_wall.position.z - 150]);

        var renderer_manager = new RendererManager(WIDTH, HEIGHT, scene_manager, camera_manager);

        //Render the scene.
        renderer_manager.render();
    });
};

