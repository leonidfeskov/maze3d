import { WIDTH, HEIGHT, CELL_EMPTY, CELL_WALL, SIZE_CELL, COUNT_CELLS, ROTATION_SPEED, MOVE_SPEED, DIRECTIONS } from '../consts';
import generateMaze from '../generateMaze';
import Player from './Player';


export default class Game {
	constructor() {
		var canvas = document.getElementById('canvas');
		canvas.setAttribute('width', WIDTH);
		canvas.setAttribute('height', HEIGHT);

		this.renderer = new THREE.WebGLRenderer({canvas: canvas});
		this.renderer.setClearColor(0x000000);

		this.scene = new THREE.Scene();

		this.player = new Player(1, COUNT_CELLS - 2);
		// камера должна перемещаться вместе с игроком
		this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 5000);
		this.camera.position.set(this.player.x * SIZE_CELL, 0, this.player.y * SIZE_CELL);

		this.light = new THREE.PointLight(0xffffff, 1, SIZE_CELL * 4);
		this.light.position.set(this.player.x * SIZE_CELL, 0, this.player.y * SIZE_CELL)
		this.scene.add(this.light);

		var textureLoader = new THREE.TextureLoader();
		this.textureWall = textureLoader.load('f/i/wall.png');
		this.textureWall.wrapS = this.textureWall.wrapT = THREE.RepeatWrapping;
		this.textureWall.repeat.set( 2, 2 );

		this.textureFloor = textureLoader.load('f/i/floor.jpg');
		this.textureFloor.wrapS = this.textureFloor.wrapT = THREE.RepeatWrapping;
		this.textureFloor.repeat.set( COUNT_CELLS, COUNT_CELLS );

		this.textureCeil = textureLoader.load('f/i/ceil.jpg');
		this.textureCeil.wrapS = this.textureCeil.wrapT = THREE.RepeatWrapping;
		this.textureCeil.repeat.set( COUNT_CELLS, COUNT_CELLS );

		setTimeout(() => {
			this.drawMaze();
			this.renderer.render(this.scene, this.camera);

			this.initPlayerControl();
		}, 1000);

