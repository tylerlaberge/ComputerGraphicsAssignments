THREE.PerspectiveCamera.prototype.move_left = function () {
    this.position.x -= 5;
};
THREE.PerspectiveCamera.prototype.move_right = function () {
    this.position.x += 5;
};
THREE.PerspectiveCamera.prototype.move_forward = function () {
    this.position.z -= 5;
};
THREE.PerspectiveCamera.prototype.move_backward = function () {
    this.position.z += 5;
};
THREE.PerspectiveCamera.prototype.look_left = function () {
    this.setRotateY(this.getRotateY() + 1);
};
THREE.PerspectiveCamera.prototype.look_right = function () {
    this.setRotateY(this.getRotateY() - 1);
};
THREE.PerspectiveCamera.prototype.look_up = function () {
    this.setRotateX(this.getRotateX() + 1);
};
THREE.PerspectiveCamera.prototype.look_down = function () {
    this.setRotateX(this.getRotateX() - 1);
};
THREE.PerspectiveCamera.prototype.setRotateX = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.x = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateY = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.y = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateZ = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.z = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.getRotateX = function(){
    return Math.round( this.rotation.x * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateY = function(){
    return Math.round( this.rotation.y * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateZ = function(){
    return Math.round( this.rotation.z * ( 180 / Math.PI ) );
};