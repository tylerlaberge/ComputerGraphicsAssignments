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
    scene.add(cube);

    cube.position.y = -256 + 50;

    var plane_one_material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane_two_material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
    var plane_three_material = new THREE.MeshBasicMaterial( {color: 0xf0000f, side: THREE.DoubleSide} );
    var plane_four_material = new THREE.MeshBasicMaterial( {color: 0x42f4f1, side: THREE.DoubleSide} );
    var plane_five_material = new THREE.MeshBasicMaterial( {color: 0x57015b, side: THREE.DoubleSide} );
    var plane_six_material = new THREE.MeshBasicMaterial( {color: 0xcc7116, side: THREE.DoubleSide} );

    var plane_one = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), plane_one_material); //floor
    var plane_two = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), plane_two_material); //right wall
    var plane_three = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), plane_three_material); //left wall
    var plane_four = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), plane_four_material); //far wall
    var plane_five = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), plane_five_material); //back wall
    var plane_six = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), plane_six_material); //ceiling

    plane_one.position.y = -256;
    plane_one.rotation.x = 90 * (Math.PI / 180);

    plane_two.position.x = 500;
    plane_two.rotation.y = 90 * (Math.PI / 180);

    plane_three.position.x = -500;
    plane_three.rotation.y = 90 * (Math.PI / 180);

    plane_four.position.z = -500;

    plane_five.position.z = 500;

    plane_six.position.y = 256;
    plane_six.rotation.x = 90 * (Math.PI / 180);

    scene.add(plane_one);
    scene.add(plane_two);
    scene.add(plane_three);
    scene.add(plane_four);
    scene.add(plane_five);
    scene.add(plane_six);

    camera.position.y = -200;
    camera.position.z = 400;
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                if (camera.position.x >= plane_three.position.x + 75) {
                    camera.move_left();
                }
                break;
            case 38:
                if (camera.position.z >= plane_four.position.z + 75){
                    camera.move_forward();
                }
                break;
            case 39:
                if (camera.position.x <= plane_two.position.x - 75){
                    camera.move_right();
                }
                break;
            case 40:
                if (camera.position.z <= plane_five.position.z - 75){
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
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
};

