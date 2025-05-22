let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

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
    nopeus: 5  // Speed for keyboard controls
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
        // Increase speed by 10% each hit
        pallo.dx *= 1.1;
        pallo.dy *= 1.1;
    }
}

// Update ball position
function paivitaPallonSijainti() {
    pallo.x += pallo.dx;
    pallo.y += pallo.dy;
}

// Mouse movement handler
function hiiriliikkuu(e) {
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

// Add mouse event listener
document.addEventListener("mousemove", hiiriliikkuu);

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    piirraKeskuspallo();
    piirraPallo();
    piirraMaila();
    tarkistaTormaykset();
    paivitaPallonSijainti();
    
    // Game over if ball goes below paddle
    if (pallo.y + pallo.sade > canvas.height) {
        alert("Game Over!");
        document.location.reload();
    }
}

setInterval(draw, 20);