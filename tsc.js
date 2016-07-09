/// <reference path="libs/phaser.d.ts"/>
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
        this.cobra = new CobraModule.Cobra(this.game, 'head', 'body');
        this.cobra.inicia_movimento();
    };
    return SnakeGame;
}());
window.onload = function () {
    var game = new SnakeGame();
};
/**
 * Created by kivson on 06/07/16.
 */
/// <reference path="libs/phaser.d.ts"/>
var CobraModule;
(function (CobraModule) {
    var ANIMACAO_EASE = Phaser.Easing.Sinusoidal.InOut;
    var CorpoCobra = (function () {
        function CorpoCobra(game, corpoKey, pos_x, pos_y) {
            this.game = game;
            this.corpoKey = corpoKey;
            this.sprites_corpo = new Array();
            this.corpoSprite = this.game.add.sprite(200, 200, this.corpoKey);
            var tamanho_pool = (game.width / this.corpoSprite.height) * (game.height / this.corpoSprite.height);
            this.corpoSprite.kill();
            this.sprite_pool = game.add.group();
            this.sprite_pool.createMultiple(tamanho_pool, this.corpoKey);
            for (var i = 0; i < 5; i++) {
                var sprite = this.sprite_pool.getFirstExists(false);
                sprite.reset(pos_x - (i * sprite.width), pos_y);
                this.sprites_corpo.push(sprite);
            }
        }
        CorpoCobra.prototype.move = function (new_x, new_y, tempo_animacao) {
            for (var i = this.sprites_corpo.length - 1; i > 0; i--) {
                this.game.add.tween(this.sprites_corpo[i]).to({ x: this.sprites_corpo[i - 1].x, y: this.sprites_corpo[i - 1].y }, tempo_animacao, ANIMACAO_EASE, true);
            }
            this.game.add.tween(this.sprites_corpo[0]).to({ x: new_x, y: new_y }, tempo_animacao, ANIMACAO_EASE, true);
        };
        return CorpoCobra;
    }());
    var Direcao;
    (function (Direcao) {
        Direcao[Direcao["CIMA"] = 0] = "CIMA";
        Direcao[Direcao["BAIXO"] = 1] = "BAIXO";
        Direcao[Direcao["ESQUERDA"] = 2] = "ESQUERDA";
        Direcao[Direcao["DIREITA"] = 3] = "DIREITA";
    })(Direcao || (Direcao = {}));
    var Cobra = (function () {
        function Cobra(game, cabecaKey, corpoKey, pos_x, pos_y) {
            if (pos_x === void 0) { pos_x = 200; }
            if (pos_y === void 0) { pos_y = 100; }
            this.game = game;
            this.cabecaKey = cabecaKey;
            this.corpoKey = corpoKey;
            this.intervalo_movimento = 500;
            this.direcaoAtual = Direcao.DIREITA;
            this.direcaoDesejada = Direcao.DIREITA;
            this.cabecaSprite = this.game.add.sprite(pos_x, pos_y, this.cabecaKey);
            this.cabecaSprite.animations.add('muda', [1, 2, 3, 5]);
            this.cabecaSprite.animations.play('muda', 5, true);
            this.corpo = new CorpoCobra(this.game, this.corpoKey, pos_x - this.cabecaSprite.width, pos_y);
            this.bind_input();
        }
        Cobra.prototype.bind_input = function () {
            var _this = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.BAIXO) {
                    _this.direcaoDesejada = Direcao.CIMA;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.CIMA) {
                    _this.direcaoDesejada = Direcao.BAIXO;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.DIREITA) {
                    _this.direcaoDesejada = Direcao.ESQUERDA;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.ESQUERDA) {
                    _this.direcaoDesejada = Direcao.DIREITA;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.BAIXO) {
                    _this.direcaoDesejada = Direcao.CIMA;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.CIMA) {
                    _this.direcaoDesejada = Direcao.BAIXO;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.DIREITA) {
                    _this.direcaoDesejada = Direcao.ESQUERDA;
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () {
                if (_this.direcaoAtual != Direcao.ESQUERDA) {
                    _this.direcaoDesejada = Direcao.DIREITA;
                }
            });
        };
        Cobra.prototype.inicia_movimento = function () {
            this.game.time.events.loop(this.intervalo_movimento, this.move, this);
        };
        Cobra.prototype.move = function () {
            if (this.direcaoDesejada == Direcao.DIREITA) {
                this.game.add.tween(this.cabecaSprite).to({ x: "+" + this.cabecaSprite.width }, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.ESQUERDA) {
                this.game.add.tween(this.cabecaSprite).to({ x: "-" + this.cabecaSprite.width }, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.CIMA) {
                this.game.add.tween(this.cabecaSprite).to({ y: "-" + this.cabecaSprite.width }, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.BAIXO) {
                this.game.add.tween(this.cabecaSprite).to({ y: "+" + this.cabecaSprite.width }, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            this.corpo.move(this.cabecaSprite.x, this.cabecaSprite.y, this.intervalo_movimento);
            this.direcaoAtual = this.direcaoDesejada;
        };
        return Cobra;
    }());
    CobraModule.Cobra = Cobra;
})(CobraModule || (CobraModule = {}));
//# sourceMappingURL=tsc.js.map