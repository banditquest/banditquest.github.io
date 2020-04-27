const drawScreen = function(screen){
    //draws an entire screen using a list of strings
    console.assert(Array.isArray(screen.floor));
    console.assert(screen.floor.length === (screen.width * screen.height));

    let _floor = [...screen.floor];

    for (let i = 0; i < screen.characters.length; i++){
        character = screen.characters[i];
        position = character.x + (character.y * screen.width);
        _floor[position] = character.symbol;
    }

    let string = '';
    for (let i = 0; i < _floor.length; i++){
        string += _floor[i];
        if (((i+1) % screen.width) === 0){ 
            string += '\n';
        }
    }

    document.getElementById("game").innerText = string;
};

const generateFloor = function(width, height, numRooms, minSize){

    let floor = [];
    let _floor = [];

    for (let i = 0; i < width; i++){
        _floor = [];
        for (let j = 0; j < height; j++){
            _floor.push('.')
        }
        floor.push(_floor);
    }

    function Partition(t, r, b, l){
        this.t = t;
        this.r = r;
        this.b = b;
        this.l = l;
    }

    let partitions = [new Partition(0, width, height, 0)];

    while (partitions.length < numRooms){

        if (partitions.length < 1){
            floor = []
            for (let i = 0; i < width; i++){
                _floor = [];
                for (let j = 0; j < height; j++){
                    _floor.push('.')
                }
                floor.push(_floor);
            }
            partitions = [new Partition(0, width, height, 0)];
        }

        let partition = partitions.shift();

        direction = Math.round(Math.random());

        _width = partition.r - partition.l;
        _height = partition.b - partition.t;

        if ((direction === 0) && (_width > minSize*2)){

            max = partition.r - minSize;
            min = partition.l + minSize;
            position = Math.floor(Math.random() * (max - min)) + min;
            p1 = new Partition(partition.t, position, partition.b, partition.l); //left partition
            p2 = new Partition(partition.t, partition.r, partition.b, position); //right partition
            partitions.push(p1);
            partitions.push(p2);
            for (let j = partition.t; j < partition.b; j++){
                floor[position][j] = '#';
            }
        }

        if ((direction === 1) && (_height > minSize*2)){

            max = partition.b - minSize;
            min = partition.t + minSize;
            position = Math.floor(Math.random() * (max - min)) + min
            p1 = new Partition(partition.t, partition.r, position, partition.l); //top partition
            p2 = new Partition(position, partition.r, partition.b, partition.l); //bottom partition
            partitions.push(p1);
            partitions.push(p2);
            for (let j = partition.l; j < partition.r; j++){
                floor[j][position] = '#';
            }
        }
    }

    let completedFloor = []
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            completedFloor.push(floor[j][i])
        }
    }
    

    return completedFloor.flat();
}

function Screen(width, height){
    this.width = width;
    this.height = height;
    this.floor = Array(width * height).fill('.');
    this.characters = [];
};

function Character(symbol, x, y){
    this.symbol = symbol;
    this.x = x;
    this.y = y;
};

const defaultWidth = 100;
const defaultHeight = 25;
const minRooms = 10;
const maxRooms = 30;
const minRoomSize = 4;
let screen = new Screen(defaultWidth, defaultHeight);
let numRooms = Math.floor(Math.random() * (maxRooms - minRooms)) + minRooms;
screen.floor = generateFloor(screen.width, screen.height, numRooms, minRoomSize);

let player = new Character('@', 1, 1);
screen.characters.push(player);

drawScreen(screen);

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: //left arrow
            if (player.x > 0){
                player.x -= 1;
            }
            break;
        case 38: //up arrow
            if (player.y > 0){
                player.y -= 1;
            }
            break;
        case 39: //right arrow
            if (player.x < screen.width - 1){
                player.x += 1;
            }
            break;
        case 40: //down arrow
        if (player.y < screen.height - 1){
            player.y += 1;
        }
            break;
    }
    drawScreen(screen);
};