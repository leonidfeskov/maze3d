/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const WIDTH = window.innerWidth;
/* harmony export (immutable) */ __webpack_exports__["a"] = WIDTH;

const HEIGHT = window.innerHeight;
/* harmony export (immutable) */ __webpack_exports__["b"] = HEIGHT;


const COUNT_CELLS = 9;
/* harmony export (immutable) */ __webpack_exports__["c"] = COUNT_CELLS;


const SIZE_CELL = 100;
/* harmony export (immutable) */ __webpack_exports__["d"] = SIZE_CELL;

const DIRECTIONS = ['N', 'E', 'S', 'W'];
/* harmony export (immutable) */ __webpack_exports__["h"] = DIRECTIONS;


const CELL_EMPTY = 0;
/* harmony export (immutable) */ __webpack_exports__["i"] = CELL_EMPTY;

const CELL_WALL = 1;
/* harmony export (immutable) */ __webpack_exports__["e"] = CELL_WALL;

const CELL_EXIT = 2;
/* harmony export (immutable) */ __webpack_exports__["j"] = CELL_EXIT;


const ROTATION_SPEED = Math.PI / 40;
/* harmony export (immutable) */ __webpack_exports__["f"] = ROTATION_SPEED;

const MOVE_SPEED = 4;
/* harmony export (immutable) */ __webpack_exports__["g"] = MOVE_SPEED;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__consts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generateMaze__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Player__ = __webpack_require__(3);




class Game {
	constructor() {
		var canvas = document.getElementById('canvas');
		canvas.setAttribute('width', __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* WIDTH */]);
		canvas.setAttribute('height', __WEBPACK_IMPORTED_MODULE_0__consts__["b" /* HEIGHT */]);

		this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
		this.renderer.setClearColor(0x000000);

		this.scene = new THREE.Scene();

		this.player = new __WEBPACK_IMPORTED_MODULE_2__Player__["a" /* default */](1, __WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */] - 2);
		// камера должна перемещаться вместе с игроком
		this.camera = new THREE.PerspectiveCamera(45, __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* WIDTH */] / __WEBPACK_IMPORTED_MODULE_0__consts__["b" /* HEIGHT */], 0.1, 5000);
		this.camera.position.set(this.player.x * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], 0, this.player.y * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);

		this.light = new THREE.PointLight(0xffffff, 1, __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */] * 4);
		this.light.position.set(this.player.x * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], 0, this.player.y * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		this.scene.add(this.light);

		var textureLoader = new THREE.TextureLoader();
		this.textureWall = textureLoader.load('f/i/wall.png');
		this.textureWall.wrapS = this.textureWall.wrapT = THREE.RepeatWrapping;
		this.textureWall.repeat.set(2, 2);

		this.textureFloor = textureLoader.load('f/i/floor.jpg');
		this.textureFloor.wrapS = this.textureFloor.wrapT = THREE.RepeatWrapping;
		this.textureFloor.repeat.set(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */], __WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */]);

		this.textureCeil = textureLoader.load('f/i/ceil.jpg');
		this.textureCeil.wrapS = this.textureCeil.wrapT = THREE.RepeatWrapping;
		this.textureCeil.repeat.set(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */], __WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */]);

		setTimeout(() => {
			this.drawMaze();
			this.renderer.render(this.scene, this.camera);

			this.initPlayerControl();
		}, 1000);

		this.animationProcess = false;
	}

	drawMaze() {
		this.map = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__generateMaze__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */], __WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */]);
		console.table(this.map);

		// рисуем стены
		this.geometry = new THREE.BoxGeometry(__WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		this.material = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: this.textureWall
		});

		this.map.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell === __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) {
					let mesh = new THREE.Mesh(this.geometry, this.material);
					mesh.position.set(x * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], 0, y * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
					this.scene.add(mesh);
				}
			});
		});

		// рисуем пол и потолок
		const drawFloor = (texture, positionZ) => {
			let floorGeometry = new THREE.BoxGeometry(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */] * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], __WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */] * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], 10);
			let floorMaterial = new THREE.MeshPhongMaterial({
				color: 0x333333,
				map: texture
			});
			let floor = new THREE.Mesh(floorGeometry, floorMaterial);
			floor.position.set(Math.floor(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */] / 2) * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */], positionZ, Math.floor(__WEBPACK_IMPORTED_MODULE_0__consts__["c" /* COUNT_CELLS */] / 2) * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
			floor.rotation.set(Math.PI / 2, 0, 0);
			this.scene.add(floor);
		};

		drawFloor(this.textureFloor, -__WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */] / 2);
		drawFloor(this.textureCeil, __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */] / 2);
	}

	cameraRotationLeft(angle) {
		this.camera.rotation.y += __WEBPACK_IMPORTED_MODULE_0__consts__["f" /* ROTATION_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.rotation.y < angle) {
			requestAnimationFrame(() => {
				this.cameraRotationLeft(angle);
			});
		}
	}

	cameraRotationRight(angle) {
		this.camera.rotation.y -= __WEBPACK_IMPORTED_MODULE_0__consts__["f" /* ROTATION_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.rotation.y > angle) {
			requestAnimationFrame(() => {
				this.cameraRotationRight(angle);
			});
		}
	}

	cameraMoveNorht(position) {
		this.camera.position.z -= __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.light.position.z -= __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.z > position) {
			requestAnimationFrame(() => {
				this.cameraMoveNorht(position);
			});
		}
	}

	cameraMoveSouth(position) {
		this.camera.position.z += __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.light.position.z += __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.z < position) {
			requestAnimationFrame(() => {
				this.cameraMoveSouth(position);
			});
		}
	}

	cameraMoveWest(position) {
		this.camera.position.x -= __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.light.position.x -= __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.x > position) {
			requestAnimationFrame(() => {
				this.cameraMoveWest(position);
			});
		}
	}

	cameraMoveEast(position) {
		this.camera.position.x += __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.light.position.x += __WEBPACK_IMPORTED_MODULE_0__consts__["g" /* MOVE_SPEED */];
		this.renderer.render(this.scene, this.camera);
		if (this.camera.position.x < position) {
			requestAnimationFrame(() => {
				this.cameraMoveEast(position);
			});
		}
	}

	moveNorth() {
		var newY = this.player.y - 1;
		if (this.map[newY][this.player.x] !== __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) {
			this.player.y = newY;
			this.cameraMoveNorht(this.camera.position.z - __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		}
	}

	moveSouth() {
		var newY = this.player.y + 1;
		if (this.map[newY][this.player.x] !== __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) {
			this.player.y = newY;
			this.cameraMoveSouth(this.camera.position.z + __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		}
	}

	moveWest() {
		var newX = this.player.x - 1;
		if (this.map[this.player.y][newX] !== __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) {
			this.player.x = newX;
			this.cameraMoveWest(this.camera.position.x - __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		}
	}

	moveEast() {
		var newX = this.player.x + 1;
		if (this.map[this.player.y][newX] !== __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) {
			this.player.x = newX;
			this.cameraMoveEast(this.camera.position.x + __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */]);
		}
	}

	correctCameraRotation() {
		var directionIndex = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */].indexOf(this.player.direction);
		this.camera.rotation.y = -directionIndex * (Math.PI / 2);
	}

	correctCameraPosition() {
		this.camera.position.x = this.player.x * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */];
		this.camera.position.z = this.player.y * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */];
		this.light.position.x = this.player.x * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */];
		this.light.position.z = this.player.y * __WEBPACK_IMPORTED_MODULE_0__consts__["d" /* SIZE_CELL */];
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
		};

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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;
;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Game__ = __webpack_require__(1);



