function KeyDownEventHandler(){
    this.callbacks = {};
    this.keycode = '';
    this.shift = false;
}
KeyDownEventHandler.prototype.init = function () {
    (function (instance) {
        document.onkeydown = function (event) {
            instance.keycode = event.keyCode;
            instance.shift = event.shiftKey;
            instance.notify();
        }
    })(this);
};
KeyDownEventHandler.prototype.attach_callback = function (keycode, shift, callback) {
    if (shift){
        if (this.callbacks.hasOwnProperty(keycode + 'shift')){
            this.callbacks[keycode + 'shift'].push(callback);
        }
        else {
            this.callbacks[keycode + 'shift'] = [callback];
        }
    }
    else if (this.callbacks.hasOwnProperty(keycode)){
        this.callbacks[keycode].push(callback);
    }
    else{
        this.callbacks[keycode] = [callback];
    }
};
KeyDownEventHandler.prototype.notify = function () {
    var callbacks = [];
    if (this.shift && this.callbacks.hasOwnProperty(this.keycode + 'shift')){
        callbacks = this.callbacks[this.keycode + 'shift'];
    }
    else if (!this.shift && this.callbacks.hasOwnProperty(this.keycode)) {
        callbacks = this.callbacks[this.keycode];
    }

    for(var i = 0; i < callbacks.length; i++){
        callbacks[i]();
    }
};
