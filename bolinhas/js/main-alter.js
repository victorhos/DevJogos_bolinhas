
	var game = new Phaser.Game(
								800, 
								600, 
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
  var qtd = undefined;

  //Funcao que cria as bolinhas
	function createElements(qtd_elements){
        
        qtd = qtd_elements;

		for (var i = 0; i <= qtd; i++){

			list_ball['bolinha' + i] = game.add.sprite(10*i, 10*i, 'balls', 0);

		}

	}

	function create() {

		game.stage.backgroundColor = '#124184';
		createElements(8);
		qtd = 8;

		//colocando as bolinhas na tela
		for (var i = 0; i <= qtd; i++){
		
			list_ball['bolinha' + i].anchor.set(0.5);
			list_ball['bolinha' + i].inputEnabled = true;
			list_ball['bolinha' + i].input.enableDrag(true);

		}

		//Criando as linhas
		for (var i = 0; i <= qtd; i++){
			if ( i < qtd){
            	list_line['line' + i] = new Phaser.Line(list_ball['bolinha' + i].x, 
													    												list_ball['bolinha' + i].y, 
                              						    				list_ball['bolinha' + (i + 1)].x, 
													    												list_ball['bolinha' + (i + 1)].y);
			}
			else{
            	list_line['line' + i]= new Phaser.Line(	list_ball['bolinha' + i].x, 
													   													list_ball['bolinha' + i].y, 
                              						  				 	list_ball['bolinha0'].x, 
													   													list_ball['bolinha0'].y);
			}
		}

		//escrevendo as linhas na tela
		for (var i = 0; i <= qtd; i++){

			if ( i < qtd){

            	list_line['line' + i].fromSprite(	list_ball['bolinha' + i], 
																							 	list_ball['bolinha' + (i + 1)], 
																 								false);
									}
			else{

            	list_line['line' + i].fromSprite(	list_ball['bolinha' + i], 
												 												list_ball['bolinha0'], 
												 												false);
			}
		}	

	}

	function update() {

		for (var i = 0; i <= qtd; i++){

			if ( i < qtd){

            	list_line['line' + i].fromSprite(	list_ball['bolinha' + i], 
																							 	list_ball['bolinha' + (i + 1)], 
																 								false);
									}
			else{

            	list_line['line' + i].fromSprite(	list_ball['bolinha' + i], 
												 												list_ball['bolinha0'], 
												 												false);
			}
		}	 
	}

	function render() {

		game.debug.text("Drag the bolinhas", 32, 550);

	}
