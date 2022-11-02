import { Directive, Input, ViewContainerRef } from '@angular/core';

/**
 * Directiva utilizada en `DynamicTableComponent` para indicar a un host `CustomCellComponent`
 */
@Directive({
    selector: '[customCellHost]',
})
export class CustomCellDirective {
    @Input()
    public data: any;
    
    constructor (
        public viewContainerRef: ViewContainerRef
    ) {}
}