window.onload = function () {
    var WIDTH = 512;
    var HEIGHT = 512;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75,WIDTH/HEIGHT, 1,10000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(350, 350, 350);
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

    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 1000;
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                camera.move_left();
                break;
            case 38:
                camera.move_forward();
                break;
            case 39:
                camera.move_right();
                break;
            case 40:
                camera.move_backward();
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
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }
    animate();
};

