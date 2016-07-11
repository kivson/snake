/// <reference path="../libs/phaser.d.ts"/>


class SnakeGame {
    private game:Phaser.Game;
    mapa:Phaser.Tilemap;
    planodefundo:Phaser.TilemapLayer;
    camadaJogo:Phaser.TilemapLayer;
    camadaBG:Phaser.TileSprite;
    cobra:CobraModule.Cobra;
    quiz:ModuleQuiz.Quiz;
    campo_da_cobra:Phaser.Rectangle;

    
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    preload() {
        this.game.load.tilemap('mapa', 'img/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('head', 'img/Head-Sprite.png', 20, 20);
        this.game.load.spritesheet('numeros', 'img/Numeros.png', 20, 20);
        this.game.load.spritesheet('body', 'img/Body-Sprite.png', 20, 20);
        this.game.load.image('planodefundo', 'img/Background.png')
    }


    create() {

        //DEBUG/PROFILE
        this.game.time.advancedTiming = true;

        this.camadaBG = this.game.add.tileSprite(0, 0, 800, 600, 'planodefundo');

        this.mapa = this.game.add.tilemap('mapa');
        this.mapa.addTilesetImage('Head-Sprite', 'head');
        this.mapa.addTilesetImage('Body-Sprite', 'body');

        this.camadaJogo = this.mapa.createLayer('Camada de Tiles 2');

        this.campo_da_cobra = new Phaser.Rectangle(18, 31, 560, 560);

        this.cobra = new CobraModule.Cobra(this.game, 'head', 'body', 218, 231);
        this.cobra.inicia_movimento();

        this.quiz = new ModuleQuiz.Quiz(this.game, 'numeros', 620, 120);
        this.quiz.mostra();
        // this.quiz.mostra();

    }


    update() {
        if (this.cobra.checa_colisao_corpo()) {
            console.log('BATEU')
        }
        if (this.cobra.check_out_of_bounds(this.campo_da_cobra)){
            console.log('FORA')
        }
    }

    render(){
        this.game.debug.text("FPS: "+ this.game.time.fps,32,32);
    }
}

window.onload = () => {

    var game = new SnakeGame();
};