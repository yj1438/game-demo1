import { log } from 'cc';
import { HTML5 } from 'cc/env';
import type { Emitter } from 'mitt';

export enum GAME_EVENT {
  'ITEM_FETCHED' = 'ITEM_FETCHED',
};

export enum GLOBAL_EVENT {
  'UPGRADE' = 'UPGRADE',
  'GAME_START' ='GAME_START',
  'GAME_OVER' = 'GAME_OVER',
}

/**
 * https://www.npmjs.com/package/mitt#typescript
 * vents 的 key 为 GLOBAL_EVENT 的 value，value 为事件的参数类型
 */
export type Events = {
  [GLOBAL_EVENT.GAME_START]: string;
  [GLOBAL_EVENT.GAME_OVER]: string;
  [GLOBAL_EVENT.UPGRADE]: {};
};

let _emitter: Emitter<Events> = null;
export const getEmitter = () => {
  if (!HTML5) {
    log('Not HTML5 platform');
    return null;
  }
  if (!_emitter) {
    // @ts-ignore
    _emitter = window._emitter;
    
    // 兜底 + mock
    if (!_emitter) {
      log('Emitter not found, use mock !!!');
      // @ts-ignore
      _emitter = {
        on: (...args) => { log('Emitter ON Mock', args); },
        off: (...args) => { log('Emitter OFF Mock', args); },
        emit: (...args) => { log('Emitter EMIT Mock', args); },
      };
    }
  }
  return _emitter;
};