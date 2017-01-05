// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.



(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        canvas = document.getElementById("pathsCanvas");
        g = canvas.getContext("2d");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        renderCanvas();

        canvas.addEventListener('touchstart', fingerDown, false);
        canvas.addEventListener('touchend', fingerUp, false);
        canvas.addEventListener('touchmove', fingerMoved, false);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    var CANVAS_WIDTH = 500;
    var CANVAS_HEIGHT = 500;

    var canvas;
    var g;
    var img = new Image();
    img.src = "images/dkit01.gif";

    function renderCanvas() {
        /* draw a square */
        g.beginPath();
        g.strokeStyle = "blue"; /* stroke colour */
        g.moveTo(100, 100);
        g.lineTo(200, 100);
        g.lineTo(200, 200);
        g.lineTo(100, 200);
        g.lineTo(100, 100);
        g.stroke();
        g.closePath();

        /* draw a triangle */
        g.beginPath();
        g.strokeStyle = "red"; /* stroke colour */
        g.lineWidth = "10";
        g.lineCap = "bevel";
        g.moveTo(350, 100);
        g.lineTo(400, 200);
        g.lineTo(300, 200);
        g.lineTo(350, 100);
        g.lineTo(400, 200);
        g.stroke();
        g.closePath();

        /* draw and fill a polygon */
        g.beginPath();
        g.lineWidth = "20";
        g.setLineDash([50, 20]);
        g.lineCap = "round";
        g.lineJoin = "round";  /* Can also be miter (default) or bevel */
        g.strokeStyle = "green"; /* stroke colour */
        g.fillStyle = "yellow";
        g.moveTo(100, 300);
        g.lineTo(50, 400);
        g.lineTo(200, 450);
        g.lineTo(450, 400);
        g.lineTo(200, 400);
        g.lineTo(100, 300);
        g.lineTo(50, 400);  /* Needed to clean up wide stroke for first polygon point */
        g.fill();
        g.stroke();
        g.closePath();
        g.drawImage(img, 0, 0);
        g.drawImage(img, 300, 400, 200, 100);
    }

    var colors = new Array("yellow", "green", "blue", "black");
    var actualColor = 3;
    function fingerMoved(e) {
        var x = e.clientX;
        var y = e.clientY;
        g.beginPath();
        g.arc(x, y, 5, 0, 2 * Math.PI);
        g.fillStyle = colors[actualColor];
        g.fill();
        document.getElementById('message').innerHTML = "<p>FingerMoved actual pos:("+x+","+y  +")</p>";
    }

    function fingerDown(e) {
        var x = e.clientX;
        var y = e.clientY;
        actualColor = (actualColor + 1) % colors.length;
        g.beginPath();
        g.arc(x, y, 10, 0, 2 * Math.PI);
        g.fillStyle = colors[actualColor];
        g.fill();

        document.getElementById('message').innerHTML = "<p>FingerOn</p>";
    }

    function fingerUp(e) {
        var x = e.clientX;
        var y = e.clientY;
        g.beginPath();
        g.arc(x, y, 10, 0, 2 * Math.PI);
        g.fillStyle = colors[actualColor];
        g.fill();
        document.getElementById('message').innerHTML = "<p>FingerUp</p>";
    }
} )();