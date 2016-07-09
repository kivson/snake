/// <reference path="../libs/phaser.d.ts"/>

class SnakeGame {
    private game:Phaser.Game;
    mapa:Phaser.Tilemap;
    planodefundo:Phaser.TilemapLayer;
    camadaJogo:Phaser.TilemapLayer;
    camadaBG:Phaser.TileSprite;
    cobra;
    quiz;
    
    
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {preload: this.preload, create: this.create});
    }

    preload() {
        this.game.load.tilemap('mapa', 'img/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('head', 'img/Head-Sprite.bmp', 20, 20);
        this.game.load.spritesheet('numeros', 'img/Numeros.png', 20, 20);
        this.game.load.spritesheet('body', 'img/Body-Sprite.png', 20, 20);
        this.game.load.image('planodefundo', 'img/Background.png')
    }


    create() {
        this.camadaBG = this.game.add.tileSprite(0, 0, 800, 600, 'planodefundo');

        this.mapa = this.game.add.tilemap('mapa');
        this.mapa.addTilesetImage('Head-Sprite', 'head');
        this.mapa.addTilesetImage('Body-Sprite', 'body');

        this.camadaJogo = this.mapa.createLayer('Camada de Tiles 2');

        this.cobra = new CobraModule.Cobra(this.game,'head', 'body');
        this.cobra.inicia_movimento();
        
        this.quiz = new ModuleQuiz.Quiz(this.game, 'numeros', 620, 120);
        this.quiz.mostra();
        // this.quiz.mostra();

    }

}

window.onload = () => {

    var game = new SnakeGame();
};