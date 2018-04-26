"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gridsterConfig_interface_1 = require("./gridsterConfig.interface");
var GridsterRenderer = /** @class */ (function () {
    function GridsterRenderer(gridster) {
        this.gridster = gridster;
    }
    GridsterRenderer.prototype.destroy = function () {
        delete this.gridster;
    };
    GridsterRenderer.prototype.updateItem = function (el, item, renderer) {
        if (this.gridster.mobile) {
            renderer.setStyle(el, 'transform', null);
            renderer.setStyle(el, 'width', null);
            renderer.setStyle(el, 'height', null);
            renderer.setStyle(el, 'margin-bottom', this.gridster.$options.margin + 'px');
        }
        else {
            var x = Math.round(this.gridster.curColWidth * item.x);
            var y = Math.round(this.gridster.curRowHeight * item.y);
            var width = this.gridster.curColWidth * item.cols - this.gridster.$options.margin;
            var height = (this.gridster.curRowHeight * item.rows - this.gridster.$options.margin);
            var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
            renderer.setStyle(el, 'transform', transform);
            renderer.setStyle(el, 'width', width + 'px');
            renderer.setStyle(el, 'height', height + 'px');
            var marginBottom = null;
            var marginRight = null;
            if (this.gridster.$options.outerMargin) {
                if (this.gridster.rows === item.rows + item.y) {
                    if (this.gridster.$options.outerMarginBottom !== null) {
                        marginBottom = this.gridster.$options.outerMarginBottom + 'px';
                    }
                    else {
                        marginBottom = this.gridster.$options.margin + 'px';
                    }
                }
                if (this.gridster.columns === item.cols + item.x) {
                    if (this.gridster.$options.outerMarginBottom !== null) {
                        marginRight = this.gridster.$options.outerMarginRight + 'px';
                    }
                    else {
                        marginRight = this.gridster.$options.outerMarginRight + 'px';
                    }
                }
            }
            renderer.setStyle(el, 'margin-bottom', marginBottom);
            renderer.setStyle(el, 'margin-right', marginRight);
        }
    };
    GridsterRenderer.prototype.updateGridster = function () {
        var addClass = '';
        var removeClass1 = '';
        var removeClass2 = '';
        var removeClass3 = '';
        if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.Fit) {
            addClass = gridsterConfig_interface_1.GridType.Fit;
            removeClass1 = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollHorizontal;
            removeClass3 = gridsterConfig_interface_1.GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.ScrollVertical) {
            //this.gridster.curRowHeight = this.gridster.curColWidth;
            addClass = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass1 = gridsterConfig_interface_1.GridType.Fit;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollHorizontal;
            removeClass3 = gridsterConfig_interface_1.GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.ScrollHorizontal) {
            this.gridster.curColWidth = this.gridster.curRowHeight;
            addClass = gridsterConfig_interface_1.GridType.ScrollHorizontal;
            removeClass1 = gridsterConfig_interface_1.GridType.Fit;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass3 = gridsterConfig_interface_1.GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.Fixed) {
            this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = gridsterConfig_interface_1.GridType.Fixed;
            removeClass1 = gridsterConfig_interface_1.GridType.Fit;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass3 = gridsterConfig_interface_1.GridType.ScrollHorizontal;
        }
        else if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.VerticalFixed) {
            this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass1 = gridsterConfig_interface_1.GridType.Fit;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollHorizontal;
            removeClass3 = gridsterConfig_interface_1.GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === gridsterConfig_interface_1.GridType.HorizontalFixed) {
            this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = gridsterConfig_interface_1.GridType.ScrollHorizontal;
            removeClass1 = gridsterConfig_interface_1.GridType.Fit;
            removeClass2 = gridsterConfig_interface_1.GridType.ScrollVertical;
            removeClass3 = gridsterConfig_interface_1.GridType.Fixed;
        }
        if (this.gridster.mobile) {
            this.gridster.renderer.removeClass(this.gridster.el, addClass);
        }
        else {
            this.gridster.renderer.addClass(this.gridster.el, addClass);
        }
        this.gridster.renderer.removeClass(this.gridster.el, removeClass1);
        this.gridster.renderer.removeClass(this.gridster.el, removeClass2);
        this.gridster.renderer.removeClass(this.gridster.el, removeClass3);
    };
    GridsterRenderer.prototype.getGridColumnStyle = function (i) {
        return {
            transform: 'translateX(' + this.gridster.curColWidth * i + 'px)',
            width: this.gridster.curColWidth - this.gridster.$options.margin + 'px',
            height: this.gridster.gridRows.length * this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
        };
    };
    GridsterRenderer.prototype.getGridRowStyle = function (i) {
        return {
            transform: 'translateY(' + this.gridster.curRowHeight * i + 'px)',
            width: this.gridster.gridColumns.length * this.gridster.curColWidth - this.gridster.$options.margin + 'px',
            height: this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
        };
    };
    GridsterRenderer = __decorate([
        core_1.Injectable()
    ], GridsterRenderer);
    return GridsterRenderer;
}());
exports.GridsterRenderer = GridsterRenderer;
