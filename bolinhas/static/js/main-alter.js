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
              randomNumberWithLimit(0, nivel.qtd)
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

  function criaLinhasEEscreve(lvl){

    var nivel = level[lvl];

    //Criando as linhas
    for ( var i in list_bridge ){

        var posicao_line = 'line' + i.replace('bridge', '');
        var posicao_ball = 'bolinha' + i.replace('bridge', '');
        var posicao_bridge = i;
        var li = i.replace('bridge', '');

        list_line[posicao_line] = [];

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

            lista_de_linhas[
                posicao_ball.replace('bolinha', '') + 
                ligacao_ball.replace('bolinha', '')
            ] = x['line'];

        }

    }

  }

  function setLLI(lvl){

    var nivel = level[lvl];

    for ( var i = 0; i <= nivel.qtd; i++ ){

        list_line_intersect['li-' + i] = [];

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

  function lineIntersection(lvl){

    var nivel = level[lvl];
    var intersec = verificadorDeLinha(nivel);

    if (intersec)
    {
        c = 'rgb(0,0,0)';
    }
    else
    {
        c = 'rgb(255,255,255)';
    }

  }

  function verificadorDeLinha(nivel){

    for ( var i in nivel.verificacoes ){

        var line_base = lista_de_linhas[i];

        for ( var x in nivel.verificacoes[i] ){

            var pinta = null;
            var item = nivel.verificacoes[i][x];
            var line_comp = lista_de_linhas[item];

            pinta = line_base.intersects(line_comp, true);

            if (pinta){
                return true;
            }

        }

    }

    return false;

  }

  function limpar(){
console.clear();
    console.log('limpar');
console.log(list_ball);
    for (var i = 0; i < list_ball.length; i++){
console.log(i);

        list_ball['bolinha' + i].anchor.set(0.5);
        list_ball['bolinha' + i].inputEnabled = false;
        list_ball['bolinha' + i].input.enableDrag(false);
        list_ball['bolinha'+i].destroy;
list_ball['bolinha'+i];

    }

console.log('>>>>>>>>', list_ball);

    for (i in lista_de_linhas){

        lista_de_linhas[i].destroy;

    }

  }

  function actionOnClick () {

    lvl_select = 'lvl' + (parseInt(lvl_select.replace('lvl', '')) + 1);

    if (lvl_select == 'lvl6'){
        lvl_select == 'lvl1';
        return false
    }

    game.state.restart();

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

    game.load.spritesheet(
        'balls', 
        'static/img/bolinhas.png', 
        40, 
        40
    );
    game.load.spritesheet(
        'splash', 
        'static/img/Background.png', 
        800, 
        700
    );

    game.load.spritesheet(
        'button', 
        'static/img/botao_nextLevel100x100.png', 
        100, 
        100
    );

}

//Criando variaveis auxiliares
var list_line = {};
var list_ball = {};
var list_bridge = {};
var list_line_intersect = {};
var list_all_lines = [];
var lista_de_linhas = {};
var qtd = 5;
var qtd_ligacoes = 0;
var c = 'rgb(255,255,255)';
var splash;
var button;
var lvl_select = 'lvl1';

function create() {

    game.stage.backgroundColor = '#124184';
    game.add.sprite(0, 0, 'splash');

    //Start do jogo
    setLLI(lvl_select);
    createElements(lvl_select);
    createBridge(lvl_select);
    setBolinhaNaTela(lvl_select);
    criaLinhasEEscreve(lvl_select);

    button = game.add.button(
        650, 
        550, 
        'button', 
        actionOnClick, 
        this, 1, 0, 2
    );

}

function update() {

    updateCreateFromSprite();
    lineIntersection(lvl_select);

}

function render() {

    renderLines();

}
