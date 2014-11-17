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
  function createElements(qtd_elements){
        
      qtd = qtd_elements;

      for (var i = 0; i <= qtd; i++){

          list_ball['bolinha' + i] = game.add.sprite(
              randomNumberWithLimit(100, 600), 
              randomNumberWithLimit(100, 600), 
              'balls', 
              0
          );

      }

      return true

  }

  function createBridge(){

      for (i in list_ball){

          var posicao = 'bridge' + i.replace('bolinha', '');
          list_bridge[posicao] = [];

          //limite qtd de ligações 
          var limit = qtd - 1;

          //qtd de ligações
          var qtd_bridges = Math.floor(Math.random() * limit); 

          do {
              qtd_bridges = Math.floor(Math.random() * limit);
          }
          while ( qtd_bridges < 1 );

          //bolinhas ligadas
          for (var j = 0; j < qtd_bridges; j++){

              var number;

              do {
                  number = Math.floor(Math.random() * limit);
              }
              //verifica se já existe na lista e se não é ele mesmo
              while ( 
                number == i && 
                list_bridge[posicao].indexOf( number ) != -1 
              );

              list_bridge[posicao].push(number);
              qtd_ligacoes = qtd_ligacoes + 1;

          }

      }

      return true

  }

  function setBolinhaNaTela(){

    //colocando as bolinhas na tela
    for (var i = 0; i <= qtd; i++){

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

    game.load.spritesheet('balls', 'static/img/bolinhas20x20.png', 20, 20);
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


var lista_de_bolinhas = [];

function create() {

    game.stage.backgroundColor = '#124184';
    //game.add.sprite(0, 0, 'splash');

    //Start do jogo
    /*
    createElements(qtd);
    createBridge();
    setBolinhaNaTela();
    criaLinhasEEscreve();
    */
    console.log(level.nivel1.qtd);
    for ( var i = 0; i < level.nivel1.qtd; i++ ) {
console.log(i);
        var bolinha = new Ball( i, game, 1);
        lista_de_bolinhas.push( bolinha );

    }
    

}

function update() {

    //updateCreateFromSprite();

}

function render() {

    //renderLines();

}
