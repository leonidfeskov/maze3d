export const rnd = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkImage = texture => {
	return new Promise(resolve => {
		texture.onload = () => resolve();
	});
};

export const loadImages = (...textures) => Promise.all(textures.map(checkImage));
