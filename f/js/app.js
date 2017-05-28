import { loadImages } from './utils/utils';
import Game from './components/Game';


// загрузка текстур
const textureNames = ['f/i/wall.png'];
const textures = textureNames.map(function(image) {
	const img = new Image();
	img.src = image;
	return img;
});


var game = new Game();
