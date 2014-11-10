"use strict";

function d(data) {
    console.debug(data);
}

var main = function() {
    var canvas = document.getElementById('canvas');
    //canvas.height = window
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var context = canvas.getContext('2d');
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    var drawing = false;
    

    canvas.addEventListener(
        'touchstart',
        function(event) {
            drawing = true;
            var touch = event.changedTouches[0];
            context.beginPath();
            context.moveTo(touch.clientX, touch.clientY);
            d(event);
        },
        false
    );

    canvas.addEventListener(
        'touchend',
        function(event) {
            drawing = false;
            context.stroke();
        },
        false
    );

    canvas.addEventListener(
        'touchmove',
        function(event) {
            if (drawing) {
                var touch = event.changedTouches[0];
                context.lineTo(touch.clientX, touch.clientY);
                context.stroke();
            }
        },
        false
    );

}();