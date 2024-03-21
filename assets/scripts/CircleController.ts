import { _decorator, Component, Quat, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CircleController')
export class CircleController extends Component {

    @property
    speed: number = 3; // 旋转角度

    @property(Prefab)
    sprite: Prefab = null;

    @property
    number: number = 0;

    private _number: number = 0;

    start() {
        this.layout();
    }

    update(deltaTime: number) {
        if (this.number !== this._number) {
            this.layout();
        }

        this.node.rotate(Quat.fromEuler(new Quat(), 0, 0, 1));
    }

    /**
     * 
     */
    layout() {
        this.node.removeAllChildren();
        for (let i = 0; i < this.number; i++) {
            const node = instantiate(this.sprite);
            node.layer = this.node.layer;
            node.name = `weapon_${i}`;
            node.rotate(Quat.fromEuler(new Quat(), 0, 0, 360 / this.number * i));
            this.node.addChild(node);
        }
        this._number = this.number;
    }
}

