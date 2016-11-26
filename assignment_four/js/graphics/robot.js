function Robot(width, height, depth, center, base_texture, arm_texture, joint_texture){
    /*
     * A class which wraps the creation of a robots torso, arm, hand, and base.
     *
     * @param width: The width of the robot. (int)
     * @param height: The height of the robot. (int)
     * @param depth: The depth of the robot. (int)
     * @param center: The center vertex of the robot. [x, y, z]
     * @param texture: The texture to apply to the robot (THREE.Texture)
     */
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.center = center;

    this.base_material = new THREE.MeshLambertMaterial({map:base_texture, side: THREE.DoubleSide});
    this.arm_material = new THREE.MeshLambertMaterial({map:arm_texture, side: THREE.DoubleSide});
    this.joint_material = new THREE.MeshLambertMaterial({map:joint_texture, side: THREE.DoubleSide});

    this.forearm = new THREE.Object3D();
    this.upperarm = new THREE.Object3D();
    this.body = new THREE.Object3D();
    this.shoulder = new THREE.Object3D();
    this.elbow = new THREE.Object3D();
    this.hand = new THREE.Object3D();
    this.ball = new THREE.Object3D();
    this.ball_sphere = null;

    this.forearm.length = this.height;
    this.upperarm.length = this.height;
    this.shoulder.radius = 20;
    this.elbow.radius = 20;
    this.hand.radius = 20;
    this.body.length = 25;

    this.__reverse = false;
    this.__attached = false;

    this.__build_robot();
}

Robot.prototype.rotate_shoulder = function (rotation_x, rotation_y, rotation_z) {
    this.shoulder.translateY(-(this.shoulder.radius*2 + this.upperarm.length));
    this.shoulder.rotateX(degrees_to_radians(rotation_x));
    this.shoulder.rotateY(degrees_to_radians(rotation_y));
    this.shoulder.rotateZ(degrees_to_radians(rotation_z));
    this.shoulder.translateY(this.shoulder.radius*2 + this.upperarm.length);
};
Robot.prototype.rotate_upperarm = function(rotation_x, rotation_y, rotation_z) {
    this.upperarm.translateY(-(this.shoulder.radius*2 + this.upperarm.length));
    this.upperarm.rotateX(degrees_to_radians(rotation_x));
    this.upperarm.rotateY(degrees_to_radians(rotation_y));
    this.upperarm.rotateZ(degrees_to_radians(rotation_z));
    this.upperarm.translateY(this.shoulder.radius*2 + this.upperarm.length);
};
Robot.prototype.rotate_elbow = function (rotation_x, rotation_y, rotation_z) {
    this.elbow.translateY(-(this.elbow.radius*2 + this.forearm.length));
    this.elbow.rotateX(degrees_to_radians(rotation_x));
    this.elbow.rotateY(degrees_to_radians(rotation_y));
    this.elbow.rotateZ(degrees_to_radians(rotation_z));
    this.elbow.translateY(this.elbow.radius*2 + this.forearm.length);
};
Robot.prototype.rotate_forearm = function (rotation_x, rotation_y, rotation_z) {
    this.forearm.translateY(-(this.elbow.radius*2));
    this.forearm.rotateX(degrees_to_radians(rotation_x));
    this.forearm.rotateY(degrees_to_radians(rotation_y));
    this.forearm.rotateZ(degrees_to_radians(rotation_z));
    this.forearm.translateY(this.elbow.radius*2);
};
Robot.prototype.add_to_scene = function (scene) {
    /*
     * Add this robot to a scene.
     *
     * @param scene: The scene to add the robot to. (THREE.Scene)
     */
    scene.add(this.body);
};
Robot.prototype.tick = function () {
    if (!this.__reverse) {
        if (this.forearm.rotation.z > -Math.PI/2){
            this.rotate_forearm(0, 0, -1);
        }
        else if (this.upperarm.rotation.z > -Math.sqrt(2)/2) {
            this.rotate_upperarm(0, 0, -0.5);
        }
        else {
            if (this.__attached) {
                this.hand.remove(this.ball);
                this.ball_sphere.position.x = this.center[0] + Math.sqrt(Math.pow(this.upperarm.length, 2)
                        + Math.pow(this.hand.radius + this.forearm.length, 2));
                this.ball_sphere.position.y = this.center[1] + this.body.length/2;
                this.ball_sphere.position.z = this.center[2];
                this.body.add(this.ball);
                this.__attached = false;
            }
            else {
                this.body.remove(this.ball);
                this.ball_sphere.position.x = this.center[0];
                this.ball_sphere.position.y = this.center[1] + this.upperarm.length + this.forearm.length + this.hand.radius * 2;
                this.ball_sphere.position.z = this.center[2];
                this.hand.add(this.ball);
                this.__attached = true;
            }
            this.__reverse = true;
        }
    }
    else {
        if (this.upperarm.rotation.z < 0) {
            this.rotate_upperarm(0, 0, 0.5);
        }
        else if (this.forearm.rotation.z < 0) {
            this.rotate_forearm(0, 0, 1);
        }
        else {
            this.__reverse = false;
        }
    }
};
Robot.prototype.__build_robot = function () {
    this.__build_body();
    this.__build_upperarm();
    this.__build_forearm();
    this.__build_ball();
};
Robot.prototype.__build_body = function () {
    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(this.width, this.body.length, this.depth),
        this.base_material
    );
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 100, 100),
        this.joint_material
    );

    cube.position.x = this.center[0];
    cube.position.y = this.center[1];
    cube.position.z = this.center[2];

    sphere.position.x = this.center[0];
    sphere.position.y = cube.position.y + this.body.length/2;
    sphere.position.z = this.center[2];

    this.shoulder.add(sphere);
    this.body.add(cube);
    this.body.add(this.shoulder);
};
Robot.prototype.__build_upperarm = function() {
    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 20, this.upperarm.length),
        this.arm_material
    );
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 100, 100),
        this.joint_material
    );

    cylinder.position.x = this.center[0];
    cylinder.position.y = this.center[1] + this.upperarm.length/2;
    cylinder.position.z = this.center[2];

    sphere.position.x = this.center[0];
    sphere.position.y = cylinder.position.y + this.upperarm.length/2;
    sphere.position.z = this.center[2];

    this.elbow.add(sphere);
    this.upperarm.add(cylinder);
    this.upperarm.add(this.elbow);

    this.shoulder.add(this.upperarm);
};
Robot.prototype.__build_forearm = function() {
    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 20, this.forearm.length),
        this.arm_material
    );
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 100, 100),
        this.joint_material
    );

    cylinder.position.x = this.center[0];
    cylinder.position.y = this.center[1] + this.upperarm.length + this.forearm.length/2;
    cylinder.position.z = this.center[2];

    sphere.position.x = this.center[0];
    sphere.position.y = cylinder.position.y + this.forearm.length/2;
    sphere.position.z = this.center[2];

    this.hand.add(sphere);

    this.forearm.add(cylinder);
    this.forearm.add(this.hand);

    this.elbow.add(this.forearm);
};
Robot.prototype.__build_ball = function () {
    this.ball_sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 100, 100),
        this.joint_material
    );
    this.ball_sphere.position.x = this.center[0] + Math.sqrt(Math.pow(this.upperarm.length, 2)
            + Math.pow(this.hand.radius + this.forearm.length, 2));
    this.ball_sphere.position.y = this.center[1] + this.body.length/2;
    this.ball_sphere.position.z = this.center[2];

    this.ball.add(this.ball_sphere);
    this.body.add(this.ball);
};

