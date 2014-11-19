/* Funcões auxiliares */

  function randomNumberWithLimit(start, limit){

      var number;

      do {
          number = Math.floor(Math.random() * limit);
      }
      while ((number < start) || (number > limit));

      return number

  }

  //Funcao que cria as bolinhas
  function createElements(lvl){

      var nivel = level[lvl];

      for (var i = 0; i <= nivel.qtd; i++){

          list_ball['bolinha' + i] = game.add.sprite(
              randomNumberWithLimit(100, 600), 
              randomNumberWithLimit(100, 600), 
              'balls', 
              0
          );

      }

      return true

  }

  function createBridge(lvl){

      var nivel = level[lvl];
      var number;

      for (i in list_ball){

          var posicao = 'bridge' + i.replace('bolinha', '');
          var q = i.replace('bolinha', '');

          list_bridge[posicao] = [];

          //bolinhas ligadas
          for ( j in nivel.ligacoes[q]){

              number = nivel.ligacoes[q][j];

              list_bridge[posicao].push(number);
              qtd_ligacoes = qtd_ligacoes + 1;

          }

      }

      return true

  }

  function setBolinhaNaTela(lvl){

    var nivel = level[lvl];

    //colocando as bolinhas na tela
    for (var i = 0; i <= nivel.qtd; i++){

        list_ball['bolinha' + i].anchor.set(0.5);
        list_ball['bolinha' + i].inputEnabled = true;
        list_ball['bolinha' + i].input.enableDrag(true);

    }

  }

  function criaLinhasEEscreve(){

    //Criando as linhas
    for ( var i in list_bridge ){

        var posicao_line = 'line' + i.replace('bridge', '');
        var posicao_ball = 'bolinha' + i.replace('bridge', '');
        var posicao_bridge = i;

        list_line[posicao_line] = []

        for ( var j in list_bridge[posicao_bridge] ){

            var ligacao_ball = list_bridge[posicao_bridge][j];
                ligacao_ball = 'bolinha' + ligacao_ball;

            var x = {};

            //Criando linha
            x['line'] = new Phaser.Line(
                    list_ball[posicao_ball].x, 
                    list_ball[posicao_ball].y, 
                    list_ball[ligacao_ball].x, 
                    list_ball[ligacao_ball].y
            );

            x['ballA'] = posicao_ball;
            x['ballB'] = ligacao_ball;

            list_line[posicao_line].push(x);

        }

    }

  }

  function updateCreateFromSprite(){

    for ( var x in list_line ){

        for ( var y in list_line[x] ){

            list_line[x][y].line.fromSprite(
                list_ball[list_line[x][y].ballA], 
                list_ball[list_line[x][y].ballB],
                false
            );

        }

    }

  }

  function renderLines(){

    for ( var x in list_line ){

        for ( var y in list_line[x] ){

            game.debug.geom(list_line[x][y].line, c);

        }

    }

  }

/* Fim Funcões auxiliares */

var game = new Phaser.Game(
    800, 
    700, 
    Phaser.CANVAS, 
    'phaser-example', 
    {
        preload: preload, 
        create: create, 
        update: update, 
        render: render
    }
);

function preload() {

    game.load.spritesheet('balls', 'static/img/balls.png', 17, 17);
    game.load.spritesheet('splash', 'static/img/splash.png', 800, 700);

}

//Criando variaveis auxiliares
var list_line = {};
var list_ball = {};
var list_bridge = {};
var list_intersects = {};
var qtd = 5;
var qtd_ligacoes = 0;
var c = 'rgb(255,255,255)';
var splash;

var level = {};

level['lvl1'] = {
    'qtd' : 5,
    'ligacoes' : {
        '0' : [3, 4, 5], 
        '1' : [2, 3], 
        '2' : [1, 3, 5], 
        '3' : [4], 
        '4' : [], 
        '5' : [], 
    }


};

level['lvl2'] = {
    'qtd' : 7,
    'ligacoes' : {
        '0' : [2, 5, 6, 7], 
        '1' : [2, 4, 7],
        '2' : [3, 4],
        '3' : [4, 6], 
        '4' : [], 
        '5' : [7], 
        '6' : [7], 
        '7' : [], 
    }
};

function create() {

    game.stage.backgroundColor = '#124184';
    game.add.sprite(0, 0, 'splash');

    //Start do jogo
    createElements('lvl2');
    createBridge('lvl2');
    setBolinhaNaTela('lvl2');
    criaLinhasEEscreve();

}

function update() {

    updateCreateFromSprite();

}

function render() {

    renderLines();

}
