import { _decorator, Component, EventKeyboard, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoleController')
export class RoleController extends Component {
    
    @property(Number)
    speed: number = 30;
    
    private man: Node = null;

    private circle: Node = null;

    private moveState: string = ''; // 'up' | 'down' | 'left' | 'right'

    onLoad(): void {

        const keyEventHandle = (e: EventKeyboard) => {
            switch (e.keyCode) {
                case 38:
                    this.moveState = 'up';
                    break;
                case 40:
                    this.moveState = 'down';
                    break;
                case 37:
                    this.moveState = 'left';
                    break;
                case 39:
                    this.moveState = 'right';
                    break;
            }
        };

        input.on(Input.EventType.KEY_DOWN, keyEventHandle);

        input.on(Input.EventType.KEY_PRESSING, keyEventHandle);

        input.on(Input.EventType.KEY_UP, (e) => {
            this.moveState = '';
        });
    }

    start() {
        this.man = this.node.getChildByName('Man');
        this.circle = this.node.getChildByName('Circle');

        console.log('Hello, I am Actor!', this.man, this.circle)
    }

    update(deltaTime: number) {
        switch (this.moveState) {
            case 'up':
                this.node.setPosition(this.node.position.x, this.node.position.y + this.speed, this.node.position.z);
                break;
            case 'down':
                this.node.setPosition(this.node.position.x, this.node.position.y - this.speed, this.node.position.z);
                break;
            case 'left':
                this.node.setScale(-1, 1, 1);
                this.node.setPosition(this.node.position.x - this.speed, this.node.position.y, this.node.position.z);
                break;
            case 'right':
                this.node.setScale(1, 1, 1);
                this.node.setPosition(this.node.position.x + this.speed, this.node.position.y, this.node.position.z);
                break;
        }
    }
}

