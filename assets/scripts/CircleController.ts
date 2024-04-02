import { _decorator, Component, Quat, Prefab, instantiate, director } from 'cc';
import { GAME_EVENT, GLOBAL_EVENT, getEmitter } from './common/Event';
const { ccclass, property } = _decorator;

@ccclass('CircleController')
export class CircleController extends Component {

    static UPGRADE_THRESHOLD = 5; // 升级阈值，每收集 UPGRADE_THRESHOLD 个道具升级一次

    @property(Number)
    rotateSpeed: number = 2;

    @property(Prefab)
    sprite: Prefab = null;

    @property(Number)
    number: number = 0;

    private _number: number = 0;

    start() {
        this.refreshItems();
        this._bindEvent();
    }

    update(deltaTime: number) {
        this.node.rotate(Quat.fromEuler(new Quat(), 0, 0, this.rotateSpeed));
        if (this.number !== this._number) {
            this.refreshItems();
        }
    }

    /**
     * 
     */
    refreshItems() {
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

    _bindEvent() {
        director.getScene().on(GAME_EVENT.ITEM_FETCHED, (data) => {
            this.number += 1;

            if (this.number >= CircleController.UPGRADE_THRESHOLD) {
                this.number -= CircleController.UPGRADE_THRESHOLD;
                getEmitter().emit(GLOBAL_EVENT.UPGRADE, {});
            }
        });
    }
}

