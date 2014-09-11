
    var game = new Phaser.Game(
                                800, 
                                700, 
                                Phaser.CANVAS, 
                                'phaser-example', 
                                { preload: preload, 
                                create: create, 
                                update: update, 
                                render: render }
    );

    function preload() {

        game.load.spritesheet('balls', 'img/balls.png', 17, 17);

    }

	//Criando variaveis auxiliares
    var list_line = {};
    var list_ball = {};
    var list_bridge = {};
    var list_intersects = {};
    var qtd;
    var c = 'rgb(255,255,255)';

	function create() {

        game.stage.backgroundColor = '#124184';
        createElements(4);

        //colocando as bolinhas na tela
        for (var i = 0; i <= qtd; i++){

            list_ball['bolinha' + i].anchor.set(0.5);
            list_ball['bolinha' + i].inputEnabled = true;
            list_ball['bolinha' + i].input.enableDrag(true);

        }

        //Criando as linhas
        for (var i = 0; i <= qtd; i++){

            if ( i < qtd){

                list_line['line' + i] = new Phaser.Line(
                                            list_ball['bolinha' + i].x, 
                                            list_ball['bolinha' + i].y, 
                                            list_ball['bolinha' + (i + 1)].x, 
                                            list_ball['bolinha' + (i + 1)].y);

            }
            else{

                list_line['line' + i]= new Phaser.Line(	
                                            list_ball['bolinha' + i].x, 
                                            list_ball['bolinha' + i].y, 
                                            list_ball['bolinha0'].x, 
                                            list_ball['bolinha0'].y);

            }
        }

        //escrevendo as linhas na tela
        for (var i = 0; i <= qtd; i++){

            if ( i < qtd){

                list_line['line' + i].fromSprite(
                                            list_ball['bolinha' + i], 
                                            list_ball['bolinha' + (i + 1)], 
                                            false);
            }
            else{

                list_line['line' + i].fromSprite(
                                            list_ball['bolinha' + i], 
                                            list_ball['bolinha0'], 
                                            false);
            }
        }
    }

    function update() {

        //create fromSprite
        for (var i = 0; i <= qtd; i++){

            if ( i < qtd){

                list_line['line' + i].fromSprite(
                                        list_ball['bolinha' + i],
                                        list_ball['bolinha' + (i + 1)], 
                                        false);
            }
            else{

                list_line['line' + i].fromSprite(
                                        list_ball['bolinha' + i], 
                                        list_ball['bolinha0'], 
                                        false);
            }
        }
        //console.clear()
        //create line intersects
        for (var i in list_line){

            for (var x in list_line) {

                if (x != i){
                    list_intersects['p' + i + x] = list_line[i].intersects(
                        list_line[x], 
                        true
                    );
                }

            }
            //console.log(i, list_line[i].intersects(list_line[x],true));
        }

    }

    function render() {

        //render lines 
        for (var i = 0; i <= qtd; i++){

            game.debug.geom(list_line['line' + i], c);

        }

        game.debug.text("Drag the bolinhas", 32, 550);

    }
