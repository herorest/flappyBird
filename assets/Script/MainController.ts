const {ccclass, property} = cc._decorator;
import Pipe from './Pipe'

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    birdParent: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    allpipe: cc.Node = null;

    @property(cc.Prefab)
    fabPipe: cc.Prefab = null;

    @property(cc.Label)
    scoreLb: cc.Label = null;

    @property(cc.Node)
    nodeGameover: cc.Node = null;

    @property(cc.Button)
    retryBtn: cc.Button = null;

    @property([cc.Sprite])
    birds: cc.Sprite[] = [];

    @property
    time: number = 0;
    pipeArr: any[] = [1,2,3];
    speed: number = 0;
    over: boolean = false;
    gamestart: boolean = false;
    score: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('----load');
    }

    start () {
        let pipeStartX: number = 200;
        let spaceX = (288 + 52) / 3;
        this.pipeArr = this.pipeArr.map((v, i) => {
            let instance = cc.instantiate(this.fabPipe).getComponent(Pipe);
            instance.node.parent = this.allpipe;
            instance.node.x = pipeStartX + spaceX * i;
            return instance;
        });

        this.birds.forEach((v,i) => {
            if(i !== 0){
                v.node.active = false;
            }
        });

    }

    touch () {
        if(this.over){
            return;
        }
        this.speed = 2.6;
    }

    update (dt: number) {
        this.time += dt;

        if(this.time > 0.2){
            for(let i = 0; i < this.birds.length; i++){
                let v = this.birds[i];
                if(v.node.active){
                    v.node.active = false;
    
                    if(i === 3){
                        this.birds[0].node.active = true;
                    }else{
                        this.birds[i + 1].node.active = true;
                    }

                    break;
                }
            }

            this.time = 0;
        }

        if(!this.gamestart){
            return;
        }

        this.speed -= 0.1;
        this.birdParent.y += this.speed;

        if(this.over){
            this.birdParent.rotation += 10;
            return;
        }

        this.background.x -= 1;
        if(this.background.x == -288){
            this.background.x = 0;
        }

        this.pipeArr.forEach((v, i) => {
            if(v.node.x < -26){
                if(!v.counted){
                    this.score += 1;
                    v.counted = true;
                    this.scoreLb.string = this.score + '';
                }
            }
            v.move();
            this.over = v.check(this.birdParent) || this.over;
        });

        if(this.over){
            this.gameOver();
        }
    }

    handleStart(){
        this.gamestart = true;
        this.over = false;
        this.nodeGameover.active = false;
        this.retryBtn.node.active = false;
        this.reset();
    }

    gameOver(){
        this.nodeGameover.active = true;
        this.retryBtn.node.active = true;
    }

    reset(){
        this.time = 0;
        this.pipeArr.forEach((v, i) => {
            v.reset(i)
        });
        this.speed = 0;
        this.score = 0;
        this.birdParent.x = 0;
        this.birdParent.y = 0;
        this.birdParent.rotation = 0;
    }
}
