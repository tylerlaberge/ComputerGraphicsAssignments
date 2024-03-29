window.degrees_to_radians = function (degrees) {
    /*
     * Convert degrees to radians.
     *
     * @param degrees: The degrees to convert to radians.
     */
    return degrees * (Math.PI / 180);
};
window.load_textures = function (callback) {
    /*
     * Loads all textures into a dictionary.
     *
     * @param callback: The function to call with the loaded textures after all textures are loaded.
     */
    var loader = new THREE.TextureLoader();
    var texture_links = {
        'room': '../img/tiles_texture_8250083.JPG',
        'teapot': '../img/stippled_metal_2052025.JPG',
        'cube': '../img/crosshatch_metal_grille_9280154.JPG',
        'sphere': '../img/marble_6040025.JPG',
        'robot_base': '../img/stippled_metal_2052025.JPG',
        'robot_arm': '../img/brushed_gold_050549.JPG',
        'robot_joint': '../img/metal_crosshatch_pattern_6190173.JPG'
    };
    var textures = {};
    var loaded_textures = 0;
    for (var key in texture_links){
        if (texture_links.hasOwnProperty(key)){
            (function (texture_name) {
                loader.load(texture_links[texture_name], function (texture) {
                    textures[texture_name] = texture;
                    loaded_textures++;
                    if (loaded_textures == Object.keys(texture_links).length){
                        callback(textures);
                    }
                });
            })(key);
        }
    }
};
