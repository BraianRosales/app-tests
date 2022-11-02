import { Type } from "@angular/core";

/** Definición de la estructura de una tabla dinámica. */
export interface DynamicTableDefinition {
    /** Las columnas a mostrar en la tabla. */
    displayedColumns: string[];
    /** El valor a mostrar en cada celda del header de la tabla. */
    headerCellDefinitions: string[];
}

/** Interfaz a implementar por cada componente que funcione a modo de detalle para las filas de `DynamicTableComponent` */
export interface ItemDetailComponent {
    data: any;
}

/** Interfaz a implementar por cada componente que funcione a modo celda custom de `DynamicTableComponent` */
export interface CustomCellComponent {
    data: any;
    componentData?: {[key: string]: any};
}

/** Valor de una columna a buscar en una fila. */
export interface DynamicTableSearchItem {
    value: number | string;
    column: string;
}

export interface DynamicTableGroupingHeader {
    columnNames: string[];
    columnSpans: number[];
}
export interface DynamicComponent {
    type: Type<CustomCellComponent>;
    componentData?: {[key: string]: any};
}

export interface DynamicTableColumnMenuData {
    options: DynamicTableColumnMenuOption[];
}

export interface DynamicTableColumnMenuOption<T = any, K = void> {
    icon?: string | ((data: T) => string);
    description: string | ((data: T) => string);
    optionFn?: (data: T) => K;
}



/** Definición de la estructura de una tabla dinámica. */
export interface DynamicTableDefinition {
    /** Las columnas a mostrar en la tabla. */
    displayedColumns: string[];
    /** El valor a mostrar en cada celda del header de la tabla. */
    headerCellDefinitions: string[];
}

/** Interfaz a implementar por cada componente que funcione a modo de detalle para las filas de `DynamicTableComponent` */
export interface ItemDetailComponent {
    data: any;
}

/** Interfaz a implementar por cada componente que funcione a modo celda custom de `DynamicTableComponent` */
export interface CustomCellComponent {
    data: any;
    componentData?: {[key: string]: any};
}

/** Valor de una columna a buscar en una fila. */
export interface DynamicTableSearchItem {
    value: number | string;
    column: string;
}

export interface DynamicTableGroupingHeader {
    columnNames: string[];
    columnSpans: number[];
}
export interface DynamicComponent {
    type: Type<CustomCellComponent>;
    componentData?: {[key: string]: any};
}