window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;

    var scene = new THREE.Scene();
    var loader = new THREE.TextureLoader();
    var cube;
    var renderer;
    var camera_switch_control;
    loader.load("../textures/tiles_texture_8250083.JPG", function (room_texture) {
        loader.load("../textures/stippled_metal_2052025.JPG", function (teapot_texture) {
            loader.load("../textures/crosshatch_metal_grille_9280154.JPG", function (cube_texture) {
                var room = new Room(2000, 500, [0, 0, 0], room_texture);
                cube = new Cube(
                    200, 200, 200,
                    [-250, room.floor.position.y + 100, room.front_wall.position.z + 350],
                    cube_texture
                );
                var teapot = new Teapot(100, [-250, room.floor.position.y + 50, 0], teapot_texture);

                cube.add_to_scene(scene);
                room.add_to_scene(scene);
                teapot.add_to_scene(scene);


                var perspective_camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1,10000);
                var ortho_camera = new THREE.OrthographicCamera(WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 10000);

                camera_switch_control = new CameraSwitchControl(perspective_camera, ortho_camera);
                var camera_walk_control = new CameraWalkControl(camera_switch_control.camera, room.floor.position.y + 100);
                camera_walk_control.front_boundary = room.front_wall.position.z + 100;
                camera_walk_control.back_boundary = room.back_wall.position.z - 100;
                camera_walk_control.left_boundary = room.left_wall.position.x + 100;
                camera_walk_control.right_boundary = room.right_wall.position.x - 100;

                camera_walk_control.register();
                camera_switch_control.register(function () {
                    if (camera_switch_control.camera.type == "OrthographicCamera") {
                        camera_switch_control.camera.position.y = 0;
                    }
                    else {
                        camera_switch_control.camera.position.y = room.floor.position.y + 100;
                    }
                    camera_walk_control.camera = camera_switch_control.camera;
                    camera_walk_control.register();
                });

                camera_switch_control.camera.position.y = room.floor.position.y + 100;
                camera_switch_control.camera.position.z = room.back_wall.position.z - 100;

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(WIDTH, HEIGHT);
                document.body.appendChild(renderer.domElement);
                render();
            });
        });
    });
    function render() {
        requestAnimationFrame(render);
        cube.tick();
        renderer.render(scene, camera_switch_control.camera);
    }
};

