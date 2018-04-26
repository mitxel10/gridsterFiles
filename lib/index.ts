import * as pluralize from 'pluralize'
/**
* @Method: Returns the plural form of any noun.
* @Param {string}
* @Return {string}
*/
export function getPlural (str: any) : string {
  return pluralize.plural(str)
}
export {GridsterComponent} from './gridster.component';
export {GridsterItemComponent} from './gridsterItem.component';
export {GridsterItem} from './gridsterItem.interface';
export {GridsterItemComponentInterface} from './gridsterItemComponent.interface';
export {GridsterComponentInterface} from './gridster.interface';
export {GridsterConfig, GridType, DisplayGrid, CompactType, Draggable, Resizable, PushDirections} from './gridsterConfig.interface';
export {GridsterModule} from './gridster.module';
export {GridsterPush} from './gridsterPush.service';
export {GridsterPushResize} from './gridsterPushResize.service';
export {GridsterSwap} from './gridsterSwap.service';
