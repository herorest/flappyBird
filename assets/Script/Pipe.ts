const {ccclass, property} = cc._decorator;

@ccclass
export default class Pipe extends cc.Component {

    @property
    counted: boolean = false;

    check(bird: cc.Node): boolean{
        if(bird.x + 17 < this.node.x - 26){
            return false;
        }
        if(bird.x - 17 > this.node.x + 26){
            return false;
        }
        if((bird.y + 12 < this.node.y + 55) && (bird.y - 12 > this.node.y - 55)){
            return false;
        }
        return true;
    }

    reset (index) {
        let pipeStartX: number = 200;
        let spaceX = (288 + 52) / 3;
        this.node.x = pipeStartX + spaceX * index;
        this.counted = false;
    }

    move () {
        this.node.x -= 2;

        if(this.node.x < (-144 - 26)){
            this.counted = false;
            this.node.y = 80 - Math.random() * 80
            this.node.x = this.node.x + 288 + 52;
        }
    }

    update (dt: number) {

    }
}
