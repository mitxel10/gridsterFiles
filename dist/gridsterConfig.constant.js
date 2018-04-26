"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gridsterConfig_interface_1 = require("./gridsterConfig.interface");
exports.GridsterConfigService = {
    gridType: gridsterConfig_interface_1.GridType.Fit,
    // 'scrollVertical' will fit on width and height of the items will be the same as the width
    // 'scrollHorizontal' will fit on height and width of the items will be the same as the height
    // 'fixed' will set the rows and columns dimensions based on fixedColWidth and fixedRowHeight options
    // 'verticalFixed' will set the rows to fixedRowHeight and columns width will fit the space available
    // 'horizontalFixed' will set the columns to fixedColWidth and rows height will fit the space available
    fixedColWidth: 250,
    fixedRowHeight: 250,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    compactType: gridsterConfig_interface_1.CompactType.None,
    mobileBreakpoint: 640,
    minWidthToAddANewColumn: 310,
    minCols: 1,
    maxCols: 100,
    minRows: 1,
    maxRows: 100,
    defaultItemCols: 1,
    defaultItemRows: 1,
    maxItemCols: 50,
    maxItemRows: 50,
    minItemCols: 1,
    minItemRows: 1,
    minItemArea: 1,
    maxItemArea: 2500,
    margin: 10,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    initCallback: undefined,
    destroyCallback: undefined,
    itemChangeCallback: undefined,
    // Arguments: gridsterItem, gridsterItemComponent
    itemResizeCallback: undefined,
    // Arguments: gridsterItem, gridsterItemComponent
    itemInitCallback: undefined,
    // Arguments: gridsterItem, gridsterItemComponent
    itemRemovedCallback: undefined,
    // Arguments: gridsterItem, gridsterItemComponent
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    emptyCellClickCallback: undefined,
    emptyCellContextMenuCallback: undefined,
    emptyCellDropCallback: undefined,
    emptyCellDragCallback: undefined,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    // Arguments: event, gridsterItem{x, y, rows: defaultItemRows, cols: defaultItemCols}
    ignoreMarginInRow: false,
    draggable: {
        delayStart: 0,
        enabled: false,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: undefined,
        start: undefined,
        // Arguments: item, gridsterItem, event
        dropOverItems: false,
        dropOverItemsCallback: undefined // callback on drop over another item
        // Arguments: source, target, gridComponent
    },
    resizable: {
        delayStart: 0,
        enabled: true,
        handles: {
            s: true,
            e: true,
            n: true,
            w: true,
            se: true,
            ne: true,
            sw: true,
            nw: true
        },
        stop: undefined,
        start: undefined // callback when resizing an item starts.
        // Arguments: item, gridsterItem, event
    },
    swap: true,
    pushItems: false,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: false,
    displayGrid: gridsterConfig_interface_1.DisplayGrid.OnDragAndResize,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false,
    disableAutoPositionOnConflict: false // disable auto-position of items on conflict state
};
