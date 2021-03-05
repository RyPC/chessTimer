var timeR = 0;
var timeL = 0;
var turnR = false;
var countdown;
var end = false;

function checkQuery() {
    "use strict";
	var url = window.location.href;
	if (url.split("=")[1]){
		var time = url.split("=")[1];
        console.log(time);
        timeR = parseFloat(time) * 60;
        timeL = parseFloat(time) * 60;
        startCountdown();
	}
    else {
        end = true;
    }
}

function reset() {
    "use strict";
    window.location.reload();
}

function start() {
    "use strict";
    var time = document.getElementById("minutes").value;
    var href = window.location.href.split("?");
    window.location.replace(href[0] + (time ? ("?q=" + time) : ""));
}

function startCountdown() {
    "use strict";
    update();
    countdown = setInterval(function () {
        update();
        if (turnR) {
            timeR-= 0.1;
            if (timeR <= 0) {
                timeR = 0;
                win(false);
                clearInterval(countdown);
            }
        }
        else {
            timeL-= 0.1;
            if (timeL <= 0) {
                timeL = 0;
                win(true);
                clearInterval(countdown);
            }
        }
    }, 100);
}

function switchTurns() {
    "use strict";
    if (!end) {
        turnR = !turnR;
        update();
    }
}

function update() {
    "use strict";
    var right = document.getElementById("right");
    var left = document.getElementById("left");
    var rightTime = document.getElementById("rightTime");
    var leftTime = document.getElementById("leftTime");
    if (turnR) {
        right.style.backgroundColor = "white";
        right.style.color = "black";
        left.style.backgroundColor = "black";
        left.style.color = "white";
    }
    else {
        left.style.backgroundColor = "white";
        left.style.color = "black";
        right.style.backgroundColor = "black";
        right.style.color = "white";
    }
    
    rightTime.innerHTML = `${Math.floor(timeR / 60)}:${(timeR % 60) < 10 ? "0" + (timeR % 60).toFixed(1) : (timeR % 60).toFixed(1)}`;
    leftTime.innerHTML = `${Math.floor(timeL / 60)}:${(timeL % 60) < 10 ? "0" + (timeL % 60).toFixed(1) : (timeL % 60).toFixed(1)}`;
}

function win(rightWon) {
    "use strict";
    end = true;
    update();
    var winner = document.getElementById(rightWon ? "right" : "left");
    winner.style.backgroundColor = "#90EE90";
}


