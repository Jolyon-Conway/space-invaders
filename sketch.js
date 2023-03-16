/** @format */

let playerPos;
let bulletsX = [];
let bulletsY = [];
let bulletSpeed = 10;
let movementSpeed = 5;
let bulletCanSpawn = true;
let alive = false;
let score;
let health;
let startColour = 255;
let shieldHealth = [
	[
		[4, 4, 4],
		[4, 4],
		[4, 4],
		[4, 4, 4],
	],
	[
		[4, 4, 4],
		[4, 4],
		[4, 4],
		[4, 4, 4],
	],
	[
		[4, 4, 4],
		[4, 4],
		[4, 4],
		[4, 4, 4],
	],
	[
		[4, 4, 4],
		[4, 4],
		[4, 4],
		[4, 4, 4],
	],
];
let shieldPosX = [
	[
		[100, 100, 100],
		[120, 120],
		[140, 140],
		[160, 160, 160],
	],
	[
		[400, 400, 400],
		[420, 420],
		[440, 440],
		[460, 460, 460],
	],
	[
		[700, 700, 700],
		[720, 720],
		[740, 740],
		[760, 760, 760],
	],
	[
		[1000, 1000, 1000],
		[1020, 1020],
		[1040, 1040],
		[1060, 1060, 1060],
	],
];
let shieldPosY = [
	[
		[680, 660, 640],
		[660, 640],
		[660, 640],
		[680, 660, 640],
	],
	[
		[680, 660, 640],
		[660, 640],
		[660, 640],
		[680, 660, 640],
	],
	[
		[680, 660, 640],
		[660, 640],
		[660, 640],
		[680, 660, 640],
	],
	[
		[680, 660, 640],
		[660, 640],
		[660, 640],
		[680, 660, 640],
	],
];
let shieldPictureR = [
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
];
let shieldPictureG = [
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
];
let shieldPictureB = [
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
	[
		[0, 0, 0],
		[0, 0],
		[0, 0],
		[0, 0, 0],
	],
];
let shieldPictureO = [
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
	[
		[255, 255, 255],
		[255, 255],
		[255, 255],
		[255, 255, 255],
	],
];
/* enemies */

/* row 1 */
let row1X = [];

function setup() {
	createCanvas(1200, 741);
	frameRate(60);
	playerPos = 600;
	score = 0;
	health = 3;
}

function spawnBullet(x) {
	if (bulletCanSpawn == true) {
		bulletsX.push(x);
		bulletsY.push(721);
	}
}

function draw() {
	background(0);
	fill(255);
	stroke(255);
	textSize(32);
	line(0, 70, 1200, 70);
	text("Score: " + str(score), width / 2 - 55, 40);
	text("Lives left: " + str(health), 1000, 40);
	/* movement */
	if (alive == true) {
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
		}

		/* shields */
		for (let block = 0; block < shieldPosX.length; block++) {
			for (let collumns = 0; collumns < shieldPosX[block].length; collumns++) {
				for (
					let piece = 0;
					piece < shieldPosX[block][collumns].length;
					piece++
				) {
					for (
						let bulletsIndex = 0;
						bulletsIndex < bulletsX.length;
						bulletsIndex++
					) {
						if (
							bulletsX[bulletsIndex] >= shieldPosX[block][collumns][piece] &&
							bulletsX[bulletsIndex] <=
								shieldPosX[block][collumns][piece] + 20 &&
							shieldHealth[block][collumns][piece] > 0
						) {
							if (
								bulletsY[bulletsIndex] <= shieldPosY[block][collumns][piece] &&
								bulletsY[bulletsIndex] >=
									shieldPosY[block][collumns][piece] - 20
							) {
								shieldHealth[block][collumns][piece]--;
								bulletsY.splice(bulletsIndex, 1);
								bulletsX.splice(bulletsIndex, 1);
								bulletCanSpawn = true;
							}
						}
					}
					if (shieldHealth[block][collumns][piece] == 4) {
						shieldPictureR[block][collumns][piece] = 0;
						shieldPictureG[block][collumns][piece] = 255;
						shieldPictureB[block][collumns][piece] = 0;
					} else if (shieldHealth[block][collumns][piece] == 3) {
						shieldPictureR[block][collumns][piece] = 255;
						shieldPictureG[block][collumns][piece] = 240;
						shieldPictureB[block][collumns][piece] = 3;
					} else if (shieldHealth[block][collumns][piece] == 2) {
						shieldPictureR[block][collumns][piece] = 255;
						shieldPictureG[block][collumns][piece] = 121;
						shieldPictureB[block][collumns][piece] = 3;
					} else if (shieldHealth[block][collumns][piece] == 1) {
						shieldPictureR[block][collumns][piece] = 255;
						shieldPictureG[block][collumns][piece] = 0;
						shieldPictureB[block][collumns][piece] = 0;
					} else {
						shieldPictureR[block][collumns][piece] = 0;
						shieldPictureG[block][collumns][piece] = 0;
						shieldPictureB[block][collumns][piece] = 0;
						shieldPictureO[block][collumns][piece] = 0;
					}
					if (shieldHealth[block][collumns][piece] > 0) {
						stroke(0, 0, 0, 0);
						fill(
							shieldPictureR[block][collumns][piece],
							shieldPictureG[block][collumns][piece],
							shieldPictureB[block][collumns][piece],
							shieldPictureO[block][collumns][piece]
						);
						rect(
							shieldPosX[block][collumns][piece],
							shieldPosY[block][collumns][piece],
							20,
							-20
						);
					}
				}
			}
		}

		/* enemies */
	} else {
		fill(startColour);
		rect(575, 325, 50, 50);
		fill(0);
		triangle(590, 340, 615, 350, 590, 360);
		fill(255);
		textSize(32);
		text("Press Button To Start", 460, 410);
		if (mouseX >= 575 && mouseX <= 625) {
			if (mouseY >= 325 && mouseY <= 375) {
				startColour = 150;
			} else {
				startColour = 255;
			}
		}
	}
}

function keyTyped() {
	if (key === "f") {
		spawnBullet(playerPos);
		bulletCanSpawn = false;
	}
}

function mouseClicked() {
	if (alive == false) {
		if (mouseX >= 575 && mouseX <= 625) {
			if (mouseY >= 325 && mouseY <= 375) {
				alive = true;
			}
		}
	}
}
 