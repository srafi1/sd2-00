var c, ctx, modeSpan, drawState, width, height, startedLine, lastCoords;;

function main() {
    console.log("setting up canvas");
    c = document.getElementById("canvas");
    modeSpan = document.getElementById("mode");
    ctx = c.getContext("2d");
    ctx.fillStyle = "#00ff00";
    c.addEventListener("click", drawObject);
    drawState = 0;
    width = 600;
    height = 600;

    startedLine = false;
    lastCoords = {
        x: 0,
        y: 0
    };
}

function toggle() {
    switch(drawState) {
        case 0:
            console.log("toggling to rectangle");
            modeSpan.innerHTML = "Rectangle";
            drawState = 1;
            ctx.fillStyle = "#ff0000";
            break;
        case 1:
            console.log("toggling to circle");
            modeSpan.innerHTML = "Circle";
            drawState = 0;
            ctx.fillStyle = "#00ff00";
            break;
    }
}

function clearScreen() {
    console.log("clearing screen");
    ctx.clearRect(0, 0, width, height);
    startedLine = false;
}

function drawObject(e) {
    e.preventDefault();
    switch(drawState) {
        case 0:
            console.log("drawing circle at " + e.offsetY + ", " + e.offsetY);
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, 20, 0, Math.PI*2);
            ctx.fill();
            if (startedLine) {
                ctx.beginPath();
                ctx.moveTo(lastCoords.x, lastCoords.y);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                lastCoords.x = e.offsetX;
                lastCoords.y = e.offsetY;
            } else {
                lastCoords.x = e.offsetX;
                lastCoords.y = e.offsetY;
                startedLine = true;
            }
            break;
        case 1:
            console.log("drawing rectangle at " + e.offsetY + ", " + e.offsetY);
            ctx.fillRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
            break;
    }
}
