/**
 * Created by kivson on 06/07/16.
 */
/// <reference path="libs/phaser.d.ts"/>

module CobraModule {
    enum Direcao {
        CIMA, BAIXO, ESQUERDA, DIREITA
    }

    export class Cobra {

        public intervalo_movimento:number = 500;
        private cabecaSprite:Phaser.Sprite;
        private corpoSprite:Phaser.Sprite;

        private direcaoAtual:Direcao = Direcao.DIREITA;
        private direcaoDesejada:Direcao = Direcao.DIREITA;


        constructor(private game:Phaser.Game, private cabecaKey:string, private corpoKey:string) {

            this.cabecaSprite = this.game.add.sprite(100, 100, this.cabecaKey);
            this.corpoSprite = this.game.add.sprite(200, 200, this.corpoKey);


            this.cabecaSprite.animations.add('muda', [1, 2, 3, 5]);
            this.cabecaSprite.animations.play('muda', 5, true);


            this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(()=>{if (this.direcaoAtual != Direcao.BAIXO) {this.direcaoDesejada=Direcao.CIMA}});
            this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(()=>{if (this.direcaoAtual != Direcao.CIMA) {this.direcaoDesejada=Direcao.BAIXO}});
            this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(()=>{if (this.direcaoAtual != Direcao.DIREITA) {this.direcaoDesejada=Direcao.ESQUERDA}});
            this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(()=>{if (this.direcaoAtual != Direcao.ESQUERDA) {this.direcaoDesejada=Direcao.DIREITA}});
        }

        inicia_movimento() {
            this.game.time.events.loop(this.intervalo_movimento, this.move, this);
        }


        move(){
            if (this.direcaoDesejada == Direcao.DIREITA){
                this.cabecaSprite.position.x += this.cabecaSprite.width;
            }
            if (this.direcaoDesejada == Direcao.ESQUERDA){
                this.cabecaSprite.position.x -= this.cabecaSprite.width;
            }
            if (this.direcaoDesejada == Direcao.CIMA){
                this.cabecaSprite.position.y -= this.cabecaSprite.height;
            }
            if (this.direcaoDesejada == Direcao.BAIXO){
                this.cabecaSprite.position.y += this.cabecaSprite.height;
            }
            this.direcaoAtual = this.direcaoDesejada
        }


    }
}