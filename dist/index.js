"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize = require("pluralize");
/**
* @Method: Returns the plural form of any noun.
* @Param {string}
* @Return {string}
*/
function getPlural(str) {
    return pluralize.plural(str);
}
exports.getPlural = getPlural;
var gridster_component_1 = require("./gridster.component");
exports.GridsterComponent = gridster_component_1.GridsterComponent;
var gridsterItem_component_1 = require("./gridsterItem.component");
exports.GridsterItemComponent = gridsterItem_component_1.GridsterItemComponent;
var gridsterItemComponent_interface_1 = require("./gridsterItemComponent.interface");
exports.GridsterItemComponentInterface = gridsterItemComponent_interface_1.GridsterItemComponentInterface;
var gridster_interface_1 = require("./gridster.interface");
exports.GridsterComponentInterface = gridster_interface_1.GridsterComponentInterface;
var gridsterConfig_interface_1 = require("./gridsterConfig.interface");
exports.GridType = gridsterConfig_interface_1.GridType;
exports.DisplayGrid = gridsterConfig_interface_1.DisplayGrid;
exports.CompactType = gridsterConfig_interface_1.CompactType;
var gridster_module_1 = require("./gridster.module");
exports.GridsterModule = gridster_module_1.GridsterModule;
var gridsterPush_service_1 = require("./gridsterPush.service");
exports.GridsterPush = gridsterPush_service_1.GridsterPush;
var gridsterPushResize_service_1 = require("./gridsterPushResize.service");
exports.GridsterPushResize = gridsterPushResize_service_1.GridsterPushResize;
var gridsterSwap_service_1 = require("./gridsterSwap.service");
exports.GridsterSwap = gridsterSwap_service_1.GridsterSwap;
