const drawScreen = function(screen){
    //draws an entire screen using a list of strings
    console.assert(Array.isArray(screen.floor));
    console.assert(screen.floor.length === (screen.width * screen.height));

    _floor = screen.floor.slice();

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
const defaultHeight = 50;
let screen = new Screen(defaultWidth, defaultHeight);

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