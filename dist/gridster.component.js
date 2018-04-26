"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gridsterConfig_constant_1 = require("./gridsterConfig.constant");
var gridsterUtils_service_1 = require("./gridsterUtils.service");
var gridsterEmptyCell_service_1 = require("./gridsterEmptyCell.service");
var gridsterCompact_service_1 = require("./gridsterCompact.service");
var gridsterRenderer_service_1 = require("./gridsterRenderer.service");
var GridsterComponent = /** @class */ (function () {
    function GridsterComponent(el, renderer, cdRef, zone) {
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.zone = zone;
        this.gridColumns = [];
        this.gridRows = [];
        this.el = el.nativeElement;
        this.$options = JSON.parse(JSON.stringify(gridsterConfig_constant_1.GridsterConfigService));
        this.calculateLayoutDebounce = gridsterUtils_service_1.GridsterUtils.debounce(this.calculateLayout.bind(this), 0);
        this.mobile = false;
        this.curWidth = 0;
        this.curHeight = 0;
        this.grid = [];
        this.curColWidth = 0;
        this.minColWidth = 310;
        this.curRowHeight = 0;
        this.minRowHeight = 210;
        this.dragInProgress = false;
        this.emptyCell = new gridsterEmptyCell_service_1.GridsterEmptyCell(this);
        this.compact = new gridsterCompact_service_1.GridsterCompact(this);
        this.gridRenderer = new gridsterRenderer_service_1.GridsterRenderer(this);
        this.elemWidth = 0;
        this.minColWidthAdd = 0;
        this.numColumns = 0;
    }
    GridsterComponent_1 = GridsterComponent;
    GridsterComponent.checkCollisionTwoItems = function (item, item2) {
        return item.x < item2.x + item2.cols
            && item.x + item.cols > item2.x
            && item.y < item2.y + item2.rows
            && item.y + item.rows > item2.y;
    };
    GridsterComponent.prototype.ngOnInit = function () {
        if (this.options.initCallback) {
            this.options.initCallback(this);
        }
    };
    GridsterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.setOptions();
            this.options.api = {
                optionsChanged: this.optionsChanged.bind(this),
                resize: this.onResize.bind(this),
                getNextPossiblePosition: this.getNextPossiblePosition.bind(this),
                getFirstPossiblePosition: this.getFirstPossiblePosition.bind(this),
                getLastPossiblePosition: this.getLastPossiblePosition.bind(this),
            };
            this.columns = this.$options.minCols;
            this.rows = this.$options.minRows;
            this.setGridSize();
            this.calculateLayout();
        }
    };
    GridsterComponent.prototype.resize = function () {
        var height;
        var width;
        if (this.$options.gridType === 'fit' && !this.mobile) {
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
        }
        else {
            width = this.el.clientWidth;
            height = this.el.clientHeight;
        }
        if ((width !== this.curWidth || height !== this.curHeight) && this.checkIfToResize()) {
            this.onResize();
        }
    };
    GridsterComponent.prototype.setOptions = function () {
        this.$options = gridsterUtils_service_1.GridsterUtils.merge(this.$options, this.options, this.$options);
        if (!this.$options.disableWindowResize && !this.windowResize) {
            this.windowResize = this.renderer.listen('window', 'resize', this.onResize.bind(this));
        }
        else if (this.$options.disableWindowResize && this.windowResize) {
            this.windowResize();
            this.windowResize = null;
        }
        this.emptyCell.updateOptions();
    };
    GridsterComponent.prototype.optionsChanged = function () {
        this.setOptions();
        var widgetsIndex = this.grid.length - 1, widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.updateOptions();
        }
        this.calculateLayout();
    };
    GridsterComponent.prototype.ngOnDestroy = function () {
        if (this.windowResize) {
            this.windowResize();
        }
        if (this.options.destroyCallback) {
            this.options.destroyCallback(this);
        }
        if (this.options.api) {
            this.options.api.resize = undefined;
            this.options.api.optionsChanged = undefined;
            this.options.api.getNextPossiblePosition = undefined;
            this.options.api = undefined;
        }
        this.emptyCell.destroy();
        delete this.emptyCell;
        this.compact.destroy();
        delete this.compact;
    };
    GridsterComponent.prototype.onResize = function () {
        this.calculateColumns();
        this.updateItems();
        this.calculateLayout();
        this.setGridSize();
    };
    GridsterComponent.prototype.checkIfToResize = function () {
        var clientWidth = this.el.clientWidth;
        var offsetWidth = this.el.offsetWidth;
        var scrollWidth = this.el.scrollWidth;
        var clientHeight = this.el.clientHeight;
        var offsetHeight = this.el.offsetHeight;
        var scrollHeight = this.el.scrollHeight;
        var verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight
            && scrollHeight - offsetHeight < offsetWidth - clientWidth;
        var horizontalScrollPresent = clientHeight < offsetHeight
            && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;
        if (verticalScrollPresent) {
            return false;
        }
        return !horizontalScrollPresent;
    };
    GridsterComponent.prototype.setGridSize = function () {
        var width = this.el.clientWidth;
        var height = this.el.clientHeight;
        if (this.$options.gridType === 'fit' && !this.mobile) {
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
        }
        else {
            width = this.el.clientWidth;
            height = this.el.clientHeight;
        }
        this.curWidth = width;
        this.curHeight = height;
    };
    GridsterComponent.prototype.setGridDimensions = function () {
        this.setGridSize();
        if (!this.mobile && this.$options.mobileBreakpoint > this.curWidth) {
            this.mobile = !this.mobile;
            this.renderer.addClass(this.el, 'mobile');
        }
        else if (this.mobile && this.$options.mobileBreakpoint < this.curWidth) {
            this.mobile = !this.mobile;
            this.renderer.removeClass(this.el, 'mobile');
        }
        var rows = this.$options.minRows, columns = this.$options.minCols;
        var widgetsIndex = this.grid.length - 1, widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (!widget.notPlaced) {
                rows = Math.max(rows, widget.$item.y + widget.$item.rows);
            }
        }
        this.calculateColumns();
        this.rows = rows;
    };
    GridsterComponent.prototype.calculateLayout = function () {
        if (this.compact) {
            this.compact.checkCompact();
        }
        this.setGridDimensions();
        if (this.$options.outerMargin) {
            var marginWidth = -this.$options.margin;
            if (this.$options.outerMarginLeft !== null) {
                marginWidth += this.$options.outerMarginLeft;
                this.renderer.setStyle(this.el, 'padding-left', this.$options.outerMarginLeft + 'px');
            }
            else {
                marginWidth += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-left', this.$options.margin + 'px');
            }
            if (this.$options.outerMarginRight !== null) {
                marginWidth += this.$options.outerMarginRight;
                this.renderer.setStyle(this.el, 'padding-right', this.$options.outerMarginRight + 'px');
            }
            else {
                marginWidth += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-right', this.$options.margin + 'px');
            }
            this.curColWidth = (this.curWidth - marginWidth) / this.columns;
            var marginHeight = -this.$options.margin;
            if (this.$options.outerMarginTop !== null) {
                marginHeight += this.$options.outerMarginTop;
                this.renderer.setStyle(this.el, 'padding-top', this.$options.outerMarginTop + 'px');
            }
            else {
                marginHeight += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-top', this.$options.margin + 'px');
            }
            if (this.$options.outerMarginBottom !== null) {
                marginHeight += this.$options.outerMarginBottom;
                this.renderer.setStyle(this.el, 'padding-bottom', this.$options.outerMarginBottom + 'px');
            }
            else {
                marginHeight += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-bottom', this.$options.margin + 'px');
            }
            this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
        }
        else {
            this.curColWidth = (this.curWidth + this.$options.margin) / this.columns;
            this.curRowHeight = (this.curHeight + this.$options.margin) / this.rows;
            this.renderer.setStyle(this.el, 'padding-left', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-right', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-top', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-bottom', 0 + 'px');
        }
        if (this.curColWidth < this.minColWidth)
            this.curColWidth = this.minColWidth;
        if (this.curRowHeight < this.minRowHeight)
            this.curRowHeight = this.minRowHeight;
        this.gridRenderer.updateGridster();
        this.updateGrid();
        var widgetsIndex = this.grid.length - 1, widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.setSize();
            widget.drag.toggle();
            widget.resize.toggle();
        }
        setTimeout(this.resize.bind(this), 100);
    };
    GridsterComponent.prototype.updateGrid = function () {
        if (this.$options.displayGrid === 'always' && !this.mobile) {
            this.renderer.addClass(this.el, 'display-grid');
        }
        else if (this.$options.displayGrid === 'onDrag&Resize' && this.dragInProgress) {
            this.renderer.addClass(this.el, 'display-grid');
        }
        else if (this.$options.displayGrid === 'none' || !this.dragInProgress || this.mobile) {
            this.renderer.removeClass(this.el, 'display-grid');
        }
        this.setGridDimensions();
        this.gridColumns.length = Math.max(this.columns, Math.floor(this.curWidth / this.curColWidth)) || 0;
        this.gridRows.length = Math.max(this.rows, Math.floor(this.curHeight / this.curRowHeight)) || 0;
        this.cdRef.markForCheck();
    };
    GridsterComponent.prototype.calculateColumns = function () {
        this.elemWidth = this.el.offsetWidth || parseInt(this.el.css('width'), 10);
        if (!this.elemWidth) {
            return;
        }
        var marginWidth = -this.$options.margin;
        if (this.$options.outerMarginLeft !== null) {
            marginWidth += this.$options.outerMarginLeft;
        }
        else {
            marginWidth += this.$options.margin;
        }
        if (this.$options.outerMarginRight !== null) {
            marginWidth += this.$options.outerMarginRight;
        }
        else {
            marginWidth += this.$options.margin;
        }
        this.curColWidth = (this.curWidth - marginWidth) / this.columns;
        this.minColWidthAdd = (parseInt(this.$options.minWidthToAddANewColumn, 10) + marginWidth);
        this.numColumns = Math.floor(this.elemWidth / this.minColWidthAdd);
        if (this.numColumns < this.$options.minCols) {
            this.numColumns = this.$options.minCols;
        }
        if (this.numColumns !== this.columns) {
            this.columns = this.numColumns;
        }
    };
    GridsterComponent.prototype.updateItems = function () {
        var itemsOutOfLayout = [];
        var widget;
        for (var rowIndex = 0, l = this.grid.length; rowIndex < l; ++rowIndex) {
            widget = this.grid[rowIndex];
            if (widget) {
                if (widget.$item.cols > this.columns) {
                    itemsOutOfLayout.push(widget);
                }
                else if (widget.$item.x + widget.$item.cols > this.columns) {
                    itemsOutOfLayout.push(widget);
                }
                else {
                    this.autoPositionItem(widget);
                }
            }
        }
        for (var itemlIndex = 0, length_1 = itemsOutOfLayout.length; itemlIndex < length_1; ++itemlIndex) {
            this.autoPositionItem(itemsOutOfLayout[itemlIndex]);
        }
        itemsOutOfLayout.length = 0;
    };
    GridsterComponent.prototype.addItem = function (itemComponent) {
        if (itemComponent.$item.cols === undefined) {
            itemComponent.$item.cols = this.$options.defaultItemCols;
            itemComponent.item.cols = itemComponent.$item.cols;
            itemComponent.itemChanged();
        }
        if (itemComponent.$item.rows === undefined) {
            itemComponent.$item.rows = this.$options.defaultItemRows;
            itemComponent.item.rows = itemComponent.$item.rows;
            itemComponent.itemChanged();
        }
        if (itemComponent.$item.x === -1 || itemComponent.$item.y === -1) {
            this.autoPositionItem(itemComponent);
        }
        else if (this.checkCollision(itemComponent.$item)) {
            if (!this.$options.disableWarnings) {
                console.warn('Can\'t be placed in the bounds of the dashboard, trying to auto position!/n' +
                    JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
            }
            if (!this.$options.disableAutoPositionOnConflict) {
                this.autoPositionItem(itemComponent);
            }
            else {
                itemComponent.notPlaced = true;
            }
        }
        this.grid.push(itemComponent);
        this.calculateLayoutDebounce();
    };
    GridsterComponent.prototype.removeItem = function (itemComponent) {
        this.grid.splice(this.grid.indexOf(itemComponent), 1);
        this.calculateLayoutDebounce();
        if (this.options.itemRemovedCallback) {
            this.options.itemRemovedCallback(itemComponent.item, itemComponent);
        }
        this.updateItems();
    };
    GridsterComponent.prototype.checkCollision = function (item) {
        return this.checkGridCollision(item) || this.findItemWithItem(item);
    };
    GridsterComponent.prototype.checkGridCollision = function (item) {
        var noNegativePosition = item.y > -1 && item.x > -1;
        var maxGridCols = item.cols + item.x <= this.columns;
        var maxGridRows = item.rows + item.y <= this.$options.maxRows;
        var maxItemCols = item.maxItemCols === undefined ? this.$options.maxItemCols : item.maxItemCols;
        var minItemCols = item.minItemCols === undefined ? this.$options.minItemCols : item.minItemCols;
        var maxItemRows = item.maxItemRows === undefined ? this.$options.maxItemRows : item.maxItemRows;
        var minItemRows = item.minItemRows === undefined ? this.$options.minItemRows : item.minItemRows;
        var inColsLimits = item.cols <= maxItemCols && item.cols >= minItemCols;
        var inRowsLimits = item.rows <= maxItemRows && item.rows >= minItemRows;
        var minAreaLimit = item.minItemArea === undefined ? this.$options.minItemArea : item.minItemArea;
        var maxAreaLimit = item.maxItemArea === undefined ? this.$options.maxItemArea : item.maxItemArea;
        var area = item.cols * item.rows;
        var inMinArea = minAreaLimit <= area;
        var inMaxArea = maxAreaLimit >= area;
        return !(noNegativePosition && maxGridCols && maxGridRows && inColsLimits && inRowsLimits && inMinArea && inMaxArea);
    };
    GridsterComponent.prototype.findItemWithItem = function (item) {
        var widgetsIndex = this.grid.length - 1, widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent_1.checkCollisionTwoItems(widget.$item, item)) {
                return widget;
            }
        }
        return false;
    };
    GridsterComponent.prototype.findItemsWithItem = function (item) {
        var a = [];
        var widgetsIndex = this.grid.length - 1, widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent_1.checkCollisionTwoItems(widget.$item, item)) {
                a.push(widget);
            }
        }
        return a;
    };
    GridsterComponent.prototype.autoPositionItem = function (itemComponent) {
        if (this.getNextPossiblePosition(itemComponent.$item)) {
            itemComponent.item.x = itemComponent.$item.x;
            itemComponent.item.y = itemComponent.$item.y;
            itemComponent.itemChanged();
        }
        else {
            itemComponent.notPlaced = true;
            if (!this.$options.disableWarnings) {
                console.warn('Can\'t be placed in the bounds of the dashboard!/n' +
                    JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
            }
        }
    };
    GridsterComponent.prototype.getNextPossiblePosition = function (newItem, startingFrom) {
        if (startingFrom === void 0) { startingFrom = {}; }
        if (newItem.cols === -1) {
            newItem.cols = this.$options.defaultItemCols;
        }
        if (newItem.rows === -1) {
            newItem.rows = this.$options.defaultItemRows;
        }
        this.setGridDimensions();
        var rowsIndex = startingFrom.y || 0, colsIndex;
        for (; rowsIndex < this.rows; rowsIndex++) {
            newItem.y = rowsIndex;
            colsIndex = startingFrom.x || 0;
            for (; colsIndex < this.columns; colsIndex++) {
                newItem.x = colsIndex;
                if (!this.checkCollision(newItem) && (newItem.x + newItem.cols <= this.columns)) {
                    return true;
                }
            }
        }
        var canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
        var canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
        var addToRows = this.rows <= this.columns && canAddToRows;
        if (!addToRows && canAddToColumns) {
            newItem.x = 0;
            newItem.y = this.rows;
            return true;
        }
        else if (canAddToRows) {
            newItem.y = this.rows;
            newItem.x = 0;
            return true;
        }
        return false;
    };
    GridsterComponent.prototype.getFirstPossiblePosition = function (item) {
        var tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem);
        return tmpItem;
    };
    GridsterComponent.prototype.getLastPossiblePosition = function (item) {
        var farthestItem = { y: 0, x: 0 };
        farthestItem = this.grid.reduce(function (prev, curr) {
            var currCoords = { y: curr.$item.y + curr.$item.rows - 1, x: curr.$item.x + curr.$item.cols - 1 };
            if (gridsterUtils_service_1.GridsterUtils.compareItems(prev, currCoords) === 1) {
                return currCoords;
            }
            else {
                return prev;
            }
        }, farthestItem);
        var tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem, farthestItem);
        return tmpItem;
    };
    GridsterComponent.prototype.pixelsToPositionX = function (x, roundingMethod, noLimit) {
        var position = roundingMethod(x / this.curColWidth);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    };
    GridsterComponent.prototype.pixelsToPositionY = function (y, roundingMethod, noLimit) {
        var position = roundingMethod(y / this.curRowHeight);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    };
    GridsterComponent.prototype.positionXToPixels = function (x) {
        return x * this.curColWidth;
    };
    GridsterComponent.prototype.positionYToPixels = function (y) {
        return y * this.curRowHeight;
    };
    __decorate([
        core_1.Input()
    ], GridsterComponent.prototype, "options", void 0);
    GridsterComponent = GridsterComponent_1 = __decorate([
        core_1.Component({
            selector: 'gridster',
            templateUrl: './gridster.html',
            styleUrls: ['./gridster.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], GridsterComponent);
    return GridsterComponent;
    var GridsterComponent_1;
}());
exports.GridsterComponent = GridsterComponent;
