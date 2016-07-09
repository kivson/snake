/**
 * Created by kivson on 08/07/16.
 */
/// <reference path="../libs/phaser.d.ts"/>

module ModuleQuiz {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export class Quiz {
        numeros_1:any = {};
        numeros_2:any = {};
        igual:Phaser.Sprite;
        mais:Phaser.Sprite;
        menos:Phaser.Sprite;
        realce:Phaser.Sprite;
        numero_atula_1:Phaser.Sprite;
        numero_atula_2:Phaser.Sprite;

        pergunta:string;
        resposta:string;

        gera_pergunta(){
            let n1 = 0;
            let n2 = 0;
            let resp:number = 0;
            let sinal:string = '+';
            do{
                n1 = getRandomInt(1,9);
                n2 = getRandomInt(1,9);
                sinal = (Math.random()>0.5)?'-':'+';
                resp =  (sinal == '-')?(n1-n2):(n1+n2);
            }while (resp <= 0 || resp >= 10);

            this.pergunta = n1.toString() + sinal + n2.toString();
            this.resposta = resp.toString();
        }

        limpa(){
            this.numero_atula_1.kill();
            this.numero_atula_2.kill();
            this.igual.kill();
            this.mais.kill();
            this.menos.kill();
            this.realce.kill();

        }


        mostra(){
            // this.limpa();

            this.gera_pergunta();

            this.numero_atula_1 = this.numeros_1[this.pergunta[0]];
            this.numero_atula_1.reset(this.pos_x, this.pos_y);
            
            let sinal = (this.pergunta[1] == '-')?(this.menos):(this.mais);
            sinal.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width, this.pos_y);

            this.numero_atula_2 = this.numeros_2[this.pergunta[2]];
            this.numero_atula_2.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 2, this.pos_y);

            this.igual.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 3, this.pos_y);
            this.realce.reset(this.pos_x + this.numeros_1[this.pergunta[0]].width * 4, this.pos_y);

        }

        constructor(private game:Phaser.Game, private numerosKey:string, private pos_x:number, private pos_y:number) {
            for (let i=0; i<=9;i++){
                this.numeros_1[i.toString()] = this.game.add.sprite(0,0,this.numerosKey,i).kill();
                this.numeros_2[i.toString()] = this.game.add.sprite(0,0,this.numerosKey,i).kill();
            }
            this.igual = this.game.add.sprite(0,0,this.numerosKey,10).kill();
            this.mais = this.game.add.sprite(0,0,this.numerosKey,11).kill();
            this.menos = this.game.add.sprite(0,0,this.numerosKey,12).kill();
            this.realce = this.game.add.sprite(0,0,this.numerosKey,13).kill();
        }
    }

}
