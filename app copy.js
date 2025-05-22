let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 400;
canvas.height = 400;

// Draw a ball
ctx.beginPath();
ctx.arc(300, 100, 20, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

// Draw a 2nd ball
ctx.beginPath();
ctx.arc(300, 160, 40, 0, Math.PI * 2);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.closePath();

// Draw a 3rd ball
ctx.beginPath();
ctx.arc(30, 120, 10, 0, Math.PI * 2);
ctx.fillStyle = 'cyan';
ctx.fill();
ctx.closePath();

// Draw a 4th ball only outline
ctx.beginPath();
ctx.arc(370, 370, 30, 0, Math.PI * 2);
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.stroke();
ctx.closePath();

// Draw a rectangle
ctx.beginPath();
ctx.rect(150, 250, 100, 100);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.closePath();

// Draw a rectangle
ctx.beginPath();
ctx.rect(100, 130, 70, 35);
ctx.fillStyle = 'black';
ctx.fill();
ctx.closePath();


// Draw a rectangle only outline
ctx.beginPath();
ctx.rect(10, 0, 50, 300);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();

// Draw a 2nd rectangle only outline
ctx.beginPath();
ctx.rect(80, 350, 70, 40);
ctx.strokeStyle = 'red';
ctx.globalAlpha = 0.3; // Set opacity to 50%
ctx.stroke();
ctx.closePath();

// Draw a 3rd rectangle only outline
ctx.beginPath();
ctx.rect(70, 340, 70, 40);
ctx.strokeStyle = 'red';
ctx.globalAlpha = 0.3; // Set opacity to 50%
ctx.stroke();
ctx.closePath();

