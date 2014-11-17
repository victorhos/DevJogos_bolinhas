// Util

var Utils = {};

Utils.random = function (start, limit) {
    "use strict";
    
    var number;

    do {
        number = Math.floor(Math.random() * limit);
    } while ((number < this.start) || (number > this.limit));

    return number;

};

//Example
//console.log( Utils.random(0, 10) );

// Util fim

// Level
var level = {};

level.nivel1 = {
    'qtd' : 6,
    'balls' : {
        'ball0' : [3, 4, 5],
        'ball1' : [2, 3],
        'ball2' : [3, 5],
        'ball3' : [4],
        'ball4' : [],
        'ball5' : []
    }

};

// Level fim

// Bolinhas

function Ball(posicao, game, level) {
    "use strict";
    
    var bolinha, 
        ligacoes = [], 
        list_ligacoes = [];

    this.init();

}

Ball.prototype.init = function () {
    "use strict";

    this.addSprite();
    this.setBall();
    this.createLine();

};

Ball.prototype.addSprite = function () {
    "use strict";
    
    this.bolinha = game.add.sprite(
        Utils.random(100, 600),
        Utils.random(100, 600),
        'balls',
        Utils.random(0, 4)
    );

};

Ball.prototype.setBall = function () {
    "use strict";

    this.bolinha.anchor.set(0.5);
    this.bolinha.inputEnabled = true;
    this.bolinha.input.enableDrag(true);

};

Ball.prototype.createLine = function () {
    "use strict";
    
    this.list_ligacoes.push(
        new Phaser.Line(
            this.bolinha.x,
            this.bolinha.y//,
            //.x,
            //.y
        )
    );
    

};

//var xx = new Ball();










