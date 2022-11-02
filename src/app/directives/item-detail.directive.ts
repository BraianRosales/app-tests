import { Directive, Input, ViewContainerRef } from '@angular/core';

/**
 * Directiva utilizada en `DynamicTableComponent` para indicar a un host `ItemDetailComponent`
 */
@Directive({
    selector: '[itemDetailHost]',
})
export class ItemDetailDirective {
    /**
     * Es el rowId desde donde se creo. Se utiliza para vincularlo con la row clickeada porque al utilizar
     * los filtros dinamicos, el QueryList de este componente no se updatea y quedan en otro orden.
     */
    @Input()
    public rowId: number | undefined;
    
    constructor (
        public viewContainerRef: ViewContainerRef
    ) {}
}