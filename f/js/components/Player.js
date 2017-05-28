import { DIRECTIONS } from '../consts';


export default class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.direction = 'N';
	}

	rotationRight() {
		var index = DIRECTIONS.indexOf(this.direction);
		index++;
		if (index < DIRECTIONS.length) {
			this.direction = DIRECTIONS[index]
		} else {
			this.direction = DIRECTIONS[0];
		}
	}

	rotationLeft() {
		var index = DIRECTIONS.indexOf(this.direction);
		index--;
		if (index >= 0) {
			this.direction = DIRECTIONS[index]
		} else {
			this.direction = DIRECTIONS[DIRECTIONS.length - 1];
		}
	}
};
