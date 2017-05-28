import { CELL_EMPTY, CELL_WALL, CELL_EXIT } from './consts';


const isInScope = (map, coord) => {
    return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
};

export default function generateMaze(width, height) {
    // уменьшаем размер на 2 клетки, потому что потом добавим стены вокруг лабиринта
    width -= 2;
    height -= 2;

    const currentPosition = [0, 0];
    let map = [];
    let walls = [];

    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            map[y][x] = CELL_WALL;
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = CELL_EMPTY;
        if (addBlockWalls && isInScope(map, [y+1, x]) && (map[y+1][x] == CELL_WALL)) walls.push([y+1,  x , [y,x]]);
        if (addBlockWalls && isInScope(map, [y-1, x]) && (map[y-1][x] == CELL_WALL)) walls.push([y-1,  x , [y,x]]);
        if (addBlockWalls && isInScope(map, [y, x+1]) && (map[y][x+1] == CELL_WALL)) walls.push([ y , x+1, [y,x]]);
        if (addBlockWalls && isInScope(map, [y, x-1]) && (map[y][x-1] == CELL_WALL)) walls.push([ y , x-1, [y,x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while(walls.length != 0) {
        let randomWall = walls[Math.floor(Math.random() * walls.length)];
        let host = randomWall[2];
        let opposite = [(host[0] + (randomWall[0]-host[0])*2), (host[1] + (randomWall[1]-host[1])*2)];
        if (isInScope(map, opposite)) {
            if (map[opposite[0]][opposite[1]] == CELL_EMPTY) {
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
        horizontalBorder.push(CELL_WALL);
    }
    for (let y = 0; y < height; y++) {
        map[y].push(CELL_WALL);
        map[y].unshift(CELL_WALL);
    }

    map.push(horizontalBorder);
    map.unshift(horizontalBorder);

    const length = map.length;
    map[length - 2][length - 1] = CELL_EXIT;

    return map;
};



