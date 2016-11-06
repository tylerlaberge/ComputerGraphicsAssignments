window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1,1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    var cube = new Cube(100, 100, 100, [-250, -206, 0]);
    var room = new Room(1000, 500, [0, 0, 0]);

    cube.add_to_scene(scene);
    room.add_to_scene(scene);

    camera.position.y = -200;
    camera.position.z = room.back_wall.position.z - 100;

    var control = new WalkingCameraControl(camera);
    control.front_boundary = room.front_wall.position.z + 75;
    control.back_boundary = room.back_wall.position.z - 75;
    control.left_boundary = room.left_wall.position.x + 75;
    control.right_boundary = room.right_wall.position.x - 75;
    control.register();

    function render() {
        requestAnimationFrame(render);
        cube.tick();
        renderer.render(scene, camera);
    }
    render();
};

