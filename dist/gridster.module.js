"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var gridster_component_1 = require("./gridster.component");
var gridsterItem_component_1 = require("./gridsterItem.component");
var gridsterPreview_component_1 = require("./gridsterPreview.component");
var GridsterModule = /** @class */ (function () {
    function GridsterModule() {
    }
    GridsterModule = __decorate([
        core_1.NgModule({
            declarations: [
                gridster_component_1.GridsterComponent,
                gridsterItem_component_1.GridsterItemComponent,
                gridsterPreview_component_1.GridsterPreviewComponent
            ],
            imports: [
                common_1.CommonModule
            ],
            exports: [gridster_component_1.GridsterComponent, gridsterItem_component_1.GridsterItemComponent],
            providers: [],
            bootstrap: []
        })
    ], GridsterModule);
    return GridsterModule;
}());
exports.GridsterModule = GridsterModule;
