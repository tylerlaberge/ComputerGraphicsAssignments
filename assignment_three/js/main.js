window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1,1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    // colors
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
    var cube = new THREE.Mesh(geometry, cube_material);
    cube.position.x = -250;
    cube.position.y = -256 + 50;
    scene.add(cube);


    var room = new Room(1000, 500, [0, 0, 0]);
    room.add_to_scene(scene);

    camera.position.y = -200;
    camera.position.z = 200;
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                if (camera.position.x >= room.left_wall.position.x + 75) {
                    camera.move_left();
                }
                break;
            case 38:
                if (camera.position.z >= room.front_wall.position.z + 75){
                    camera.move_forward();
                }
                break;
            case 39:
                if (camera.position.x <= room.right_wall.position.x - 75){
                    camera.move_right();
                }
                break;
            case 40:
                if (camera.position.z <= room.back_wall.position.z - 75){
                    camera.move_backward();
                }
                break;
            case 65:
                camera.look_left();
                break;
            case 68:
                camera.look_right();
                break;
            case 87:
                camera.look_up();
                break;
            case 83:
                camera.look_down();
                break;
        }
    };
    var ticks = 0;
    var offset_x = 0;
    function move_cube(){
        if (ticks < 500){
            cube.position.x += 1;
        }
        else {
            if (ticks > 1000){
                ticks = 0;
            }
            cube.position.x -= 1;
        }
        ticks++;
    }
    function render() {
        requestAnimationFrame(render);
        move_cube();
        renderer.render(scene, camera);
    }
    render();
};