// загрузка текстур
const textureNames = ['f/i/wall.png'];
const textures = textureNames.map(function (image) {
	const img = new Image();
	img.src = image;
	return img;
});

var game = new __WEBPACK_IMPORTED_MODULE_1__components_Game__["a" /* default */]();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__consts__ = __webpack_require__(0);


class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.direction = 'N';
	}

	rotationRight() {
		var index = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */].indexOf(this.direction);
		index++;
		if (index < __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */].length) {
			this.direction = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */][index];
		} else {
			this.direction = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */][0];
		}
	}

	rotationLeft() {
		var index = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */].indexOf(this.direction);
		index--;
		if (index >= 0) {
			this.direction = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */][index];
		} else {
			this.direction = __WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */][__WEBPACK_IMPORTED_MODULE_0__consts__["h" /* DIRECTIONS */].length - 1];
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;
;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateMaze;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__consts__ = __webpack_require__(0);


const isInScope = (map, coord) => {
    return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
};

function generateMaze(width, height) {
    // уменьшаем размер на 2 клетки, потому что потом добавим стены вокруг лабиринта
    width -= 2;
    height -= 2;

    const currentPosition = [0, 0];
    let map = [];
    let walls = [];

    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            map[y][x] = __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */];
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = __WEBPACK_IMPORTED_MODULE_0__consts__["i" /* CELL_EMPTY */];
        if (addBlockWalls && isInScope(map, [y + 1, x]) && map[y + 1][x] == __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y - 1, x]) && map[y - 1][x] == __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x + 1]) && map[y][x + 1] == __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x - 1]) && map[y][x - 1] == __WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]) walls.push([y, x - 1, [y, x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        let randomWall = walls[Math.floor(Math.random() * walls.length)];
        let host = randomWall[2];
        let opposite = [host[0] + (randomWall[0] - host[0]) * 2, host[1] + (randomWall[1] - host[1]) * 2];
        if (isInScope(map, opposite)) {
            if (map[opposite[0]][opposite[1]] == __WEBPACK_IMPORTED_MODULE_0__consts__["i" /* CELL_EMPTY */]) {
                walls.splice(walls.indexOf(randomWall), 1);
            } else {
                drawWay(randomWall[0], randomWall[1], false);
                drawWay(opposite[0], opposite[1], true);
            }
        } else {
            walls.splice(walls.indexOf(randomWall), 1);
        }
    }

    // добавдяем стены вокруг всего лабиринта
    let horizontalBorder = [];
    for (let x = 0; x < width + 2; x++) {
        horizontalBorder.push(__WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]);
    }
    for (let y = 0; y < height; y++) {
        map[y].push(__WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]);
        map[y].unshift(__WEBPACK_IMPORTED_MODULE_0__consts__["e" /* CELL_WALL */]);
    }

    map.push(horizontalBorder);
    map.unshift(horizontalBorder);

    const length = map.length;
    map[length - 2][length - 1] = __WEBPACK_IMPORTED_MODULE_0__consts__["j" /* CELL_EXIT */];

    return map;
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const rnd = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
/* unused harmony export rnd */


const checkImage = texture => {
	return new Promise(resolve => {
		texture.onload = () => resolve();
	});
};

const loadImages = (...textures) => Promise.all(textures.map(checkImage));
/* unused harmony export loadImages */


/***/ })
/******/ ]);