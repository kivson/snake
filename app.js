/// <reference path="phaser.d.ts"/>
var SnakeGame = (function () {
    function SnakeGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SnakeGame.prototype.preload = function () {
        this.game.load.tilemap('mapa', 'img/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('head', 'img/Head-Sprite.bmp', 20, 20);
        this.game.load.spritesheet('body', 'img/Body-Sprite.png', 20, 20);
        this.game.load.image('planodefundo', 'img/Background.png');
    };
    SnakeGame.prototype.create = function () {
        this.camadaBG = this.game.add.tileSprite(0, 0, 800, 600, 'planodefundo');
        this.mapa = this.game.add.tilemap('mapa');
        this.mapa.addTilesetImage('Head-Sprite', 'head');
        this.mapa.addTilesetImage('Body-Sprite', 'body');
        this.camadaJogo = this.mapa.createLayer('Camada de Tiles 2');
        this.cabeca = this.game.add.sprite(100, 100, 'body');
        this.cabeca.animations.add('muda', [1, 2, 3, 4, 5, 6]);
        this.cabeca.animations.play('muda', 5, true);
    };
    return SnakeGame;
}());
window.onload = function () {
    var game = new SnakeGame();
};
//# sourceMappingURL=app.js.map