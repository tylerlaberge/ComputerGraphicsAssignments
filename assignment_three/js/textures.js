window.load_textures = function (callback) {
    var loader = new THREE.TextureLoader();
    var texture_links = {
        'room': '../img/tiles_texture_8250083.JPG',
        'teapot': '../img/stippled_metal_2052025.JPG',
        'cube': '../img/crosshatch_metal_grille_9280154.JPG'
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
