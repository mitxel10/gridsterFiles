import { Renderer2 } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { GridsterItemS } from './gridsterItemS.interface';
export declare class GridsterRenderer {
    private gridster;
    constructor(gridster: GridsterComponentInterface);
    destroy(): void;
    updateItem(el: any, item: GridsterItemS, renderer: Renderer2): void;
    updateGridster(): void;
    getGridColumnStyle(i: number): {
        transform: string;
        width: string;
        height: string;
    };
    getGridRowStyle(i: number): {
        transform: string;
        width: string;
        height: string;
    };
}
