/**
 * Created by kivson on 06/07/16.
 */
/// <reference path="libs/phaser.d.ts"/>

module CobraModule {

    const ANIMACAO_EASE = Phaser.Easing.Sinusoidal.InOut;

    class CorpoCobra {

        private sprite_pool:Phaser.Group;
        private corpoSprite:Phaser.Sprite;
        private sprites_corpo:Phaser.Sprite[] = new Array();

        constructor(private game:Phaser.Game, private corpoKey:string, pos_x:number, pos_y:number) {


            this.corpoSprite = this.game.add.sprite(200, 200, this.corpoKey);
            var tamanho_pool = (game.width / this.corpoSprite.height) * (game.height / this.corpoSprite.height);
            this.corpoSprite.kill();

            this.sprite_pool = game.add.group();
            this.sprite_pool.createMultiple(tamanho_pool, this.corpoKey);


            for (let i = 0; i < 5; i++) {
                let sprite = this.sprite_pool.getFirstExists(false);
                sprite.reset(pos_x - (i * sprite.width), pos_y);
                this.sprites_corpo.push(sprite);
            }
        }

        move(new_x, new_y, tempo_animacao){
            for (let i = this.sprites_corpo.length -1; i>0; i--){
                this.game.add.tween(this.sprites_corpo[i]).to({x:this.sprites_corpo[i-1].x ,y: this.sprites_corpo[i-1].y}, tempo_animacao, ANIMACAO_EASE, true);

            }
            this.game.add.tween(this.sprites_corpo[0]).to({x:new_x ,y: new_y}, tempo_animacao, ANIMACAO_EASE, true);

        }

    }

    enum Direcao {
        CIMA, BAIXO, ESQUERDA, DIREITA
    }

    export class Cobra {

        public intervalo_movimento:number = 500;
        private cabecaSprite:Phaser.Sprite;


        private direcaoAtual:Direcao = Direcao.DIREITA;
        private direcaoDesejada:Direcao = Direcao.DIREITA;

        private corpo:CorpoCobra;

        constructor(private game:Phaser.Game, private cabecaKey:string, private corpoKey:string, pos_x:number = 200, pos_y:number = 100) {

            this.cabecaSprite = this.game.add.sprite(pos_x, pos_y, this.cabecaKey);

            this.cabecaSprite.animations.add('muda', [1, 2, 3, 5]);
            this.cabecaSprite.animations.play('muda', 5, true);

            this.corpo = new CorpoCobra(this.game, this.corpoKey, pos_x - this.cabecaSprite.width, pos_y);


            this.bind_input();
        }

        private bind_input() {
            this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.BAIXO) {
                    this.direcaoDesejada = Direcao.CIMA
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.CIMA) {
                    this.direcaoDesejada = Direcao.BAIXO
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.DIREITA) {
                    this.direcaoDesejada = Direcao.ESQUERDA
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.ESQUERDA) {
                    this.direcaoDesejada = Direcao.DIREITA
                }
            });

            this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.BAIXO) {
                    this.direcaoDesejada = Direcao.CIMA
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.CIMA) {
                    this.direcaoDesejada = Direcao.BAIXO
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.DIREITA) {
                    this.direcaoDesejada = Direcao.ESQUERDA
                }
            });
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(()=> {
                if (this.direcaoAtual != Direcao.ESQUERDA) {
                    this.direcaoDesejada = Direcao.DIREITA
                }
            });
        }

        inicia_movimento() {
            this.game.time.events.loop(this.intervalo_movimento, this.move, this);
        }



        move(){

            if (this.direcaoDesejada == Direcao.DIREITA){
                this.game.add.tween(this.cabecaSprite).to({x: "+" + this.cabecaSprite.width}, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.ESQUERDA){
                this.game.add.tween(this.cabecaSprite).to({x: "-" + this.cabecaSprite.width}, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.CIMA){
                this.game.add.tween(this.cabecaSprite).to({y: "-" + this.cabecaSprite.width}, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            if (this.direcaoDesejada == Direcao.BAIXO){
                this.game.add.tween(this.cabecaSprite).to({y: "+" + this.cabecaSprite.width}, this.intervalo_movimento, ANIMACAO_EASE, true);
            }
            this.corpo.move(this.cabecaSprite.x, this.cabecaSprite.y, this.intervalo_movimento);
            this.direcaoAtual = this.direcaoDesejada;
        }


    }
}