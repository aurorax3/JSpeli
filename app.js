let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let x = 15;
let y = 100;

let dx = 1;
let dy = 1;

// First ball

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;

    // Collision detection

    if (x + 10 > canvas.width || x - 10 < 0) {
    dx = -dx;
    }
    if (y + 10 > canvas.height || y - 10 < 0) {
    dy = -dy;
    }

}

setInterval(draw, 20);

// 2nd ball

let x2 = 300;
let y2 = 50;
let dx2 = -2;
let dy2 = 2;

function draw2() {
    ctx.beginPath();
    ctx.arc(x2, y2, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    x2 += dx2;
    y2 += dy2;

    // Collision detection

    if (x2 + 20 > canvas.width || x2 - 20 < 0) {
    dx2 = -dx2;
    }
    if (y2 + 20 > canvas.height || y2 - 20 < 0) {
    dy2 = -dy2;
    }
}

setInterval(draw2, 20);

function checkBallCollision() {
    let dxBall = x2 - x;
    let dyBall = y2 - y;
    let distance = Math.sqrt(dxBall * dxBall + dyBall * dyBall);
    let minDist = 10 + 20; // radii sum

    if (distance < minDist) {
        // Normalize vector
        let nx = dxBall / distance;
        let ny = dyBall / distance;

        // Project velocities onto the collision normal
        let p1 = dx * nx + dy * ny;
        let p2 = dx2 * nx + dy2 * ny;

        // Swap the projections (simple elastic collision)
        let diff1 = p2 - p1;
        let diff2 = p1 - p2;

        dx += diff1 * nx;
        dy += diff1 * ny;
        dx2 += diff2 * nx;
        dy2 += diff2 * ny;

        // Move balls apart to prevent sticking
        let overlap = minDist - distance;
        x -= nx * overlap / 2;
        y -= ny * overlap / 2;
        x2 += nx * overlap / 2;
        y2 += ny * overlap / 2;
    }
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update first ball
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
    if (x + 10 > canvas.width || x - 10 < 0) dx = -dx;
    if (y + 10 > canvas.height || y - 10 < 0) dy = -dy;

    // Draw and update second ball
    ctx.beginPath();
    ctx.arc(x2, y2, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    x2 += dx2;
    y2 += dy2;
    if (x2 + 20 > canvas.width || x2 - 20 < 0) dx2 = -dx2;
    if (y2 + 20 > canvas.height || y2 - 20 < 0) dy2 = -dy2;

    // Check collision between balls
    checkBallCollision();

    requestAnimationFrame(animate);
}

// Stop old intervals and start new animation loop
clearInterval();
animate();