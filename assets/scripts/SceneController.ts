import { _decorator, Component } from 'cc';
import { DEV, BUILD, PREVIEW, EDITOR, DEBUG, HTML5 } from 'cc/env';
import { getEmitter, Events, GLOBAL_EVENT } from './common/Event';

const { ccclass, property } = _decorator;

@ccclass('SceneContreller')
export class SceneContreller extends Component {

    start() {
        console.log('Game Start');
        console.log('Game Env:', HTML5, DEV, BUILD, PREVIEW, EDITOR, DEBUG); // true, true false true false true

        // Event
        const emitter = getEmitter();
        emitter.emit(GLOBAL_EVENT.GAME_START);
    }

    update(deltaTime: number) {
        
    }
}

