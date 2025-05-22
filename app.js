let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

// Game state
let gameActive = true;
let score = 0;
let lives = 3;

// Define ball as an object
const pallo = {
    x: Math.random() * (390 - 10) + 10,
    y: Math.random() * (390 - 10) + 10,
    sade: 10,
    vari: "#0095DD",
    dx: (Math.random() < 0.5 ? -1 : 1) * 2,
    dy: (Math.random() < 0.5 ? -1 : 1) * 2
};

// Define center ball as an object
const keskuspallo = {
    x: 200,
    y: 200,
    sade: 100,
    vari: 'gray'
};

// Define paddle as an object
const maila = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    vari: "blue",
    nopeus: 5
};

// Draw functions
function piirraPallo() {
    ctx.beginPath();
    ctx.arc(pallo.x, pallo.y, pallo.sade, 0, Math.PI * 2);
    ctx.fillStyle = pallo.vari;
    ctx.fill();
    ctx.closePath();
}

function piirraKeskuspallo() {
    ctx.beginPath();
    ctx.arc(keskuspallo.x, keskuspallo.y, keskuspallo.sade, 0, Math.PI * 2);
    ctx.fillStyle = keskuspallo.vari;
    ctx.fill();
    ctx.closePath();
}

function piirraMaila() {
    ctx.beginPath();
    ctx.rect(maila.x, maila.y, maila.width, maila.height);
    ctx.fillStyle = maila.vari;
    ctx.fill();
    ctx.closePath();
}

function naytaTilasto() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 20);
    ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
}

function naytaGameOver() {
    ctx.font = "36px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2 - 40);
    ctx.font = "24px Arial";
    ctx.fillText("Final Score: " + score, canvas.width/2, canvas.height/2);
    ctx.fillText("Click to play again", canvas.width/2, canvas.height/2 + 40);
    ctx.textAlign = "left";
}

function resetGame() {
    gameActive = true;
    score = 0;
    lives = 3;
    
    pallo.x = Math.random() * (390 - 10) + 10;
    pallo.y = Math.random() * (390 - 10) + 10;
    pallo.dx = (Math.random() < 0.5 ? -1 : 1) * 2;
    pallo.dy = (Math.random() < 0.5 ? -1 : 1) * 2;
    
    maila.x = canvas.width / 2 - 50;
}

// Collision detection
function tarkistaTormaykset() {
    // Wall collision
    if (pallo.x + pallo.sade > canvas.width || pallo.x - pallo.sade < 0) {
        pallo.dx = -pallo.dx;
    }
    if (pallo.y - pallo.sade < 0) {
        pallo.dy = -pallo.dy;
    }
    
    // Center ball collision
    const distanceSquared = (pallo.x - keskuspallo.x)**2 + (pallo.y - keskuspallo.y)**2;
    const radiusSum = pallo.sade + keskuspallo.sade;
    
    if (distanceSquared < radiusSum**2) {
        pallo.vari = "black";
    } else {
        pallo.vari = "#0095DD";
    }
    
    // Paddle collision
    if (pallo.y + pallo.sade > maila.y && 
        pallo.x > maila.x && 
        pallo.x < maila.x + maila.width) {
        pallo.dy = -pallo.dy;
        score += 5; // Points for hitting the paddle
    }
}

// Update ball position
function paivitaPallonSijainti() {
    pallo.x += pallo.dx;
    pallo.y += pallo.dy;
    
    // Check if ball went below paddle
    if (pallo.y + pallo.sade > canvas.height) {
        lives--;
        if (lives <= 0) {
            gameActive = false;
        } else {
            // Reset ball position
            pallo.x = Math.random() * (390 - 10) + 10;
            pallo.y = Math.random() * (390 - 10) + 10;
            pallo.dx = (Math.random() < 0.5 ? -1 : 1) * 2;
            pallo.dy = (Math.random() < 0.5 ? -1 : 1) * 2;
        }
    }
}

// Mouse movement handler
function hiiriliikkuu(e) {
    if (!gameActive) return;
    
    const relativeX = e.clientX - canvas.offsetLeft;
    
    if (relativeX > 0 && relativeX < canvas.width) {
        maila.x = relativeX - maila.width / 2;
        
        // Keep paddle within canvas bounds
        if (maila.x < 0) {
            maila.x = 0;
        }
        if (maila.x + maila.width > canvas.width) {
            maila.x = canvas.width - maila.width;
        }
    }
}

/* Keyboard controls (commented out but available for future use)
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && maila.x < canvas.width - maila.width) {
        maila.x += maila.nopeus;
    } else if (event.key === 'ArrowLeft' && maila.x > 0) {
        maila.x -= maila.nopeus;
    }
});
*/


// Click handler for restart
canvas.addEventListener('click', function() {
    if (!gameActive) {
        resetGame();
    }
});

// Add mouse event listener
document.addEventListener("mousemove", hiiriliikkuu);

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    piirraKeskuspallo();
    piirraMaila();
    naytaTilasto();
    
    if (gameActive) {
        piirraPallo();
        tarkistaTormaykset();
        paivitaPallonSijainti();
    } else {
        naytaGameOver();
    }
}

setInterval(draw, 20);