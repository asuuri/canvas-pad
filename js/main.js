"use strict";

function setStroke(context, color) {
    if (color !== undefined) {
        context.strokeStyle = color;
    } else {
        context.strokeStyle = 'red';
    }
    context.lineWidth = 5;
    context.lineCap = 'round';
}

function initColorPicker(colorSetter) {
    var pickers = document.querySelectorAll('.color-selector li');

    for(var index = 0; index < pickers.length; index++) {
        var picker = pickers[index];
        var color = picker.dataset.color;

        picker.style.backgroundColor = color;
        picker.addEventListener('touchstart', function() {
            var active = document.querySelector('.color-selector li.active');
            if (active) {
                active.className = '';
            }

            colorSetter(this.dataset.color);

            this.className = 'active';
        });
    }
}

var main = function() {
    var canvas = document.getElementById('canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var context = canvas.getContext('2d');
    setStroke(context);

    initColorPicker(
        function(color) {
            setStroke(context, color);
        }
    );

    var drawing = false;

    window.addEventListener(
        'resize',
        function() {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            setStroke(context);
        },
        false
    );

    canvas.addEventListener(
        'touchstart',
        function(event) {
            drawing = true;
            var touch = event.changedTouches[0];
            context.beginPath();
            context.moveTo(touch.clientX, touch.clientY);
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