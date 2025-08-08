// main.js - Version Mimi
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let groundLevel = canvas.height - 100;

// Charger Mimi
const playerImage = new Image();
playerImage.src = "Mimi.png";

const player = {
    x: 100,
    y: groundLevel - 54,
    width: 54,
    height: 54,
    dy: 0,
    jumping: false,
    speed: 5
};

// Charger l'os (pièce)
const boneImage = new Image();
boneImage.src = "bone.png";

let bones = [];
let score = 0;

// Charger chat (ennemi)
const catImage = new Image();
catImage.src = "cat.png";

let cats = [];

function spawnBone() {
    let bone = {
        x: canvas.width,
        y: groundLevel - 40,
        width: 30,
        height: 30
    };
    bones.push(bone);
}

function spawnCat() {
    let cat = {
        x: canvas.width,
        y: groundLevel - 54,
        width: 54,
        height: 54
    };
    cats.push(cat);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravité
    player.y += player.dy;
    if (player.y + player.height < groundLevel) {
        player.dy += gravity;
    } else {
        player.dy = 0;
        player.y = groundLevel - player.height;
        player.jumping = false;
    }

    // Dessiner le sol
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, groundLevel, canvas.width, 100);

    // Dessiner Mimi
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Nom au-dessus
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Mimi", player.x + player.width / 2, player.y - 10);

    // Déplacement des os
    for (let i = bones.length - 1; i >= 0; i--) {
        bones[i].x -= 5;
        ctx.drawImage(boneImage, bones[i].x, bones[i].y, bones[i].width, bones[i].height);

        // Collision os
        if (
            player.x < bones[i].x + bones[i].width &&
            player.x + player.width > bones[i].x &&
            player.y < bones[i].y + bones[i].height &&
            player.y + player.height > bones[i].y
        ) {
            bones.splice(i, 1);
            score++;
        }
    }

    // Déplacement des chats
    for (let i = cats.length - 1; i >= 0; i--) {
        cats[i].x -= 4;
        ctx.drawImage(catImage, cats[i].x, cats[i].y, cats[i].width, cats[i].height);

        // Collision chat (perd la partie)
        if (
            player.x < cats[i].x + cats[i].width &&
            player.x + player.width > cats[i].x &&
            player.y < cats[i].y + cats[i].height &&
            player.y + player.height > cats[i].y
        ) {
            alert("Mimi a été attrapée par un chat !");
            document.location.reload();
        }
    }

    // Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Os: " + score, 50, 30);

    requestAnimationFrame(update);
}

function jump() {
    if (!player.jumping) {
        player.dy = -10;
        player.jumping = true;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        jump();
    }
    if (e.code === "ArrowRight") {
        player.x += player.speed;
    }
    if (e.code === "ArrowLeft") {
        player.x -= player.speed;
    }
});

// Spawns
setInterval(spawnBone, 2000);
setInterval(spawnCat, 3000);

update();