		this.animationProcess = false;
	}

	drawMaze() {
		this.map = generateMaze(COUNT_CELLS, COUNT_CELLS);
		console.table(this.map);

		// рисуем стены
		this.geometry = new THREE.BoxGeometry(SIZE_CELL, SIZE_CELL, SIZE_CELL);
		this.material = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: this.textureWall
		});

		this.map.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell === CELL_WALL) {
					let mesh = new THREE.Mesh(this.geometry, this.material);
					mesh.position.set(x * SIZE_CELL, 0, y * SIZE_CELL);
					this.scene.add(mesh);
				}
			});
		});

		// рисуем пол и потолок
		const drawFloor = (texture, positionZ) => {
			let floorGeometry = new THREE.BoxGeometry(COUNT_CELLS * SIZE_CELL, COUNT_CELLS * SIZE_CELL, 10);
			let floorMaterial = new THREE.MeshPhongMaterial({
				color: 0x333333,
				map: texture
			});
			let floor = new THREE.Mesh(floorGeometry, floorMaterial);
			floor.position.set(Math.floor(COUNT_CELLS / 2) * SIZE_CELL, positionZ, Math.floor(COUNT_CELLS / 2) * SIZE_CELL);
			floor.rotation.set(Math.PI / 2, 0, 0);
			this.scene.add(floor);
		}

		drawFloor(this.textureFloor, -SIZE_CELL / 2);
		drawFloor(this.textureCeil, SIZE_CELL / 2);
	}

	cameraRotationLeft(angle) {
		this.camera.rotation.y += ROTATION_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.rotation.y < angle) {
			requestAnimationFrame(() => {
				this.cameraRotationLeft(angle)
			});
		}
	}

	cameraRotationRight(angle) {
		this.camera.rotation.y -= ROTATION_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.rotation.y > angle) {
			requestAnimationFrame(() => {
				this.cameraRotationRight(angle);
			});
		}
	}

	cameraMoveNorht(position) {
		this.camera.position.z -= MOVE_SPEED;
		this.light.position.z -= MOVE_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.z > position) {
			requestAnimationFrame(() => {
				this.cameraMoveNorht(position);
			});
		}
	}

	cameraMoveSouth(position) {
		this.camera.position.z += MOVE_SPEED;
		this.light.position.z += MOVE_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.z < position) {
			requestAnimationFrame(() => {
				this.cameraMoveSouth(position);
			});
		}
	}

	cameraMoveWest(position) {
		this.camera.position.x -= MOVE_SPEED;
		this.light.position.x -= MOVE_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.x > position) {
			requestAnimationFrame(() => {
				this.cameraMoveWest(position);
			});
		}
	}

	cameraMoveEast(position) {
		this.camera.position.x += MOVE_SPEED;
		this.light.position.x += MOVE_SPEED;
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.x < position) {
			requestAnimationFrame(() => {
				this.cameraMoveEast(position);
			});
		}
	}

	moveNorth() {
		var newY = this.player.y - 1;
		if (this.map[newY][this.player.x] !== CELL_WALL) {
			this.player.y = newY;
			this.cameraMoveNorht(this.camera.position.z - SIZE_CELL);
		}
	}

	moveSouth() {
		var newY = this.player.y + 1;
		if (this.map[newY][this.player.x] !== CELL_WALL) {
			this.player.y = newY;
			this.cameraMoveSouth(this.camera.position.z + SIZE_CELL)
		}
	}

	moveWest() {
		var newX = this.player.x - 1;
		if (this.map[this.player.y][newX] !== CELL_WALL) {
			this.player.x = newX;
			this.cameraMoveWest(this.camera.position.x - SIZE_CELL)
		}
	}

	moveEast() {
		var newX = this.player.x + 1;
		if (this.map[this.player.y][newX] !== CELL_WALL) {
			this.player.x = newX;
			this.cameraMoveEast(this.camera.position.x + SIZE_CELL)
		}
	}

	correctCameraRotation() {
		var directionIndex = DIRECTIONS.indexOf(this.player.direction);
		this.camera.rotation.y = -directionIndex * (Math.PI / 2);
	}

	correctCameraPosition() {
		this.camera.position.x = this.player.x * SIZE_CELL;
		this.camera.position.z = this.player.y * SIZE_CELL;
		this.light.position.x = this.player.x * SIZE_CELL;
		this.light.position.z = this.player.y * SIZE_CELL;
	}

	initPlayerControl() {
		let isPressedKey = false;
		let repeatMoveInterval;

		const startMovePlayer = keyCode => {
			switch (keyCode) {
				case 37:
					this.correctCameraRotation();
					this.player.rotationLeft();
					this.cameraRotationLeft(this.camera.rotation.y + Math.PI / 2);
					break;
				case 39:
					this.correctCameraRotation();
					this.player.rotationRight();
					this.cameraRotationRight(this.camera.rotation.y - Math.PI / 2);
					break;
				case 38:
					this.correctCameraPosition();
					switch (this.player.direction) {
						case 'N':
							this.moveNorth();
							break;
						case 'S':
							this.moveSouth();
							break;
						case 'W':
							this.moveWest();
							break;
						case 'E':
							this.moveEast();
							break;
					}
					break;
				case 40:
					this.correctCameraPosition();
					switch (this.player.direction) {
						case 'N':
							this.moveSouth();
							break;
						case 'S':
							this.moveNorth();
							break;
						case 'W':
							this.moveEast();
							break;
						case 'E':
							this.moveWest();
							break;
					}
					break;
			}
		}

		document.addEventListener('keydown', e => {
			if (isPressedKey) {
				return;
			}
			isPressedKey = true;

			let keyCode = e.keyCode;
			if (keyCode < 37 || keyCode > 40) {
				return;
			}

			startMovePlayer(keyCode);

			repeatMoveInterval = setInterval(() => {
				startMovePlayer(keyCode);
			}, 400);

			document.addEventListener('keyup', e => {
				isPressedKey = false;
				clearInterval(repeatMoveInterval);
			});

			//console.log(this.player.y, this.player.x, this.player.direction);
		});
	}
};