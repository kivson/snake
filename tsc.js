/// <reference path="../libs/phaser.d.ts"/>
var SnakeGame = (function () {
    function SnakeGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SnakeGame.prototype.preload = function () {
        this.game.load.tilemap('mapa', 'img/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('head', 'img/Head-Sprite.png', 20, 20);
        this.game.load.spritesheet('numeros', 'img/Numeros.png', 20, 20);
        this.game.load.spritesheet('body', 'img/Body-Sprite.png', 20, 20);
        this.game.load.image('planodefundo', 'img/Background.png');
    };
    SnakeGame.prototype.create = function () {
        this.camadaBG = this.game.add.tileSprite(0, 0, 800, 600, 'planodefundo');
        this.mapa = this.game.add.tilemap('mapa');
        this.mapa.addTilesetImage('Head-Sprite', 'head');
        this.mapa.addTilesetImage('Body-Sprite', 'body');
        this.camadaJogo = this.mapa.createLayer('Camada de Tiles 2');
        this.cobra = new CobraModule.Cobra(this.game, 'head', 'body', 218, 231);
        this.cobra.inicia_movimento();
        this.quiz = new ModuleQuiz.Quiz(this.game, 'numeros', 620, 120);
        this.quiz.mostra();
        // this.quiz.mostra();
    };
    return SnakeGame;
}());
window.onload = function () {
    var game = new SnakeGame();
};
/**
 * Created by kivson on 06/07/16.
 */
/// <reference path="../libs/phaser.d.ts"/>
var CobraModule;
(function (CobraModule) {
    var ANIMACAO_EASE = Phaser.Easing.Sinusoidal.InOut;
    var CorpoCobra = (function () {
        function CorpoCobra(game, corpoKey, pos_x, pos_y) {
            this.game = game;
            this.corpoKey = corpoKey;
            this.sprites_corpo = [];
            this.corpoSprite = this.game.add.sprite(200, 200, this.corpoKey);
            var tamanho_pool = (game.width / this.corpoSprite.height) * (game.height / this.corpoSprite.height);
            this.corpoSprite.kill();
            this.sprite_pool = game.add.group();
            this.sprite_pool.createMultiple(tamanho_pool, this.corpoKey);
            this.sprite_pool.callAll('animations.add', 'animations', 'muda', [0, 1, 2, 3, 4], 5, true);
            this.sprite_pool.callAll('animations.play', 'animations', 'muda');
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
            this.comeu = false;
            this.direcaoAtual = Direcao.DIREITA;
            this.direcaoDesejada = Direcao.DIREITA;
            this.cabecaSprite = this.game.add.sprite(pos_x, pos_y, this.cabecaKey);
            this.cabecaSprite.animations.add('muda', [0, 1, 2, 3, 4]);
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
                this.game.add.tween(this.cabecaSprite).to({ x: "+" + this.cabecaSprite.width }, this.intervalo_movimento / 2, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.ESQUERDA) {
                this.game.add.tween(this.cabecaSprite).to({ x: "-" + this.cabecaSprite.width }, this.intervalo_movimento / 2, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.CIMA) {
                this.game.add.tween(this.cabecaSprite).to({ y: "-" + this.cabecaSprite.width }, this.intervalo_movimento / 2, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.BAIXO) {
                this.game.add.tween(this.cabecaSprite).to({ y: "+" + this.cabecaSprite.width }, this.intervalo_movimento / 2, ANIMACAO_EASE, true);
            }
            this.corpo.move(this.cabecaSprite.x, this.cabecaSprite.y, this.intervalo_movimento / 2);
            this.direcaoAtual = this.direcaoDesejada;
        };
        return Cobra;
    }());
    CobraModule.Cobra = Cobra;
})(CobraModule || (CobraModule = {}));
/**
 * Created by kivson on 08/07/16.
 */
/// <reference path="../libs/phaser.d.ts"/>
var ModuleQuiz;
(function (ModuleQuiz) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var Quiz = (function () {
        function Quiz(game, numerosKey, pos_x, pos_y) {
            this.game = game;
            this.numerosKey = numerosKey;
            this.pos_x = pos_x;
            this.pos_y = pos_y;
            this.numeros_1 = {};
            this.numeros_2 = {};
            for (var i = 0; i <= 9; i++) {
                this.numeros_1[i.toString()] = this.game.add.sprite(0, 0, this.numerosKey, i).kill();
                this.numeros_2[i.toString()] = this.game.add.sprite(0, 0, this.numerosKey, i).kill();
            }
            this.igual = this.game.add.sprite(0, 0, this.numerosKey, 10).kill();
            this.mais = this.game.add.sprite(0, 0, this.numerosKey, 11).kill();
            this.menos = this.game.add.sprite(0, 0, this.numerosKey, 12).kill();
            this.realce = this.game.add.sprite(0, 0, this.numerosKey, 13).kill();
        }
        Quiz.prototype.gera_pergunta = function () {
            var n1 = 0;
            var n2 = 0;
            var resp = 0;
            var sinal = '+';
            do {
                n1 = getRandomInt(1, 9);
                n2 = getRandomInt(1, 9);
                sinal = (Math.random() > 0.5) ? '-' : '+';
                resp = (sinal == '-') ? (n1 - n2) : (n1 + n2);
            } while (resp <= 0 || resp >= 10);
            this.pergunta = n1.toString() + sinal + n2.toString();
            this.resposta = resp.toString();
        };
        Quiz.prototype.limpa = function () {
            this.numero_atula_1.kill();
            this.numero_atula_2.kill();
            this.igual.kill();
            this.mais.kill();
            this.menos.kill();
            this.realce.kill();
        };
        Quiz.prototype.mostra = function () {
            // this.limpa();
            this.gera_pergunta();
            this.numero_atula_1 = this.numeros_1[this.pergunta[0]];
            this.numero_atula_1.reset(this.pos_x, this.pos_y);
            var sinal = (this.pergunta[1] == '-') ? (this.menos) : (this.mais);
            sinal.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width, this.pos_y);
            this.numero_atula_2 = this.numeros_2[this.pergunta[2]];
            this.numero_atula_2.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 2, this.pos_y);
            this.igual.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 3, this.pos_y);
            this.realce.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 4, this.pos_y);
        };
        return Quiz;
    }());
    ModuleQuiz.Quiz = Quiz;
})(ModuleQuiz || (ModuleQuiz = {}));
//# sourceMappingURL=tsc.js.map