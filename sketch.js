/** @format */

let playerPos;
let bulletsX = [];
let bulletsY = [];
let bulletSpeed = 10;
let movementSpeed = 5;
let bulletCanSpawn = true;
let score;
let health;


function setup() {
	createCanvas(1200, 741);
	frameRate(60);
	playerPos = 600;
    score = 0000
    health = 3
}

function spawnBullet(x) {
	if (bulletCanSpawn == true) {
		bulletsX.push(x);
		bulletsY.push(721);
	}
}

function draw() {
	background(0);
    fill(255)
    stroke(255)
    textSize(32)
    line(0, 70, 1200, 70)
    text('Score: ' + str(score), (width / 2) - 55, 40)
    text('Lives left: ' + str(health), 1000, 40)
	/* movement */
	stroke(32, 255, 32);
	fill(32, 255, 32);
	rect(playerPos, 741, 20, -20);
	rect(playerPos, 741, -20, -20);
	rect(playerPos - 3, 721, 6, -10);
	if (keyIsDown(LEFT_ARROW)) {
		if (playerPos > 20) {
			playerPos -= movementSpeed;
		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		if (playerPos < 1180) {
			playerPos += movementSpeed;
		}
	}

	/* player shooting */

	for (let i = 0; i < bulletsY.length; i++) {
		bulletsY[i] -= bulletSpeed;
	}

	for (let bulletsIndex = 0; bulletsIndex < bulletsX.length; bulletsIndex++) {
		stroke(255);
		line(
			bulletsX[bulletsIndex],
			bulletsY[bulletsIndex],
			bulletsX[bulletsIndex],
			bulletsY[bulletsIndex] + 20
		);
		if (bulletsY[bulletsIndex] <= 80) {
			bulletsY.splice(bulletsIndex, 1);
			bulletsX.splice(bulletsIndex, 1);
			bulletCanSpawn = true;
		}

		/* collision detection with objects and player bullets */
	}
}

function keyTyped() {
	if (key === "f") {
		spawnBullet(playerPos);
		bulletCanSpawn = false;
	}
}
